import {
  BarChart3,
  BrainCircuit,
  Cloud,
  Code2,
  Database,
  FileCode2,
  Radar,
  ShieldCheck,
  Target,
  TrendingUp
} from "lucide-react";

export const navItems = ["About", "Stack", "Projects", "Journey", "Contact"];

export const heroStats = [
  { value: 3, suffix: "+", label: "Años de experiencia" },
  { value: 10, suffix: "+", label: "Proyectos" },
  { value: 1, suffix: "M+", label: "Filas analizadas" },
  { value: 95, suffix: "%", label: "Precisión del modelo" },
  { value: 6, suffix: "+", label: "Tecnologías" },
  { value: 100, suffix: "%", label: "Pasión por los datos" }
];

export const stackBadges = [
  "Python",
  "Power BI",
  "SQL",
  "TensorFlow",
  "Pandas",
  "Scikit Learn",
  "IBM",
  "Google",
  "Machine Learning",
  "Streamlit"
];

export const timeline = [
  {
    year: "2022",
    title: "Bases de Análisis de Datos",
    note:
      "Primeros pasos con Excel, análisis descriptivo, limpieza de datos y desarrollo del pensamiento analítico para resolver problemas mediante datos."
  },
  {
    year: "2023",
    title: "Ingeniería en Sistemas",
    note:
      "Graduación como Ingeniero en Sistemas y Computación, fortaleciendo fundamentos de programación, bases de datos, arquitectura de software y pensamiento lógico."
  },
  {
    year: "2024",
    title: "Business Intelligence",
    note:
      "Especialización en Power BI, modelado de datos, Power Query, DAX, KPIs, dashboards ejecutivos y visualización de información para la toma de decisiones."
  },
  {
    year: "2025",
    title: "Ciencia de Datos y Machine Learning",
    note:
      "Inicio del aprendizaje práctico en Python aplicado al análisis de datos, EDA, clustering (K-Means), regresión, clasificación y librerías del ecosistema científico."
  },
  {
    year: "2026",
    title: "IBM Data Science Professional Certificate",
    note:
      "Desarrollo de proyectos reales utilizando Python, Pandas, NumPy, Scikit-Learn, visualización de datos y modelos de Machine Learning."
  },
  {
    year: "2026",
    title: "Google Advanced Data Analytics",
    note:
      "Formación en analítica avanzada, estadística aplicada, toma de decisiones basada en datos, modelos predictivos y mejores prácticas de análisis profesional."
  }
];

export const technologies = [
  {
    category: "Analítica de Datos",
    icon: BarChart3,
    items: [
      ["Power BI", "Avanzado", "Dashboards ejecutivos y KPIs"],
      ["Excel", "Avanzado", "Limpieza, fórmulas y análisis"],
      ["Tableau", "Básico", "Visualización exploratoria"]
    ]
  },
  {
    category: "Machine Learning",
    icon: BrainCircuit,
    items: [
      ["Scikit Learn", "Intermedio", "Modelos supervisados y evaluación"],
      ["Regresión Lineal", "Básico", "Predicción y relación entre variables"],
      ["K-Means", "Básico", "Segmentación y clustering"]
    ]
  },
  {
    category: "Deep Learning",
    icon: BrainCircuit,
    items: [
      ["TensorFlow", "Básico", "Modelos neuronales iniciales"],
      ["Keras", "Básico", "Prototipado de redes neuronales"],
      ["Matplotlib", "Avanzado", "Visualización técnica y análisis"]
    ]
  },
  {
    category: "Cloud",
    icon: Cloud,
    items: [
      ["Streamlit", "Intermedio", "Aplicaciones interactivas de datos"],
      ["Vercel", "Básico", "Publicación web y despliegue"],
      ["GitHub", "Intermedio", "Versionado y repositorios"]
    ]
  },
  {
    category: "Ingeniería de Datos",
    icon: Database,
    items: [
      ["SQL", "Intermedio", "Consultas, joins y análisis"],
      ["EDA", "Intermedio", "Exploración y preparación"],
      ["Pandas", "Avanzado", "Transformación y análisis"]
    ]
  },
  {
    category: "Programación",
    icon: Code2,
    items: [
      ["Python", "Intermedio", "Análisis, automatización y ML"],
      ["HTML & CSS", "Intermedio", "Interfaces y maquetación"],
      ["Git", "Intermedio", "Control de versiones"]
    ]
  }
];

