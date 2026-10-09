// Pre-seeded fallback data to guarantee 0ms instant display even during backend cold starts

export const FALLBACK_PRODUCTS = [
  {
    _id: "prod-dome-cpplus-2mp",
    name: "CP Plus 2MP Full HD Dome Camera",
    category: "CCTV Cameras",
    price: 1850,
    description: "High performance indoor dome security camera with night vision and smart IR LED range up to 20 meters. Ideal for home and office surveillance.",
    specifications: {
      resolution: "2MP (1080p)",
      nightVision: "20 Meters IR",
      lens: "3.6mm Fixed Lens",
      casing: "Durable Plastic Body",
      warranty: "2 Years Manufacturer Warranty"
    },
    image: "https://images.unsplash.com/photo-1557862921-37829c790f19?auto=format&fit=crop&w=600&q=80",
    stock: 25,
    warranty: "2 Years",
    status: "active"
  },
  {
    _id: "prod-bullet-hikvision-5mp",
    name: "Hikvision 5MP Outdoor Bullet Camera",
    category: "CCTV Cameras",
    price: 3250,
    description: "Ultra HD 5MP outdoor weather-proof camera with EXIR 2.0 night vision technology. Designed for high clarity monitoring in all weather conditions.",
    specifications: {
      resolution: "5MP Ultra HD",
      nightVision: "30 Meters EXIR 2.0",
      lens: "2.8mm Wide Angle",
      weatherproof: "IP67 Weatherproof",
      warranty: "2 Years Manufacturer Warranty"
    },
    image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=600&q=80",
    stock: 18,
    warranty: "2 Years",
    status: "active"
  },
  {
    _id: "prod-wifi-dahua-4mp",
    name: "Dahua 4MP Wi-Fi Smart Wireless Camera",
    category: "CCTV Cameras",
    price: 2750,
    description: "Wireless smart IP security camera with 360 degree pan-tilt view, two-way audio communication, motion tracking and instant smartphone alerts.",
    specifications: {
      resolution: "4MP QHD",
      connectivity: "Wi-Fi 2.4GHz & Ethernet",
      panTilt: "355° Pan / 90° Tilt",
      audio: "Two-Way Audio Talk",
      storage: "MicroSD Card up to 256GB"
    },
    image: "https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=600&q=80",
    stock: 12,
    warranty: "1 Year",
    status: "active"
  },
  {
    _id: "prod-bio-realtime-face",
    name: "Realtime AI Face Recognition & Fingerprint Machine",
    category: "Biometric Systems",
    price: 6800,
    description: "Dual biometric biometric attendance system featuring high-speed face recognition, fingerprint sensor, RFID card reader and Wi-Fi connectivity.",
    specifications: {
      capacity: "1000 Faces / 3000 Fingerprints",
      logs: "100,000 Transaction Logs",
      screen: "2.8 Inch Color TFT Screen",
      connectivity: "Wi-Fi / TCP-IP / USB",
      software: "Free Attendance Software Included"
    },
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80",
    stock: 8,
    warranty: "1 Year",
    status: "active"
  },
  {
    _id: "prod-bio-essl-fingerprint",
    name: "eSSL Fingerprint Biometric Attendance Device",
    category: "Biometric Systems",
    price: 4950,
    description: "Reliable optical fingerprint biometric attendance system suitable for offices, shops, and factories with desktop software support.",
    specifications: {
      capacity: "2000 Fingerprints",
      screen: "2.4 Inch TFT Display",
      backup: "Built-in Battery Backup (2 Hours)",
      connectivity: "USB Drive Export / Ethernet"
    },
    image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=600&q=80",
    stock: 15,
    warranty: "1 Year",
    status: "active"
  },
  {
    _id: "prod-dvr-cpplus-8ch",
    name: "CP Plus 8 Channel HD DVR Recorder",
    category: "DVR / NVR",
    price: 4200,
    description: "8-Channel H.265+ digital video recorder supporting up to 5MP cameras, HDMI/VGA output, mobile app live viewing via gCMOB.",
    specifications: {
      channels: "8 Channels",
      videoSupport: "AHD / TVI / CVI / CVBS / IP",
      storageSupport: "SATA HDD up to 6TB",
      output: "HDMI & VGA 1080p Output"
    },
    image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=600&q=80",
    stock: 10,
    warranty: "2 Years",
    status: "active"
  },
  {
    _id: "prod-hdd-seagate-2tb",
    name: "Seagate SkyHawk 2TB Surveillance Hard Disk",
    category: "DVR / NVR",
    price: 5400,
    description: "Purpose-built 24x7 surveillance internal hard drive tuned for DVR and NVR recording systems to prevent dropped frames.",
    specifications: {
      capacity: "2TB",
      workload: "180TB/year Workload Rating",
      interface: "SATA 6Gb/s",
      formFactor: "3.5 Inch"
    },
    image: "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?auto=format&fit=crop&w=600&q=80",
    stock: 30,
    warranty: "3 Years",
    status: "active"
  },
  {
    _id: "prod-access-emlock",
    name: "Smart Electromagnetic Door Access Control Lock",
    category: "Access Control",
    price: 3450,
    description: "Heavy duty 600lbs magnetic lock system with RFID keypad, exit button, and emergency power backup interface for glass & wooden doors.",
    specifications: {
      holdingForce: "280kg (600lbs)",
      unlockMode: "RFID Card / PIN Code / Push Button",
      voltage: "12V DC",
      application: "Wooden Door, Glass Door, Fireproof Door"
    },
    image: "https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=600&q=80",
    stock: 14,
    warranty: "1 Year",
    status: "active"
  },
  {
    _id: "prod-access-vdp-hikvision",
    name: "Hikvision Video Door Phone System (7 Inch Display)",
    category: "Access Control",
    price: 7800,
    description: "Hands-free indoor 7-inch color display monitor paired with outdoor pinhole HD camera doorbell for enhanced home entrance security.",
    specifications: {
      display: "7 Inch Color LCD Touch Screen",
      camera: "HD Night Vision Door Bell Camera",
      unlock: "Supports Electronic Lock Release",
      wiring: "4 Wire System Easy Installation"
    },
    image: "https://images.unsplash.com/photo-1585771724684-38269d6639fd?auto=format&fit=crop&w=600&q=80",
    stock: 7,
    warranty: "2 Years",
    status: "active"
  },
  {
    _id: "prod-smps-16ch",
    name: "16 Channel Heavy Duty CCTV SMPS Power Supply",
    category: "CCTV Accessories",
    price: 1650,
    description: "12V 20A centralized power supply unit with surge protection and auto-reset fuse for 16 CCTV security cameras.",
    specifications: {
      output: "12V DC 20 Ampere (16 Ports)",
      protection: "Short Circuit & Overload Protection",
      casing: "Metal Enclosure Box with Lock"
    },
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80",
    stock: 40,
    warranty: "1 Year",
    status: "active"
  },
  {
    _id: "prod-cable-copper-90m",
    name: "3+1 Pure Copper CCTV Cable Roll (90 Meters)",
    category: "CCTV Accessories",
    price: 1400,
    description: "High conductivity pure copper coaxial CCTV camera cable with audio and power wires for crystal clear video transmission without signal loss.",
    specifications: {
      length: "90 Meters Roll",
      conductor: "100% Pure Copper Wire",
      shielding: "Aluminum Braiding"
    },
    image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=80",
    stock: 50,
    warranty: "1 Year",
    status: "active"
  }
];

