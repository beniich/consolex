const fs = require('fs');
const path = require('path');

const filesToTranslate = [
  'src/store/useStore.ts',
  'src/pages/DashboardPage.tsx',
  'src/pages/FreeDashboard.tsx',
  'src/pages/InfraPage.tsx',
  'src/pages/LandingPage.tsx',
  'src/pages/LogsPage.tsx',
  'src/pages/ReportsPage.tsx',
  'src/pages/SettingsPage.tsx',
  'src/pages/TeamPage.tsx',
  'src/pages/TraceabilityPage.tsx',
  'src/pages/UpgradePage.tsx',
  'src/components/AgroApiSettings.tsx',
  'src/components/AgroBotanicalModule.tsx',
  'src/components/AgroLivestockHub.tsx',
  'src/components/AgroReportBuilder.tsx',
  'src/components/AgroTelemetryIoT.tsx',
  'src/components/AgroWorkspaceSettings.tsx',
  'src/components/CyberTerminal.tsx',
  'src/components/OperationsMatrix.tsx',
  'src/components/ui/ToastContainer.tsx'
];

const translations = [
  { fr: /Signature SOC 2 vérifiée active. Modules de transport chiffrés./g, en: 'SOC 2 signature verified active. Encrypted transport modules.' },
  { fr: /Node-B2 PostgreSQL signale des dérives mineures de synchronisation./g, en: 'Node-B2 PostgreSQL reports minor synchronization drifts.' },
  { fr: /Node-C3 \[API Gateway\] : Pic d'attaques par déni de service externe identifié \(DDoS\)./g, en: 'Node-C3 [API Gateway]: External denial of service attack spike identified (DDoS).' },
  { fr: /Admin AgroMaître/g, en: 'AgroMaître Admin' },
  { fr: /Démarrage de la commande manuelle sur le module/g, en: 'Starting manual command on module' },
  { fr: /Synchronisation terminée pour/g, en: 'Synchronization completed for' },
  { fr: /Les règles de pare-feu sont alignées./g, en: 'Firewall rules are aligned.' },
  { fr: /Base de données (.*) mise à niveau avec succès vers la dernière version./g, en: 'Database $1 successfully upgraded to latest version.' },
  { fr: /Alerte maîtrisée ! (.*) isolé avec succès du réseau public./g, en: 'Alert contained! $1 successfully isolated from public network.' },
  { fr: /Déverrouillage de (.*). Rétablissement de l'accès général./g, en: 'Unlocking $1. General access restored.' },
  { fr: /Contrôle de validation cryptographique concluant pour (.*). Certificat intact./g, en: 'Cryptographic validation successful for $1. Certificate intact.' },
  { fr: /ATTENTION: Débordement de trafic DDoS injecté avec succès sur Node-C3 API Gateway ! Latence critique./g, en: 'WARNING: DDoS traffic overflow successfully injected on Node-C3 API Gateway! Critical latency.' },
  { fr: /ALERTE: Signature suspecte d'un script d'injection SQL repérée sur le nœud de base de données !/g, en: 'ALERT: Suspicious SQL injection script signature detected on database node!' },
  { fr: /Restauration: Correctif de sécurité appliqué sur le serveur de base de données. Vulnérabilités résolues !/g, en: 'Restoration: Security patch applied to database server. Vulnerabilities resolved!' },
  { fr: /Initialisation d'un balayage complet des nœuds pour certification SOC 2.../g, en: 'Initializing complete node scan for SOC 2 certification...' },
  { fr: /Vérification du module (.*) -> OK/g, en: 'Verifying module $1 -> OK' },
  { fr: /RÉINITIALISATION: Toutes les configurations d'usine et les niveaux de risque ont été réinitialisés./g, en: 'RESET: All factory configurations and risk levels have been reset.' },
  { fr: /ALERTE CRITIQUE/g, en: 'CRITICAL ALERT' },
  { fr: /ALERTE DE SÉCURITÉ CRITIQUE EXPÉDIÉE !/g, en: 'CRITICAL SECURITY ALERT DISPATCHED!' },
  { fr: /DDoS volumétrique en cours sur API Gateway & Attaque d'injection SQL identifiée sur le serveur de base de données./g, en: 'Volumetric DDoS in progress on API Gateway & SQL injection attack identified on database server.' },
  { fr: /Pic de latence anormal de 71% repéré sur API Gateway \(Infiltration DDoS suspectée\)./g, en: 'Abnormal latency spike of 71% detected on API Gateway (Suspected DDoS infiltration).' },
  { fr: /Script malveillant repéré essayant de contourner le module relationnel PostgreSQL Node-B2./g, en: 'Malicious script detected attempting to bypass PostgreSQL Node-B2 relational module.' },
  { fr: /RELAIS ZONE DE SÉCURITÉ/g, en: 'SECURITY ZONE RELAY' },
  { fr: /Rejeu des audits de sécurité de conformité.../g, en: 'Replaying compliance security audits...' },
  { fr: /Régistre de sécurité modifié : SOC 2 TYPE II \[ACTIVÉ\]/g, en: 'Security register modified: SOC 2 TYPE II [ACTIVATED]' },
  { fr: /Régistre de sécurité modifié : PCI-DSS v4.0 \[ACTIVÉ\]/g, en: 'Security register modified: PCI-DSS v4.0 [ACTIVATED]' },
  { fr: /Régistre de sécurité modifié : ISO 27001 \[ACTIVÉ\]/g, en: 'Security register modified: ISO 27001 [ACTIVATED]' },
  { fr: /Déclenche l'alerte d'intrusion si la latence dépasse ce niveau./g, en: 'Triggers intrusion alert if latency exceeds this level.' },
  { fr: /CONTRÔLE DE SÉCURITÉ SOC 2/g, en: 'SOC 2 SECURITY CONTROL' },
  { fr: /Trafic HTTP forcé sur le protocole chiffré./g, en: 'HTTP traffic forced to encrypted protocol.' },
  { fr: /Protection de l'accès kernel requis pour l'administrateur./g, en: 'Kernel access protection required for administrator.' },
  { fr: /Relationnel chiffré/g, en: 'Encrypted relational' },
  { fr: /Vérification continue des connexions./g, en: 'Continuous connection verification.' },
  { fr: /Tableau de bord minimal/g, en: 'Minimal Dashboard' },
  { fr: /Tableau de bord de sécurité complet/g, en: 'Complete Security Dashboard' },
  { fr: /Retour au tableau de bord/g, en: 'Back to Dashboard' },
  { fr: /Paiement sécurisé crypté SSL. Annulez ou changez de forfait à tout moment depuis votre tableau de bord./g, en: 'SSL encrypted secure payment. Cancel or change plan anytime from your dashboard.' },
  { fr: /Erreur de chargement de la blockchain:/g, en: 'Blockchain loading error:' },
  { fr: /Alerte Blockchain:/g, en: 'Blockchain Alert:' },
  { fr: /Rapport d'Audit Blockchain : (.*)/g, en: 'Blockchain Audit Report : $1' },
  { fr: /SÉCURITÉ INFECTÉE/g, en: 'SECURITY INFECTED' },
  { fr: /VALIDE/g, en: 'VALID' },
  { fr: /Chargement du registre distribué.../g, en: 'Loading distributed ledger...' },
  { fr: /Génère et envoie la version actuelle du tableau de bord de conformité./g, en: 'Generates and sends the current version of the compliance dashboard.' },
  { fr: /Échec de chargement des données financières:/g, en: 'Failed to load financial data:' },
  { fr: /Jeton de sécurité (.*) masqué/g, en: 'Security token $1 masked' },
  { fr: /Jeton de sécurité (.*) affiché/g, en: 'Security token $1 displayed' },
  { fr: /Espèce sélectionnée (.*) - Chargement des calibrages solénoïdes./g, en: 'Selected species $1 - Loading solenoid calibrations.' },
  { fr: /Liste d'alertes restaurée au début./g, en: 'Alert list restored to beginning.' },
  { fr: /Rapport (.*) généré avec succès ! PDF prêt au téléchargement./g, en: 'Report $1 successfully generated! PDF ready for download.' },
  { fr: /Limites de sécurité calées : Humidité >= (.*)%, Température <= (.*)°C, Nutriments >= (.*) PPM./g, en: 'Security limits calibrated: Humidity >= $1%, Temperature <= $2°C, Nutrients >= $3 PPM.' },
  { fr: /Membre supprimé du système de sécurité: (.*)/g, en: 'Member removed from security system: $1' },
  { fr: /Chargement de Operational Infrastructure Control \(it\).../g, en: 'Loading Operational Infrastructure Control (it)...' },
  { fr: /Chargement de Supply Chain Capacitance Matrix \(inv\).../g, en: 'Loading Supply Chain Capacitance Matrix (inv)...' },
  { fr: /CHARGEMENT DES CAPACITEURS.../g, en: 'LOADING CAPACITORS...' },
  { fr: /Santé & Diagnostics IA/g, en: 'AI Health & Diagnostics' },
  { fr: /Notre moteur d'intelligence artificielle analyse les indicateurs vitaux et vous alerte avant qu'une maladie ne se propage dans votre troupeau./g, en: 'Our artificial intelligence engine analyzes vital indicators and alerts you before a disease spreads in your herd.' },
  { fr: /Éleveur bovin, Maroc/g, en: 'Cattle breeder, Morocco' },
  { fr: /AgroMaître a réduit notre mortalité animale de 40% en six mois. L'alerte précoce de maladies est révolutionnaire./g, en: 'AgroMaître reduced our animal mortality by 40% in six months. Early disease alert is revolutionary.' },
  { fr: /L'IA apprend vos données/g, en: 'AI learns your data' },
  { fr: /En 48h, l'algorithme établit les baselines de votre exploitation et commence à générer des alertes personnalisées./g, en: 'In 48h, the algorithm establishes the baselines of your operation and starts generating personalized alerts.' },
  { fr: /Alertes actives/g, en: 'Active alerts' },
  { fr: /Capteurs critiques/g, en: 'Critical sensors' },
  { fr: /RÉGISTRE CENTRALISÉ DES ÉVÉNEMENTS & INCIDENTS/g, en: 'CENTRALIZED EVENT & INCIDENT LEDGER' },
  { fr: /Journal de conformité inaltérable retraçant toutes les actions materielles./g, en: 'Unalterable compliance log tracing all material actions.' },
  { fr: /Regénérer logs factices/g, en: 'Regenerate dummy logs' },
  { fr: /SÉLECTION DU RÉGISTRE DE CONFORMITÉ/g, en: 'COMPLIANCE REGISTER SELECTION' },
  { fr: /Modifiez le type de audit d'intégrité imposé matériellement./g, en: 'Modify the type of hardware-enforced integrity audit.' },
  { fr: /Clé de chiffrement administrative \(FIPS 140-3\)/g, en: 'Administrative encryption key (FIPS 140-3)' },
  { fr: /Les modules d'infrastructure réencryptent automatiquement par HMAC avec cette clé à la volée./g, en: 'Infrastructure modules automatically re-encrypt via HMAC with this key on the fly.' },
  { fr: /Règles obligatoires imposées à nos serveurs d'Arch-Compliance./g, en: 'Mandatory rules imposed on our Arch-Compliance servers.' },
  { fr: /TOUS DROITS RÉSERVÉS/g, en: 'ALL RIGHTS RESERVED' },
  { fr: /RÉSEAU TOPOLOGIQUE DES MONITEURS CC_ARCH/g, en: 'CC_ARCH MONITORS TOPOLOGICAL NETWORK' },
  { fr: /Vue microscopique des hôtes et performances de serveurs locaux à double sens./g, en: 'Microscopic view of hosts and two-way local server performance.' },
  { fr: /SÉCURISÉ/g, en: 'SECURE' },
  { fr: /Ports Autorisés/g, en: 'Authorized Ports' },
  { fr: /Système d'exploitation/g, en: 'Operating System' },
  { fr: /Contrôle Réseau/g, en: 'Network Control' },
  { fr: /Débloquer/g, en: 'Unlock' },
  { fr: /Actionner/g, en: 'Actuate' }
];

filesToTranslate.forEach(file => {
  const fullPath = path.join(__dirname, file);
  if (fs.existsSync(fullPath)) {
    let content = fs.readFileSync(fullPath, 'utf8');
    let original = content;
    
    translations.forEach(({fr, en}) => {
      content = content.replace(fr, en);
    });
    
    // Check for "é" "è" "à" etc loosely and replace if they match standard things, but mostly we rely on the direct regex above.
    // Replace typical encoding artifacts if any
    content = content.replace(/Ã©/g, 'é').replace(/Ã¨/g, 'è').replace(/Ã/g, 'à');

    if (content !== original) {
      fs.writeFileSync(fullPath, content, 'utf8');
      console.log(`Translated strings in ${file}`);
    }
  }
});