export const projects = [
  {
    name: "Sistema de Detección de Fraude",
    domain: "Finanzas",
    metric: "Proyecto real",
    problem: "Detectar transacciones sospechosas en datos financieros.",
    dataset: "Datos transaccionales con clases desbalanceadas.",
    methodology: "Limpieza, feature engineering, XGBoost y ajuste de umbral.",
    impact: "Apoyo a la priorización de alertas de fraude.",
    stack: ["Python", "Pandas", "NumPy", "Scikit Learn", "Matplotlib", "Streamlit"],
    icon: ShieldCheck,
    github: "https://github.com/DanielRD0/Financial-Fraud-Detection/tree/main"
  },
  {
    name: "Modelo Predictivo UFC",
    domain: "Machine Learning",
    metric: "5 de 8 principales",
    problem: "Estimar probabilidades de victoria en una cartelera UFC.",
    dataset: "Estadísticas históricas, diferencias físicas, récord y rendimiento reciente.",
    methodology: "Selección de variables, entrenamiento supervisado y pruebas de predicción.",
    impact: "El modelo acertó 5 de 8 peleas principales durante las pruebas.",
    stack: ["Python", "Pandas", "NumPy", "Scikit Learn", "Matplotlib", "Streamlit"],
    icon: Target,
    github: "https://github.com/DARIELADOLFO/ANALISIS_PREDICTIVO_UFC_CASA_BLANCA"
  },
  {
    name: "Análisis Inteligente de un Canal de YouTube",
    domain: "Analítica",
    metric: "Retención y engagement",
    problem: "Identificar qué contenido genera más retención y engagement.",
    dataset: "Métricas del canal, crecimiento y comportamiento del contenido.",
    methodology: "EDA, correlaciones, visualizaciones y regresión lineal.",
    impact: "Proyección de vistas futuras y lectura práctica de desempeño.",
    stack: ["Python", "Pandas", "NumPy", "Matplotlib", "Seaborn", "Scikit Learn"],
    icon: TrendingUp,
    github: "https://github.com/DARIELADOLFO/-ANALISIS-Y-STORYTELLING---YOUTUBE-CHANNEL-DATASET/tree/main"
  },
  {
    name: "Predictor FIFA World Cup 2026",
    domain: "Simulación",
    metric: "Monte Carlo",
    problem: "Estimar probabilidades de clasificación y campeón del mundial.",
    dataset: "Simulaciones, rendimiento histórico y variables de partidos.",
    methodology: "Monte Carlo, Random Forest y CatBoost.",
    impact: "Predicción de semifinalistas y probabilidades de campeón.",
    stack: ["Python", "Pandas", "NumPy", "Random Forest", "CatBoost", "Matplotlib"],
    icon: Radar,
    github: "https://github.com/DARIELADOLFO/MODELO_PREDICCION_FIFA_MUNDIAL_2026"
  },
  {
    name: "Clasificador Inteligente de Sentimientos",
    domain: "IA Aplicada",
    metric: "API + SQL",
    problem: "Clasificar comentarios positivos, negativos y neutrales automáticamente.",
    dataset: "Comentarios persistidos en base de datos SQL.",
    methodology: "API REST, clasificación automática y dashboard de métricas.",
    impact: "Persistencia de resultados y análisis de sentimiento reproducible.",
    stack: ["Python", "SQL", "API REST", "Scikit Learn", "Pandas", "Streamlit"],
    icon: FileCode2,
    github: "https://github.com/DARIELADOLFO/PROYECTO-FINAL_MODULO_APIS"
  }
];

export const certifications = [
  ["IBM", "Data Science Professional Certificate"],
  ["Google", "Advanced Data Analytics Professional Certificate"],
  ["Microsoft", "DP-605"],
  ["Microsoft", "Prepare and Visualize Data with Microsoft Power BI"],
  ["LinkedIn Learning", "Business Intelligence"],
  ["Udemy", "Excel Avanzado / Power BI Avanzado"],
  ["Coursera", "Data Science & Machine Learning"]
];

export const journey: [string, string][] = [
  ["EDA", "Understand distributions, missingness and business context."],
  ["Feature Engineering", "Transform raw records into predictive signal."],
  ["Training", "Compare models with disciplined validation."],
  ["Validation", "Stress-test precision, recall and stability."],
  ["Tuning", "Optimize the metric that matters to the decision."],
  ["Deployment", "Ship usable apps, APIs and dashboards."],
  ["Monitoring", "Track drift, quality and business outcomes."]
];

export const videos = [
  ["Python", "Primer proyecto de análisis de datos con Python"],
  ["Power BI", "Cómo construir un dashboard ejecutivo"],
  ["Machine Learning", "Entrenando mi primer modelo predictivo"],
  ["SQL", "Consultas SQL para análisis de datos"],
  ["IA", "Automatizando tareas con inteligencia artificial"]
];

export const footerLinks = [
  ["LinkedIn", "#contact"],
  ["GitHub", "#contact"],
  ["YouTube", "#contact"],
  ["Instagram", "#contact"]
];