export const FALLBACK_CATEGORIES = [
  { _id: "cat-1", name: 'CCTV Cameras', description: 'Dome, Bullet, IP, Wi-Fi, PTZ, Indoor & Outdoor Cameras', icon: 'Camera' },
  { _id: "cat-2", name: 'Biometric Systems', description: 'Fingerprint Attendance, Face Recognition & Access Machines', icon: 'Fingerprint' },
  { _id: "cat-3", name: 'DVR / NVR', description: '4, 8, 16 Channel DVRs, NVRs & Surveillance Hard Disks', icon: 'HardDrive' },
  { _id: "cat-4", name: 'Access Control', description: 'Door Access Systems, Video Door Phone & Smart Locks', icon: 'KeyRound' },
  { _id: "cat-5", name: 'CCTV Accessories', description: 'CCTV Cables, SMPS Power Supplies, Connectors & Adapters', icon: 'Plug' }
];

export const FALLBACK_SERVICES = [
  {
    _id: "svc-1",
    title: 'CCTV Camera Installation',
    description: 'Professional end-to-end CCTV installation for homes, shops, warehouses, and corporate offices with neat wiring and mobile app configuration.',
    icon: 'Camera',
    features: ['Site survey & camera placement planning', 'Neat PVC conduit cabling', 'DVR/NVR configuration', 'Smartphone remote viewing setup'],
    status: 'active'
  },
  {
    _id: "svc-2",
    title: 'CCTV Maintenance & Repair',
    description: 'Fast resolution of video loss, night vision failures, hard disk errors, power supply repairs, and camera relocation services.',
    icon: 'Wrench',
    features: ['Diagnostic troubleshooting', 'Hard drive recovery & replacement', 'Lens cleaning & angle adjustments', 'Power supply SMPS replacement'],
    status: 'active'
  },
  {
    _id: "svc-3",
    title: 'Biometric Attendance Installation',
    description: 'Complete setup of fingerprint, face recognition, and RFID punch machines with customized attendance tracking software.',
    icon: 'Fingerprint',
    features: ['Wall mount installation & network wiring', 'Employee profile registration', 'Software training for HR/Admin', 'Automated shift report exports'],
    status: 'active'
  },
  {
    _id: "svc-4",
    title: 'Door Access Control Systems',
    description: 'Secure entrance management systems including electromagnetic door locks, biometric scanners, exit buttons, and video door phones.',
    icon: 'KeyRound',
    features: ['Glass door & wooden door lock fitting', 'RFID card & keyfob programming', 'Video door phone intercom setup', 'Emergency override switch setup'],
    status: 'active'
  },
  {
    _id: "svc-5",
    title: 'Security Network Cabling',
    description: 'High-speed Cat6 network cabling, rack installation, POE switch setup, and fiber optical connections for IP camera networks.',
    icon: 'Network',
    features: ['Structured CAT6 / CAT5e cabling', 'Gigabit POE switch installation', 'Rack management & patch panels', 'Long-range Wi-Fi bridge links'],
    status: 'active'
  },
  {
    _id: "svc-6",
    title: 'Annual Maintenance Contract (AMC)',
    description: 'Hassle-free yearly maintenance plans for CCTV and security hardware including quarterly checkups and priority emergency service.',
    icon: 'ShieldCheck',
    features: ['Quarterly preventive maintenance visits', 'Free replacement of faulty connectors', 'Priority 24-hour service turnaround', 'Discount on extra hardware'],
    status: 'active'
  }
];
