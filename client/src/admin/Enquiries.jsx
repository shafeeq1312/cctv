import React, { useState, useEffect } from 'react';
import { 
  MessageSquare, 
  Search, 
  Trash2, 
  CheckCircle, 
  Clock, 
  Phone, 
  Mail, 
  User, 
  Package, 
  Filter,
  Eye
} from 'lucide-react';
import API from '../services/api';

const Enquiries = () => {
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  
  // Selected enquiry modal
  const [selectedEnquiry, setSelectedEnquiry] = useState(null);

  useEffect(() => {
    fetchEnquiries();
  }, [statusFilter]);

  const fetchEnquiries = async () => {
    setLoading(true);
    try {
      let url = '/enquiries';
      if (statusFilter !== 'all') {
        url += `?status=${statusFilter}`;
      }
      const res = await API.get(url);
      if (res.data.success) {
        setEnquiries(res.data.enquiries);
      }
    } catch (err) {
      console.error('Failed to fetch enquiries:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      const res = await API.put(`/enquiries/${id}`, { status: newStatus });
      if (res.data.success) {
        setEnquiries(enquiries.map(e => e._id === id ? { ...e, status: newStatus } : e));
      }
    } catch (err) {
      console.error('Failed to update status:', err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this customer enquiry record?')) return;
    try {
      const res = await API.delete(`/enquiries/${id}`);
      if (res.data.success) {
        setEnquiries(enquiries.filter(e => e._id !== id));
        if (selectedEnquiry?._id === id) setSelectedEnquiry(null);
      }
    } catch (err) {
      console.error('Failed to delete enquiry:', err);
    }
  };

  const filteredEnquiries = enquiries.filter(e => {
    const term = searchTerm.toLowerCase();
    return (
      e.name.toLowerCase().includes(term) ||
      e.phone.toLowerCase().includes(term) ||
      e.email.toLowerCase().includes(term) ||
      e.product.toLowerCase().includes(term)
    );
  });

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <h1 className="text-3xl font-extrabold text-white">
            Customer Enquiries Management
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            View customer quote requests, update lead status (New, Contacted, Resolved), and manage records.
          </p>
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-900 p-4 rounded-2xl border border-slate-800">
        <div className="relative w-full sm:w-80">
          <input
            type="text"
            placeholder="Search by customer name, phone, product..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-800 text-white text-sm px-4 py-2.5 pl-10 rounded-xl border border-slate-700 focus:outline-none focus:border-blue-500"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <span className="text-xs text-slate-400 font-semibold">Filter Status:</span>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-slate-800 text-white text-sm px-4 py-2 rounded-xl border border-slate-700 focus:outline-none"
          >
            <option value="all">All Enquiries</option>
            <option value="new">New Lead</option>
            <option value="contacted">Contacted</option>
            <option value="resolved">Resolved</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden shadow-xl">
        {loading ? (
          <div className="p-8 text-center text-slate-400">Loading enquiries...</div>
        ) : filteredEnquiries.length === 0 ? (
          <div className="p-12 text-center text-slate-400 space-y-2">
            <MessageSquare className="w-8 h-8 mx-auto text-slate-600" />
            <p>No enquiries found.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-300">
              <thead className="bg-slate-950 text-xs uppercase text-slate-400 border-b border-slate-800">
                <tr>
                  <th className="p-4">Customer Name</th>
                  <th className="p-4">Product / Solution</th>
                  <th className="p-4">Phone Number</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Submitted Date</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {filteredEnquiries.map((enq) => (
                  <tr key={enq._id} className="hover:bg-slate-800/40 transition">
                    <td className="p-4">
                      <div className="font-bold text-white">{enq.name}</div>
                      <div className="text-xs text-slate-400">{enq.email}</div>
                    </td>

                    <td className="p-4 font-semibold text-blue-400">
                      {enq.product}
                    </td>

                    <td className="p-4 font-mono text-xs text-emerald-400">
                      <a href={`tel:${enq.phone}`} className="hover:underline flex items-center gap-1">
                        <Phone className="w-3 h-3" /> {enq.phone}
                      </a>
                    </td>

                    <td className="p-4">
                      <select
                        value={enq.status}
                        onChange={(e) => handleStatusChange(enq._id, e.target.value)}
                        className={`text-xs px-3 py-1.5 rounded-full font-bold uppercase border focus:outline-none ${
                          enq.status === 'new'
                            ? 'bg-amber-950 text-amber-400 border-amber-800'
                            : enq.status === 'contacted'
                            ? 'bg-blue-950 text-blue-400 border-blue-800'
                            : 'bg-emerald-950 text-emerald-400 border-emerald-800'
                        }`}
                      >
                        <option value="new" className="bg-slate-900 text-amber-400">New</option>
                        <option value="contacted" className="bg-slate-900 text-blue-400">Contacted</option>
                        <option value="resolved" className="bg-slate-900 text-emerald-400">Resolved</option>
                      </select>
                    </td>

                    <td className="p-4 text-xs text-slate-400">
                      {new Date(enq.createdAt).toLocaleDateString('en-IN', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric'
                      })}
                    </td>

                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => setSelectedEnquiry(enq)}
                          className="p-2 bg-blue-600/20 text-blue-400 rounded-lg border border-blue-500/30"
                          title="View Message"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(enq._id)}
                          className="p-2 bg-rose-600/20 text-rose-400 rounded-lg border border-rose-500/30"
                          title="Delete Enquiry"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Enquiry Detail Modal */}
      {selectedEnquiry && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 w-full max-w-lg rounded-3xl p-6 shadow-2xl space-y-6">
            <div className="flex justify-between items-center pb-4 border-b border-slate-800">
              <h3 className="font-bold text-white text-lg flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-blue-400" /> Customer Enquiry Details
              </h3>
              <button onClick={() => setSelectedEnquiry(null)} className="text-slate-400 hover:text-white">✕</button>
            </div>

            <div className="space-y-3 text-sm">
              <div>
                <span className="text-xs text-slate-400 block font-semibold">Customer Name</span>
                <span className="text-white font-bold">{selectedEnquiry.name}</span>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-xs text-slate-400 block font-semibold">Phone</span>
                  <a href={`tel:${selectedEnquiry.phone}`} className="text-emerald-400 font-mono font-bold">
                    {selectedEnquiry.phone}
                  </a>
                </div>
                <div>
                  <span className="text-xs text-slate-400 block font-semibold">Email</span>
                  <span className="text-slate-200">{selectedEnquiry.email}</span>
                </div>
              </div>

              <div>
                <span className="text-xs text-slate-400 block font-semibold">Product Requested</span>
                <span className="text-blue-400 font-semibold">{selectedEnquiry.product}</span>
              </div>

              <div>
                <span className="text-xs text-slate-400 block font-semibold mb-1">Enquiry Message</span>
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-slate-200 text-xs leading-relaxed">
                  "{selectedEnquiry.message}"
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800 flex justify-end">
              <button
                onClick={() => setSelectedEnquiry(null)}
                className="bg-blue-600 text-white font-semibold px-5 py-2 rounded-xl text-xs"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default Enquiries;
