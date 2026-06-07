const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const initialNodes = [
  {
    nodeId: 'Node-A1',
    name: 'Firewall',
    type: 'optimal',
    status: 'optimal',
    percentage: 78,
    percentageLabel: 'Integrity',
    progress: 85,
    progressLabel: 'Audit Progress',
    active: true,
    icon: 'shield',
  },
  {
    nodeId: 'Node-B2',
    name: 'Database',
    type: 'updating',
    status: 'updating',
    percentage: 62,
    percentageLabel: 'Uptime',
    progress: 50,
    progressLabel: 'Patch Level',
    active: false,
    icon: 'database',
  },
  {
    nodeId: 'Node-C3',
    name: 'API Gateway',
    type: 'critical',
    status: 'critical',
    percentage: 71,
    percentageLabel: 'Latency',
    progress: 70,
    progressLabel: 'Risk Factor',
    active: true,
    icon: 'alert',
  },
  {
    nodeId: 'Node-D4',
    name: 'Auth-Server',
    type: 'secure',
    status: 'secure',
    percentage: 80,
    percentageLabel: 'Health',
    progress: 15,
    progressLabel: 'Validation',
    active: false,
    icon: 'key',
  },
];

const initialLogs = [
  {
    level: 'info',
    message: 'Initialisation du noyau Cyber-Compliance Arch Securitised Kernel...',
    timestamp: new Date(Date.now() - 4000),
  },
  {
    level: 'success',
    message: 'SOC 2 signature verified active. Encrypted transport modules.',
    timestamp: new Date(Date.now() - 2800),
  },
  {
    level: 'warn',
    message: 'Node-B2 PostgreSQL reports minor synchronization drifts.',
    timestamp: new Date(Date.now() - 1200),
  },
  {
    level: 'error',
    message: "Node-C3 [API Gateway]: External denial of service attack spike identified (DDoS).",
    timestamp: new Date(),
  },
];

async function main() {
  console.log(`Start seeding ...`);
  for (const node of initialNodes) {
    const n = await prisma.infrastructureNode.upsert({
      where: { nodeId: node.nodeId },
      update: {},
      create: node,
    });
    console.log(`Created node with id: ${n.nodeId}`);
  }

  for (const log of initialLogs) {
    const l = await prisma.systemLog.create({
      data: log,
    });
    console.log(`Created log: ${l.message}`);
  }
  console.log(`Seeding finished.`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
