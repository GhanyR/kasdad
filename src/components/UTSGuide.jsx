import { useState, useEffect } from "react";

// ======================== DATA ========================

const TOPICS = [
  {
    week: 1, id: "ai", title: "Kecerdasan Artifisial", icon: "🤖", accent: "#e8b931",
    weight: 8, freq: 3,
    subtopics: [
      { name: "4 Perspektif Definisi AI", detail: "Thinking Humanly (cognitive modeling — emulasi cara berpikir manusia via introspeksi, psikologi eksperimen, brain imaging), Thinking Rationally (laws of thought — penalaran tak terbantahkan via logika formal, TAPI tidak scalable & manusia tidak selalu rasional), Acting Humanly (Turing Test — mesin lolos jika penguji tidak bisa bedakan dgn manusia, butuh NLP, knowledge representation, reasoning, ML; KRITIK: pesawat terbang tidak meniru burung), Acting Rationally (rational agent — 'do the right thing', pendekatan DOMINAN & STANDAR KA modern, bisa dimodelkan secara matematis, mencakup thinking rationally + perilaku tanpa penalaran seperti refleks)" },
      { name: "Intelligent Agents & PEAS", detail: "Agen = entitas yang mempersepsi lingkungan via SENSOR dan bertindak via ACTUATOR. Fungsi agen: f: P* → A (memetakan percept sequence ke action). PEAS framework: Performance (ukuran kinerja, diukur pada LINGKUNGAN bukan internal state — contoh: robot vacuum diukur dari kebersihan lantai, BUKAN jumlah debu yang disedot), Environment (dunia luar tempat agen beroperasi — jalan, penumpang, kendaraan lain), Actuators (alat bertindak — kemudi, gas, rem, klakson, layar, speaker), Sensors (alat observasi — kamera, sonar, speedometer, GPS, microphone, infrared)" },
      { name: "Contoh PEAS", detail: "Taksi Otonom: P=aman+cepat+hemat, E=jalan+rambu+kendaraan+pejalan kaki, A=kemudi+gas+rem+klakson, S=kamera+sonar+GPS+speedometer. Asisten Virtual Ponsel: P=akurasi respon+kepuasan user, E=user+internet+apps, A=layar+speaker, S=microphone+touchscreen+kamera. Robot Vacuum: P=kebersihan lantai, E=ruangan+furnitur+debu, A=roda+brush+suction, S=infrared+bumper sensor" },
      { name: "Task Environment Properties (7 Sifat)", detail: "① Fully Observable vs Partially Observable (sensor akses seluruh lingkungan? Catur=fully, Taksi=partially). ② Single-agent vs Multi-agent (sendiri atau ada agen lain? Bisa kompetitif/kooperatif). ③ Deterministic vs Nondeterministic/Stochastic (next state ditentukan penuh oleh current state+action? Catur=deterministic, Taksi=stochastic). ④ Episodic vs Sequential (keputusan satu episode pengaruhi episode lain? Spam filter=episodic, Catur=sequential). ⑤ Static vs Dynamic vs Semi-dynamic (lingkungan berubah saat agen 'berpikir'? Catur dgn clock=semi-dynamic, Crossword=static). ⑥ Discrete vs Continuous (state/action terbatas? Catur=discrete, Taksi=continuous). ⑦ Known vs Unknown (agen tahu 'hukum fisik' lingkungan? Known ≠ fully observable! Solitaire=known+partially observable)" },
      { name: "Contoh Analisis Environment", detail: "Catur dengan clock: Fully obs, Multi-agent, Deterministic, Sequential, Semi-dynamic, Discrete, Known. Catur tanpa clock: Fully obs, Multi-agent, Deterministic, Sequential, Static, Discrete, Known. Taksi: Partially obs, Multi-agent, Stochastic, Sequential, Dynamic, Continuous, Unknown. Tic-tac-toe: Fully obs, Multi-agent, Deterministic, Sequential, Static, Discrete, Known. Spam filter: Partially obs, Single, Stochastic, Episodic, Static, Discrete. Dunia nyata: Partially obs, Multi-agent, Nondeterministic, Sequential, Dynamic, Continuous, Unknown." },
      { name: "5 Tipe Program Agen", detail: "① Simple Reflex Agent — condition→action rules, HANYA cocok jika fully observable, kecerdasan terbatas (if car-in-front-braking then brake). ② Model-based Reflex Agent — punya internal state yang merekam keadaan lingkungan via model transisi (efek action) & model sensor, bisa handle partially observable ('best guess'). ③ Goal-based Agent — model + informasi GOAL, pemilihan action mempertimbangkan masa depan, pakai search/planning. ④ Utility-based Agent — banyak cara capai goal, pilih yang paling disukai (lebih cepat/aman/murah), utility function = internalisasi performance measure, bisa handle partially observable & nondeterministic. ⑤ Learning Agent — komponen: Performance element (pilih action) + Learning element (perbaiki dgn bantuan critic) + Problem generator (suggest exploratory actions). Semua tipe agen bisa dijadikan learning agent." },
      { name: "Taksonomi AI", detail: "Berdasarkan scope: Narrow/Weak AI (1 tugas spesifik, contoh: chatbot, spam classifier — SEMUA AI saat ini) vs AGI/Strong AI (setara kecerdasan manusia — BELUM ADA, masih riset). Berdasarkan domain: NLP, Computer Vision, Speech Processing, Knowledge Representation, Robotics. Hierarchy: AI ⊃ Machine Learning ⊃ Neural Networks ⊃ Deep Learning. Data Science & Big Data beririsan dengan AI." },
      { name: "Konsep Dasar Machine Learning", detail: "Traditional Programming: Input + Rules → Output. Machine Learning: Input + Output → Rules/Model. Tipe ML: Supervised (classification: output diskret, regression: output kontinu — ada labeled data), Unsupervised (clustering: grupkan data mirip — TIDAK ada label), Semi-supervised, Reinforcement (reward/punishment). 3 Elemen ML: Representation (bentuk model: DT, NN, KNN), Evaluation (ukur kualitas: accuracy, MSE), Optimization (cari model terbaik: gradient descent, greedy search)." },
    ],
    traps: [
      "Sensor ≠ Environment! Microphone = SENSOR (alat observasi). Voice command dari user = bagian ENVIRONMENT.",
      "Performance measure diukur pada ENVIRONMENT (efek yang diinginkan), BUKAN pada internal state agen!",
      "Jika kinerja robot vacuum diukur HANYA dari 'jumlah debu yang disedot dalam 8 jam' → robot bisa sengaja tabur debu lalu sedot!",
      "Acting rationally ≠ selalu benar. Rational = memilih tindakan TERBAIK dengan informasi yang ADA (bounded rationality).",
      "Tic-tac-toe: DETERMINISTIC (bukan nondeterministic!) — hasil setiap langkah PASTI, tidak ada unsur acak.",
      "Spam filter: EPISODIC (keputusan 1 email tidak pengaruhi email lain), STATIC, DISCRETE.",
      "Known ≠ Fully Observable! Solitaire = known (tahu aturan) tapi partially observable (kartu tertutup).",
      "Video game baru = fully observable (layar tampilkan semua) tapi UNKNOWN (belum tahu efek tombol).",
      "Mematikan AC saat suhu mencapai x°C = BUKAN acting rationally (hanya rule sederhana, tidak 'do the right thing' secara rasional).",
      "Semua AI yang ada SAAT INI = Narrow/Weak AI. AGI/Strong AI BELUM ADA.",
      "Clustering ≠ Classification! Clustering = unsupervised (tanpa label), Classification = supervised (ada label).",
    ],
    formulas: ["f: P* → A (agent function)", "PEAS = Performance + Environment + Actuators + Sensors"],
  },
  {
    week: 1, id: "search", title: "Search Algorithms", icon: "🔍", accent: "#9b8aff",
    weight: 5, freq: 1,
    subtopics: [
      { name: "Problem-Solving Agent", detail: "Goal-based agent yang memformulasikan masalah sebagai STATE SPACE REPRESENTATION lalu menjalankan search algorithm untuk menemukan SOLUSI (sequence of actions dari initial state ke goal state). Asumsi: environment fully observable, deterministic, static, discrete. Setelah solusi ditemukan, agen bisa eksekusi 'with eyes closed'." },
      { name: "State Space Representation", detail: "Komponen: ① States (keadaan agen), ② Initial State (S_init), ③ PosAct(s) — set of possible actions di state s, ④ NextState(s,a) — transition function, ⑤ ActCost(s,a,s') — step cost, ⑥ Goal Test (explicit: set of goal states, atau implicit: testable condition). State space = graph: nodes=states, edges=actions, weights=cost. PathCost(p) = total step costs. Optimal solution = path dengan PathCost minimum." },
      { name: "Contoh: Romanian Agent", detail: "Goal: Arad → Bucharest. States: LocatedIn(city). Actions: drive to neighboring city. Transition: NextState(Arad, DriveToSibiu) = Sibiu. StepCost: jarak antar kota (edge weight pada peta). Solution: sequence of driving actions. Optimal solution: path dengan total jarak minimum." },
      { name: "Graph Search Algorithm", detail: "Komponen: frontier (nodes belum di-expand), explored (states sudah dilihat). Proses: ① Init frontier dgn root node, ② Loop: Pop node dari frontier, ③ Jika goal → return solution, ④ Expand node: generate successors, tambahkan ke frontier jika belum di-explored. Perbedaan strategi = cara Pop (FIFO, LIFO, priority queue)." },
      { name: "BFS (Breadth-First Search)", detail: "Frontier = QUEUE (FIFO). Prinsip: expand node terdekat dari root dulu (level by level). Properties: Complete ✓ (jika b bounded), Time O(b^d), Space O(b^d) — MEMORY EXPENSIVE!, Optimal ✓ (HANYA jika semua step cost SAMA). Masalah: space complexity eksponensial — d=12, b=10 → ~1 petabyte!" },
      { name: "DFS (Depth-First Search)", detail: "Frontier = STACK (LIFO). Prinsip: expand node terjauh dari root (go deep first). Properties: Complete ✗ (bisa infinite loop pada graph tanpa batas — PERLU cycle detection!), Time O(b^m), Space O(bm) — HEMAT memory!, Optimal ✗. Variasi: Backtracking (1 successor at a time, modify state in-place), Depth-Limited (batas kedalaman ℓ), Iterative Deepening (DLS berulang dgn ℓ naik)." },
      { name: "UCS (Uniform Cost Search)", detail: "Frontier = PRIORITY QUEUE (berdasarkan path cost g(n)). Prinsip: expand node dgn path cost TERKECIL. Properties: Complete ✓ (jika semua step cost > 0), Time O(b^(1+C*/ε)), Space O(b^(1+C*/ε)), Optimal ✓. UCS = BFS jika semua step cost sama. UCS mirip Dijkstra's shortest path. UCS = A* dengan h(n)=0." },
      { name: "IDS (Iterative Deepening Search)", detail: "Gabungan DFS + BFS: jalankan DFS berulang dgn depth limit ℓ = 0, 1, 2, ... Kombinasi keunggulan: Space O(bd) seperti DFS + Complete & Optimal seperti BFS. Meskipun re-expand nodes, overhead minimal karena mayoritas nodes ada di level terdalam." },
      { name: "Informed Search: Greedy Best-First", detail: "Frontier = Priority Queue berdasarkan h(n) SAJA (heuristic = estimasi cost dari n ke goal). Prinsip: expand node yang TAMPAKNYA paling dekat ke goal. Properties: Complete ✗ (bisa stuck di loop), Optimal ✗. Cepat tapi 'greedy' — bisa tertipu oleh heuristic yang misleading." },
      { name: "Informed Search: A*", detail: "Frontier = Priority Queue berdasarkan f(n) = g(n) + h(n). g(n) = actual cost dari start ke n, h(n) = estimated cost dari n ke goal. Menggabungkan kekuatan UCS (actual cost) + Greedy (heuristic). Properties: Complete ✓, Optimal ✓ JIKA h(n) admissible (tree search) atau consistent (graph search)." },
      { name: "Heuristic Properties", detail: "Admissible: h(n) ≤ h*(n) — TIDAK PERNAH overestimate cost sebenarnya ke goal. Consistent/Monotonic: h(n) ≤ c(n,a,n') + h(n') — memenuhi triangle inequality. PENTING: Consistent → Admissible, tapi Admissible ↛ Consistent. A* dengan consistent heuristic → optimal pada graph search." },
    ],
    traps: [
      "A* optimal HANYA jika heuristic admissible (tree search) atau consistent (graph search)!",
      "UCS = A* dengan h(n) = 0 untuk semua n — jadi UCS selalu optimal",
      "BFS optimal HANYA jika semua step cost SAMA. Jika beda, pakai UCS!",
      "DFS TIDAK complete pada graph infinite/tanpa cycle detection — bisa infinite loop!",
      "DFS TIDAK optimal — bisa temukan solusi yang bukan shortest path",
      "Space complexity BFS = O(b^d) — SANGAT besar! DFS hanya O(bm) — jauh lebih hemat",
      "IDS terlihat wasteful (re-expand) tapi sebenarnya overhead kecil karena nodes terbanyak di level terdalam",
      "Known environment ≠ Fully observable! Solitaire = known rules tapi kartu tertutup (partially observable)",
      "Heuristic h(n) = 0 untuk semua n → A* menjadi UCS (selalu admissible, tapi tidak informatif)",
      "Evaluasi search: Completeness, Time, Space, Optimality — hafal untuk setiap algoritma!",
    ],
    formulas: ["f(n) = g(n) + h(n) [A*]", "h(n) ≤ h*(n) [admissible]", "h(n) ≤ c(n,a,n') + h(n') [consistent]", "BFS: Time O(b^d), Space O(b^d)", "DFS: Time O(b^m), Space O(bm)", "UCS: Time O(b^(1+C*/ε))"],
  },
  {
    week: 2, id: "ds", title: "Data Science & Metodologi", icon: "📊", accent: "#f472b6",
    weight: 8, freq: 3,
    subtopics: [
      { name: "Apa itu Data Science?", detail: "Ekstraksi INSIGHT dari data yang messy — untuk pengambilan keputusan masa depan atau pemahaman masa lampau. Koneksi ke AI: Data Science menggunakan learning agent (train model dari data → inference). Big Data (5V: Volume, Velocity, Variety, Veracity, Value) menyediakan 'bahan baku'. Data Science adalah PROSES, bukan hanya modeling." },
      { name: "4 Tipe Analytics (SANGAT PENTING!)", detail: "① DESCRIPTIVE: 'Apa yang TERJADI?' — analisis data historis/lampau. Contoh: 'Berapa total kasus COVID selama PSBB Jakarta?' 'Kata kunci apa paling sering dicari di Google?'. ② DIAGNOSTIC: 'MENGAPA terjadi?' — cari penyebab dari data historis. Contoh: 'Mengapa churn rate naik?' 'Mengapa penjualan produk Y turun?'. ③ PREDICTIVE: 'Apa yang AKAN terjadi?' — prediksi masa depan. Contoh: 'Berapa suhu Malang minggu depan?' 'Berapa harga saham besok?'. ④ PRESCRIPTIVE: 'Apa yang HARUS DILAKUKAN?' — rekomendasi aksi terbaik. Contoh: 'Berapa harga optimal untuk produk baru?' 'Lagu apa yang direkomendasikan untuk user A?'" },
      { name: "Peran dalam Data Science", detail: "Data Engineer: infrastruktur, ETL, database, pipeline data (Hadoop, Spark). Data Scientist: modeling, ML/DL, feature engineering, storytelling. Business Stakeholder: ROI, value chain, keputusan bisnis. BELUM ada standar baku — setiap perusahaan bisa beda." },
      { name: "CRISP-DM: 6 Fase (WAJIB HAFAL)", detail: "① Business Understanding: definisikan problem bisnis → tentukan pendekatan analitik (descriptive/diagnostic/predictive/prescriptive) → tentukan tujuan spesifik. ② Data Understanding: kumpulkan data (primer/sekunder, open data, API, web scraping, IoT) → pahami data dgn EDA & statistik → iterasi jika perlu. ③ Data Preparation: cleaning (missing, noise, inconsistent) → integration → transformation (normalisasi, encoding) → selection → reduction. PALING LAMA: 70-90% waktu proyek! ④ Modeling: kembangkan model sesuai pendekatan yg dipilih → iteratif (eksperimen berulang). ⑤ Evaluation: ukur kualitas model dgn metrik → cek apakah menjawab masalah bisnis. ⑥ Deployment: deploy ke produksi → evaluasi berkelanjutan → 'ML models always get worse over time' (data baru)." },
      { name: "KONEKSI: Mengapa CRISP-DM Iteratif?", detail: "Data Understanding bisa kembali ke Business Understanding jika: data tidak tersedia/tidak sesuai, atau business problem perlu dirumuskan ulang. Evaluation bisa kembali ke Data Preparation jika: kinerja model kurang baik, atau fitur perlu ditambah/diubah. Deployment bisa kembali ke awal jika: model di lapangan performanya beda dgn di lab. Ini bukan waterfall — SPIRAL/ITERATIF!" },
      { name: "Studi Kasus: Pankreatitis Akut", detail: "Business Understanding: RS ingin identifikasi pasien AP berisiko tinggi → tujuan: prediksi risiko kematian → pendekatan: klasifikasi → model: Decision Tree. Data Understanding: data pasien >18th, ICU ≥24jam, diagnosis AP → catatan elektronik RS. Data Preparation: gabung data dari 3 sumber (pendaftaran+lab+ICU), hapus duplikat, hapus >20% missing, agregasi dgn mean. Modeling: Decision Tree. Evaluation: apakah model menjawab pertanyaan awal? Deployment: real-time → feedback → perbaikan kontinu." },
      { name: "ML Tasks — Koneksi ke Seluruh Kuliah", detail: "Classification (supervised, output diskret): spam/not spam, sakit/sehat → model: DT, RF, KNN, Naive Bayes. Regression (supervised, output kontinu): harga rumah, umur → model: KNN Regression, Regression Tree. Clustering (unsupervised, tanpa label): segmentasi customer → model: K-Means, Hierarchical. JANGAN CAMPUR: Clustering ≠ Classification!" },
      { name: "Kegagalan Proyek DS", detail: "85% proyek gagal (Gartner 2018). Penyebab: problem tidak jelas/over-promise, data tidak cukup/tidak tepat/bias, model terlalu kompleks, metrik tidak tepat, one-man show. Pembelajaran: Business Understanding dan Data Understanding adalah FONDASI — skip ini = proyek gagal." },
    ],
    traps: [
      "Download/kumpulkan data = Data UNDERSTANDING, BUKAN Data Preparation! Preparation = cleaning & transformasi.",
      "Evaluasi model = tahap EVALUATION, bukan Modeling! Modeling = bangun model, Evaluation = ukur kinerjanya.",
      "'Berapa harga optimal produk baru?' = PRESCRIPTIVE (rekomendasi aksi), bukan Predictive!",
      "'Bagaimana penjualan produk X paruh kedua 2025?' = PREDICTIVE (masa depan), bukan Descriptive!",
      "'Analisis kasus COVID selama PSBB' = DESCRIPTIVE (historis/masa lalu).",
      "'Mengapa churn naik?' = DIAGNOSTIC (cari penyebab), bukan Descriptive!",
      "Clustering ≠ Classification! Clustering = unsupervised (tanpa label), Classification = supervised.",
      "Mengelompokkan pelanggan untuk target iklan = CLUSTERING (bukan classification, karena tidak ada label awal).",
      "Estimasi shelf-life/masa pakai = REGRESSION (output kontinu), bukan classification!",
      "Data Preparation paling LAMA (70-90% waktu), tapi sering dianggap remeh.",
      "CRISP-DM ITERATIF — bisa kembali ke fase sebelumnya kapan saja, bukan waterfall!",
    ],
    formulas: ["CRISP-DM: BU → DU → DP → M → E → D (iteratif)"],
  },
  {
    week: 3, id: "eda", title: "EDA & Statistik", icon: "📈", accent: "#fbbf24",
    weight: 10, freq: 3,
    subtopics: [
      { name: "Apa itu EDA & Mengapa Penting?", detail: "EDA = Exploratory Data Analysis (John Tukey, 1977) — tahap analisis AWAL pada data. TUJUAN: pahami representasi data, temukan pola, anomali, distribusi, hubungan antar variabel SEBELUM modeling. Menjawab: Berapa atribut & tipe apa? Ada missing values? Bagaimana distribusi? Ada outlier? Ada korelasi? Dataset imbalanced? EDA = STATISTIK DESKRIPTIF + VISUALISASI." },
      { name: "Tipe Data: Nominal-Ordinal-Interval-Rasio", detail: "NOMINAL: kategori TANPA urutan — warna, kode pos (12345!), gender. ORDINAL: kategori DENGAN urutan — pendidikan (SD<SMP<SMA), kepuasan (rendah<sedang<tinggi). INTERVAL: numerik, jarak bermakna, 0 arbitrary — suhu °C, tahun. RASIO: numerik, 0 absolut — berat, gaji, umur, jarak. KRUSIAL: tipe data menentukan preprocessing & visualisasi yang tepat!" },
      { name: "Central Tendency: Mean, Median, Mode", detail: "MEAN: sensitif OUTLIER — satu nilai ekstrem 'tarik' mean. MEDIAN: ROBUST terhadap outlier, cocok untuk data skewed. MODE: satu-satunya ukuran untuk KATEGORIKAL. KONEKSI: mean ≈ median → simetris. mean > median → RIGHT-skewed. mean < median → LEFT-skewed." },
      { name: "Variabilitas: Range, IQR, Variance, Std Dev", detail: "RANGE = max - min (sensitif outlier). IQR = Q3 - Q1 (hanya SATU nilai per dataset!). Q1=P25 (median bawah), Q2=P50 (median), Q3=P75 (median atas). VARIANCE = Σ(xᵢ−μ)²/n. STD DEV = √Variance — satuan sama dgn data asli." },
      { name: "Outlier Detection (IQR Method)", detail: "Lower Bound = Q1 - 1.5×IQR, Upper Bound = Q3 + 1.5×IQR. Data di luar [LB, UB] = OUTLIER. Contoh: [5,6,3,1,4,2] → sort [1,2,3,4,5,6]. Q1=2, Q3=5, IQR=3. LB=2-4.5=-2.5, UB=5+4.5=9.5 → Tidak ada outlier." },
      { name: "Skewness & Kurtosis", detail: "SKEWNESS: Right-skewed (positif, ekor kanan, mean>median). Left-skewed (negatif, ekor kiri, mean<median). Normal: skewness≈0. KURTOSIS: Mesokurtic (=3, normal), Leptokurtic (>3, ekor tebal=banyak outlier), Platykurtic (<3, ekor tipis)." },
      { name: "Korelasi: Pearson vs Spearman", detail: "PEARSON r: kekuatan hubungan LINEAR. r=1 positif sempurna, r=-1 negatif sempurna, r=0 TIDAK ada hubungan LINEAR (tapi BISA nonlinear kuat!). SPEARMAN ρ: hubungan MONOTONIC (tidak harus linear). Pakai Spearman jika data ordinal, nonlinear, atau outlier. |r|>0.7=kuat. r=-0.89 artinya hubungan KUAT negatif." },
      { name: "Visualisasi (SERING KELUAR!)", detail: "HISTOGRAM: distribusi 1 var numerik (bin size penting!). BAR CHART: perbandingan kategori. SCATTER: hubungan 2 var numerik. BOXPLOT: distribusi+outlier+median+IQR. HEATMAP: korelasi matrix. PIE/DONUT: proporsi. LINE: trend waktu. BUBBLE: 4 variabel (x,y,size,color). Histogram ≠ Bar chart! Pie chart TIDAK untuk relationship 2 var kuantitatif." },
      { name: "KONEKSI: EDA → Data Preparation", detail: "EDA MENEMUKAN masalah → Preparation MENYELESAIKAN. EDA: missing values → Prep: imputasi. EDA: outlier → Prep: handle/remove. EDA: skewed → Prep: log transform. EDA: fitur berkorelasi tinggi → Prep: drop redundan. EDA: imbalanced → Prep: oversampling. TANPA EDA = 'tembak dalam gelap'!" },
    ],
    traps: [
      "Mean > Median → RIGHT-skewed (ekor kanan, outlier atas). Bukan left-skewed!",
      "Pearson r = 0.02 TIDAK berarti tidak ada hubungan! Bisa ada hubungan NONLINEAR kuat → cek Spearman/scatter.",
      "|r| mendekati 1 = kuat. r = -0.89 = kuat NEGATIF (lihat absolute value!)",
      "Colored bubble plot BISA visualisasi 4 variabel (x, y, size, color).",
      "Histogram bin terlalu besar → pola HILANG. Bar chart ≠ Histogram!",
      "Pie chart TIDAK cocok untuk relationship 2 var kuantitatif.",
      "IQR per dataset = SATU nilai. 'Dataset punya beberapa IQR' = SALAH.",
      "Mean A > mean B → TIDAK bisa pastikan median A > median B!",
      "Max A > max B → juga TIDAK bisa pastikan median A > median B!",
      "High kurtosis → banyak OUTLIER. Boxplot bisa BANDINGKAN distribusi antar kategori.",
    ],
    formulas: ["IQR = Q3 - Q1", "Outlier: x < Q1−1.5·IQR or x > Q3+1.5·IQR", "Pearson r = Σ(xᵢ−x̄)(yᵢ−ȳ) / √[Σ(xᵢ−x̄)²·Σ(yᵢ−ȳ)²]", "Variance = Σ(xᵢ−μ)²/n", "Std Dev = √Variance"],
  },
  {
    week: 3, id: "prep", title: "Data Preparation", icon: "🧹", accent: "#34d399",
    weight: 12, freq: 3,
    subtopics: [
      { name: "Mengapa Data Preparation?", detail: "Data dunia nyata = 'DIRTY': incomplete (missing values), noisy (error/outlier), inconsistent (format beda). GIGO: Garbage In, Garbage Out — model sebaik apapun, jika data jelek → hasil jelek. Data Preparation = 70-90% waktu proyek DS! Mencakup: Data Cleaning, Integration, Transformation, Selection, Reduction, Discretization, Balancing." },
      { name: "Data Cleaning: Missing Values", detail: "Opsi: ① Tanya pengumpul data. ② Drop (baris atau kolom — jika sedikit). ③ Imputasi Mean (JANGAN jika ada outlier! Mean tertarik ke outlier). ④ Imputasi Median (ROBUST terhadap outlier — pilihan AMAN). ⑤ Imputasi Mode (untuk KATEGORIKAL, contoh: fuel_type → 'gasoline' paling sering). ⑥ Nearest Neighbor imputation (ambil nilai dari data terdekat). ⑦ Imputasi berdasarkan domain knowledge." },
      { name: "Data Cleaning: Noise & Outlier", detail: "Noise = error data. Sumber: human error, measurement error, hardware failure. Handle: regression smoothing, clustering (detect outlier), manual inspection. Outlier: nilai SANGAT jauh dari data lain. Deteksi: IQR method, Z-score (|z|>3 = outlier), visualisasi boxplot. Handle: remove, cap/winsorize, atau biarkan jika memang data valid." },
      { name: "Data Cleaning: Inconsistency", detail: "Format beda (tanggal: DD/MM/YYYY vs MM-DD-YYYY), standar beda (metric vs imperial), entry beda (Bill Clinton = William Clinton). Solusi: standardisasi format, entity resolution, data formatting agar konsisten & mudah diproses." },
      { name: "Data Integration", detail: "Gabung data dari BANYAK sumber. Tantangan: schema integration (A.cust_id ≡ B.cust_no), entity identification (Bill = William Clinton), value conflicts (metric vs imperial), redundansi (fitur turunan: annual_revenue = monthly×12). Deteksi redundansi: korelasi Pearson, Chi-Square." },
      { name: "Data Transformation: Normalisasi/Scaling", detail: "MENGAPA perlu? Fitur dgn range besar MENDOMINASI jarak (KNN!) — 'income' range 0-20000 vs 'age' range 0-100. MIN-MAX: (x-min)/(max-min) → [0,1]. Nilai min→0, max→1. TIDAK hilangkan outlier. Z-SCORE: (x-μ)/σ → mean=0, std=1. Di bawah mean→negatif, di atas→positif. KAPAN perlu? KNN=WAJIB, DT=TIDAK PERLU, RF=TIDAK PERLU, NB=tergantung." },
      { name: "Data Transformation: Encoding", detail: "Mengubah data KATEGORIKAL → NUMERIK agar bisa diproses algoritma. ONE-HOT ENCODING (OHE): untuk NOMINAL — buat kolom baru per kategori (0/1). Tambah jumlah kolom! Contoh: warna {merah,biru,hijau} → 3 kolom baru. LABEL ENCODING: untuk ORDINAL — map ke angka berurutan. Contoh: {rendah=1, sedang=2, tinggi=3}. TARGET/MEAN ENCODING: map kategori ke mean target — risiko overfitting. FREQUENCY ENCODING: map ke frekuensi." },
      { name: "Data Reduction & Discretization", detail: "Dimensionality Reduction: kurangi jumlah fitur — PCA, feature selection. Numerosity Reduction: kurangi jumlah data — sampling, clustering, regression models. Data Compression: string/audio/video compression. Discretization/BINNING: konversi kontinu → kategori (umur → kelompok umur). Equal-width vs equal-frequency bins." },
      { name: "Data Balancing", detail: "Imbalanced data: satu kelas sangat dominan (99% sehat vs 1% sakit). Problem: model prediksi semua majority class → accuracy tinggi tapi TIDAK BERGUNA. Solusi: Oversampling (tambah data minoritas, SMOTE), Undersampling (kurangi mayoritas), Class weights. HANYA untuk CLASSIFICATION, bukan regression!" },
      { name: "KONEKSI: Prep Berbeda per Model!", detail: "KNN: WAJIB normalisasi (distance-based) + WAJIB encoding (butuh numerik) + handle outlier (sensitif). Decision Tree: TIDAK perlu normalisasi + TIDAK wajib encoding (bisa handle categorical) + bisa handle missing (tapi tetap bagus kalau dihandle). Random Forest: sama seperti DT. Naive Bayes: fitur numerik→Gaussian, fitur kategorikal→frekuensi. SETIAP MODEL PUNYA kebutuhan prep BERBEDA!" },
    ],
    traps: [
      "Kode Pos (12345) = NOMINAL, meskipun angka! TIDAK boleh di-scale/normalize!",
      "Ordinal (Rendah/Sedang/Tinggi) → LABEL Encoding. JANGAN di-OHE (kehilangan urutan)!",
      "Mean imputasi + banyak outlier = BURUK → pakai MEDIAN (robust).",
      "KNN WAJIB normalisasi, Decision Tree TIDAK PERLU.",
      "Regresi TIDAK perlu handle imbalanced data (itu masalah CLASSIFICATION).",
      "Min-Max scaling TIDAK menghilangkan outlier — hanya compress range.",
      "Gaji=0 pada fitur rasio → konteks penting: bisa berarti 'tidak punya gaji' (valid) atau error.",
      "Z-score: di bawah mean → NEGATIF, di atas mean → POSITIF.",
      "OHE MENAMBAH jumlah kolom dataset (1 kolom → N kolom per kategori).",
      "Fitur normalisasi dilakukan pada DATA TRAIN, lalu APPLY ke data test dgn parameter yang SAMA!",
      "Data Preparation = 70-90% WAKTU proyek DS. Jangan skip!",
    ],
    formulas: ["Min-Max = (x − min) / (max − min)", "Z-Score = (x − μ) / σ"],
  },
  {
    week: 4, id: "feat", title: "Feature Engineering", icon: "⚙️", accent: "#67e8f9",
    weight: 5, freq: 2,
    subtopics: [
      { name: "Feature Engineering", detail: "Membuat fitur baru dari yang ada: binning (age→age_group), interaction features, polynomial features, log transform, datetime decomposition" },
      { name: "Encoding Lanjutan", detail: "Target/Mean Encoding (map kategori ke mean target — risiko overfitting), Frequency Encoding (map ke frekuensi kemunculan)" },
      { name: "Feature Selection", detail: "Filter (korelasi, chi-square), Wrapper (forward/backward elimination), Embedded (DT feature importance, Lasso). Tujuan: kurangi dimensi, kurangi noise, percepat training" },
    ],
    traps: [
      "Feature extraction (PCA) ≠ Feature selection (pilih subset). Keduanya MENGURANGI kolom!",
      "Decision Tree melakukan IMPLICIT feature selection (hanya fitur penting yang di-split)",
      "Target encoding bisa overfit jika kategori punya sedikit observasi",
    ],
    formulas: [],
  },
  {
    week: 4, id: "pca", title: "PCA", icon: "🎯", accent: "#c084fc",
    weight: 10, freq: 3,
    subtopics: [
      { name: "Tujuan PCA", detail: "Reduksi dimensi + hapus redundansi. PCA = feature EXTRACTION (kombinasi linear fitur asli), BUKAN feature selection (memilih subset fitur asli)" },
      { name: "Langkah PCA", detail: "1) Center data (kurangi mean), 2) Hitung Covariance Matrix (m×m), 3) Cari Eigenvalues & Eigenvectors, 4) Sort eigenvalues descending, 5) Pilih top-k PC, 6) Transform data" },
      { name: "Explained Variance", detail: "EV_i = λ_i / Σλ. Cumulative EV = Σ(λ_1..λ_k) / Σ(semua λ). Pilih k PC sehingga cumulative EV ≥ threshold (misal 95%)" },
      { name: "Matriks Diagonalisasi", detail: "Yang didiagonalisasi = COVARIANCE MATRIX (m×m, m=jumlah fitur). BUKAN matriks input (n×m)! Tujuan: menghasilkan fitur-fitur yang TIDAK BERKORELASI" },
    ],
    traps: [
      "Matriks yang didiagonalisasi = Covariance (m×m), BUKAN matriks data (n×m)!",
      "PC pertama = explained variance TERBESAR = bersesuaian eigenvalue TERBESAR",
      "\"PC dgn EV terbesar ADALAH eigenvalue tertinggi\" = SALAH! PC BERSESUAIAN dgn eigenvalue tertinggi",
      "Diagonalisasi → fitur TIDAK berkorelasi (orthogonal)",
      "PCA butuh data di-center (kurangi mean) dan biasanya di-scale dulu",
      "Jika ambil 1 dari 4 PC → dimensi jadi 25% (1/4), BUKAN 73% meski EV=73%",
    ],
    formulas: ["EV_i = λ_i / Σ(semua λ)", "Cum. EV = Σ(λ₁..λₖ) / Σ(semua λ)", "Cov(m×m) → eigendecomposition"],
  },
  {
    week: 5, id: "cart", title: "CART (Decision Tree)", icon: "🌳", accent: "#4ade80",
    weight: 12, freq: 3,
    subtopics: [
      { name: "Classification Tree", detail: "Splitting criteria: Gini Index = 1 - Σ(pᵢ²), atau Information Gain (Entropy) = -Σ(pᵢ·log₂pᵢ). Pilih split dengan Gini TERKECIL atau IG TERBESAR." },
      { name: "Regression Tree", detail: "Splitting criteria: Variance Reduction / MSE. Prediksi leaf = MEAN dari target. BUKAN Gini!" },
      { name: "Pruning & Overfitting", detail: "Pre-pruning: max depth, min samples per leaf, max leaves. Post-pruning: cost-complexity pruning. Tujuan: kurangi overfitting (high variance)." },
      { name: "Properties DT", detail: "Tidak perlu normalisasi/scaling. Bisa handle categorical tanpa encoding. Implicit feature selection. Interpretable (white-box). SENSITIF terhadap noise/outlier." },
    ],
    traps: [
      "Gini Index HANYA untuk classification! Regression tree pakai MSE/variance reduction!",
      "DT TIDAK perlu normalisasi dan TIDAK wajib encoding",
      "DT sensitif outlier → high variance → mudah overfit",
      "\"Semua leaf harus pure\" = SALAH! Pruning bisa buat leaf tidak pure",
      "Menambah kedalaman tree → LEBIH overfit (bukan fix overfitting!)",
      "Perbedaan classification vs regression tree: (1) splitting criterion, (2) cara prediksi leaf",
    ],
    formulas: ["Gini = 1 − Σ(pᵢ²)", "Entropy = −Σ(pᵢ · log₂ pᵢ)", "IG = Entropy(parent) − Σ(wⱼ·Entropy(childⱼ))"],
  },
  {
    week: 5, id: "rf", title: "Random Forest & Ensemble", icon: "🌲", accent: "#22c55e",
    weight: 10, freq: 3,
    subtopics: [
      { name: "Bagging", detail: "Bootstrap Aggregating: sampling DENGAN pengembalian → bisa ada duplikat data. Setiap base model dilatih independen (PARALEL). Base model: high variance (deep DT)." },
      { name: "Random Forest", detail: "Bagging + Random Feature Subset pada setiap split. Prediksi classification: Majority Vote. Prediksi regression: Average semua tree." },
      { name: "Boosting", detail: "Sequential training — setiap model belajar dari ERROR model sebelumnya. Base model: high bias (shallow DT). TIDAK bisa paralel! Contoh: AdaBoost, Gradient Boosting." },
      { name: "RF vs DT", detail: "RF variance LEBIH RENDAH, lebih robust terhadap outlier, KURANG interpretable. DT lebih interpretable tapi overfit lebih mudah." },
    ],
    traps: [
      "Bootstrap = sampling DENGAN pengembalian (bisa duplikat!) bukan TANPA",
      "Boosting = SEQUENTIAL, TIDAK bisa diparalelkan!",
      "RF TIDAK perlu normalisasi/scaling",
      "RF dipilih untuk MENURUNKAN VARIANCE (bukan training error)",
      "RF random feature selection pada setiap SPLIT, bukan setiap tree",
      "Yang membedakan RF dari bagging biasa: random feature subset per split",
      "RF prediksi regresi = RATA-RATA, bukan median",
    ],
    formulas: ["RF regression = mean(tree₁, tree₂, ..., treeₙ)", "RF classification = majority_vote(predictions)"],
  },
  {
    week: 6, id: "eval", title: "Model Evaluation", icon: "📋", accent: "#f43f5e",
    weight: 12, freq: 3,
    subtopics: [
      { name: "Confusion Matrix", detail: "TP (benar positif), TN (benar negatif), FP (false alarm / Type I), FN (miss / Type II). Selalu tentukan kelas POSITIF dulu!" },
      { name: "Classification Metrics", detail: "Accuracy = (TP+TN)/Total. Precision = TP/(TP+FP). Recall/Sensitivity = TP/(TP+FN). Specificity = TN/(TN+FP). F1 = 2PR/(P+R)." },
      { name: "Regression Metrics", detail: "MAE = mean(|yᵢ−ŷᵢ|). MSE = mean((yᵢ−ŷᵢ)²). R² = 1 − SS_res/SS_tot. MSE lebih sensitif outlier (kuadrat). R² bisa negatif!" },
      { name: "Evaluation Methods", detail: "Hold-out (paling tidak akurat), K-Fold CV (setiap data validasi tepat 1×), Stratified K-Fold (pertahankan proporsi kelas), LOOCV (K=N, mahal), Monte Carlo CV (random split, data mungkin tidak pernah jadi validation)" },
      { name: "ROC & AUC", detail: "ROC: plot TPR (Recall) vs FPR (1-Specificity). Threshold optimal = titik paling dekat ke (0,1). AUC: area under ROC, 0.5 = random, 1 = perfect." },
    ],
    traps: [
      "F1 tinggi ≠ specificity pasti tinggi! F1 hanya melibatkan precision & recall",
      "Accuracy menyesatkan pada imbalanced data (90% akurat tapi semua prediksi majority class)",
      "Hold-out = paling TIDAK AKURAT untuk estimasi generalization error",
      "K-Fold CV: setiap fold jadi validation tepat 1 kali, K iterasi training-validation",
      "MAE dari M = a TIDAK berarti semua error ≤ a (bisa ada individual error >> a)",
      "MSE bisa < MAE (misal semua error < 1, kuadrat justru mengecilkan)",
      "R² negatif = model LEBIH BURUK dari sekedar prediksi mean",
      "Micro-precision = Micro-F1 pada multiclass (sama!)",
      "Bandingkan MAE antar model → hanya valid jika SKALA target SAMA",
    ],
    formulas: ["Precision = TP/(TP+FP)", "Recall = TP/(TP+FN)", "Specificity = TN/(TN+FP)", "F1 = 2·P·R/(P+R)", "Accuracy = (TP+TN)/N", "MSE = Σ(yᵢ−ŷᵢ)²/n", "R² = 1 − SS_res/SS_tot"],
  },
  {
    week: 6, id: "bv", title: "Bias-Variance Tradeoff", icon: "⚖️", accent: "#fb923c",
    weight: 8, freq: 3,
    subtopics: [
      { name: "Decomposition", detail: "Expected Error = Bias² + Variance + Irreducible Error (ε). Bias & Variance → 0 maka error mendekati ε (batas bawah)." },
      { name: "Underfitting vs Overfitting", detail: "High Bias = underfitting (model terlalu sederhana, training & test RENDAH). High Variance = overfitting (model terlalu kompleks, training TINGGI, test RENDAH)." },
      { name: "Learning Curves", detail: "Overfitting: gap besar antara training (tinggi) & test (rendah). Underfitting: keduanya rendah & konvergen." },
      { name: "Remedies", detail: "Fix overfitting: pruning, regularisasi, tambah data, kurangi fitur, simpler model, bagging. Fix underfitting: model lebih kompleks, tambah fitur, kurangi regularisasi, boosting." },
    ],
    traps: [
      "Training 98%, Testing 72% → OVERFITTING (high variance)",
      "Training 60%, Testing 55% → UNDERFITTING (high bias)",
      "Bagging (RF) → kurangi VARIANCE | Boosting → kurangi BIAS",
      "Menambah depth DT → MEMPERBURUK overfitting, bukan memperbaiki!",
      "Menambah data training → membantu mengurangi overfitting",
    ],
    formulas: ["E[Error] = Bias² + Variance + ε"],
  },
  {
    week: 6, id: "knn", title: "K-Nearest Neighbors", icon: "📍", accent: "#38bdf8",
    weight: 10, freq: 3,
    subtopics: [
      { name: "Mekanisme KNN", detail: "Lazy learner (tidak ada training phase). Prediction: hitung jarak ke SEMUA training data → ambil K terdekat → classification: majority vote, regression: average." },
      { name: "Distance Metrics", detail: "Euclidean: √Σ(xᵢ−yᵢ)². Manhattan: Σ|xᵢ−yᵢ|. Cosine Similarity: (A·B)/(|A||B|) — fokus arah, bukan magnitude." },
      { name: "Preprocessing WAJIB", detail: "HARUS normalisasi (fitur dengan range besar mendominasi distance). HARUS encode categorical (KNN butuh numerik). Handle outlier (sensitif)." },
      { name: "Efek K", detail: "K=1: paling overfit (high variance, low bias). K=N: paling underfit (high bias, low variance). Pilih K optimal via cross-validation." },
    ],
    traps: [
      "KNN BUKAN centroid-based (itu K-Means)! KNN hitung jarak ke SEMUA data",
      "KNN WAJIB normalisasi! Tanpa normalisasi, fitur dgn range besar mendominasi",
      "K kecil → overfit, K besar → underfit (kebalikan dari DT depth!)",
      "Testing time KNN LAMBAT (hitung jarak ke semua training data), DT CEPAT",
      "KNN TIDAK melakukan implicit feature selection",
      "Cosine similarity: sudut antara vektor, bukan jarak Euclidean",
    ],
    formulas: ["Euclidean = √Σ(xᵢ−yᵢ)²", "Manhattan = Σ|xᵢ−yᵢ|", "Cosine = (A·B)/(‖A‖·‖B‖)"],
  },
  {
    week: 7, id: "imb", title: "Imbalanced Classification", icon: "⚠️", accent: "#ef4444",
    weight: 5, freq: 2,
    subtopics: [
      { name: "Problem", detail: "Accuracy menyesatkan: model predict semua majority class → accuracy tinggi tapi TIDAK BERGUNA. Contoh: 98% negatif, 2% positif → accuracy 98% tanpa prediksi positif apapun." },
      { name: "Solutions", detail: "Oversampling (SMOTE: buat data sintetis minoritas), Undersampling (kurangi mayoritas), Class weights, Threshold tuning." },
      { name: "Metric Choice", detail: "Penyakit fatal → RECALL paling penting (jangan miss pasien sakit → FN berbahaya). Spam filter → PRECISION penting (jangan buang email penting → FP merugikan)." },
    ],
    traps: [
      "Imbalanced handling HANYA untuk classification, BUKAN regression!",
      "Konteks sangat penting: penyakit langka + obat berbahaya untuk sehat → pilih RECALL",
      "SMOTE = synthetic oversampling, bukan duplicate",
    ],
    formulas: [],
  },
  {
    week: 8, id: "nb", title: "Naive Bayes", icon: "🎲", accent: "#a78bfa",
    weight: 10, freq: 3,
    subtopics: [
      { name: "Bayes Theorem", detail: "P(C|X) = P(X|C) × P(C) / P(X). Untuk membandingkan kelas, cukup hitung P(X|C)×P(C) per kelas (P(X) sama untuk semua kelas)." },
      { name: "Naive Assumption", detail: "Semua fitur INDEPENDEN satu sama lain given class: P(X|C) = P(x₁|C) × P(x₂|C) × ... × P(xₙ|C). Asumsi ini \"naive\" tapi sering bekerja baik." },
      { name: "Fitur Kategorikal", detail: "P(xᵢ|C) = count(xᵢ in class C) / count(class C). Contoh: P(smoker=yes|disease=yes) = jumlah smoker=yes di kelas yes / total kelas yes." },
      { name: "Fitur Numerik (Gaussian)", detail: "Asumsikan distribusi normal: P(x|C) = (1/√(2πσ²)) × exp(−(x−μ)²/(2σ²)). Hitung μ dan σ per kelas dari training data." },
      { name: "Kontribusi Fitur", detail: "Fitur dgn distribusi overlap antar kelas → kontribusi RENDAH (likelihood mirip). Fitur dgn distribusi berbeda signifikan → kontribusi TINGGI (likelihood beda jauh)." },
    ],
    traps: [
      "P(X) tidak perlu dihitung jika hanya membandingkan kelas (proportional)",
      "Untuk fitur diet yang TIDAK disebutkan di query → JANGAN masukkan ke perhitungan!",
      "Fitur age overlap antar kelas → KURANG diskriminatif, smoker beda signifikan → SANGAT diskriminatif",
      "Gunakan presisi yang diminta soal (biasanya 2 desimal)",
      "Jangan lupa: P(C) = prior probability dari training data",
    ],
    formulas: ["P(C|X) ∝ P(X|C) × P(C)", "P(X|C) = Π P(xᵢ|C)", "Gaussian: (1/√(2πσ²))·e^(−(x−μ)²/2σ²)"],
  },
];

const QUESTIONS = [
  { id:1, topic:"AI", type:"PG", diff:1, q:"Asisten virtual di ponsel adalah agen cerdas. Pernyataan PEAS yang TEPAT?", opts:["Microphone = sensor, layar = actuator","Voice command = environment, layar = actuator","Microphone = actuator, voice command = environment","Microphone & voice command = environment"], ans:0, exp:"Microphone = SENSOR (alat observasi). Layar ponsel = ACTUATOR (alat bertindak/output). Voice command = bagian dari environment. Jangan tertukar!" },
  { id:2, topic:"AI", type:"PG", diff:1, q:"Sifat task environment agen tic-tac-toe yang TIDAK BENAR adalah...", opts:["Fully observable","Sequential","Nondeterministik","Diskret"], ans:2, exp:"Tic-tac-toe DETERMINISTIK karena hasil setiap langkah pasti (tidak ada unsur acak). Fully observable (bisa lihat seluruh papan), sequential (langkah sekarang mempengaruhi masa depan), discrete (gerakan terbatas)." },
  { id:3, topic:"DS", type:"PG", diff:1, q:"Dalam CRISP-DM, mengunduh data dari berbagai sumber termasuk tahap:", opts:["Business Understanding","Data Understanding","Data Preparation","Modeling"], ans:1, exp:"MENGUMPULKAN/MENGUNDUH data = Data Understanding. Data Preparation = cleaning, transformation. Ini SERING jadi jebakan!" },
  { id:4, topic:"DS", type:"Match", diff:2, q:"Cocokkan: (1) Berapa harga optimal produk baru A? (2) Mengapa churn rate naik? (3) Analisis COVID PSBB Jakarta (4) Prediksi suhu Malang minggu depan", opts:["(1)Prescriptive (2)Diagnostic (3)Descriptive (4)Predictive — semua cocok","(1)Predictive (2)Diagnostic (3)Descriptive (4)Predictive","(1)Prescriptive (2)Descriptive (3)Descriptive (4)Predictive","(1)Diagnostic (2)Diagnostic (3)Predictive (4)Prescriptive"], ans:0, exp:"Prescriptive = merekomendasikan TINDAKAN (harga optimal). Diagnostic = menjelaskan MENGAPA (churn naik). Descriptive = menjelaskan APA yang terjadi (historis COVID). Predictive = memprediksi MASA DEPAN." },
  { id:5, topic:"EDA", type:"PG", diff:1, q:"Kolom Umur: median=28, mean=35, std=5. Distribusi paling mungkin:", opts:["Simetris","Left-skewed","Uniform","Right-skewed"], ans:3, exp:"Mean (35) > Median (28) → distribusi RIGHT-SKEWED (ekor kanan panjang, ada outlier nilai tinggi)." },
  { id:6, topic:"EDA", type:"PG", diff:2, q:"Korelasi Pearson antara 2 fitur = 0.02. Pernyataan yang BENAR:", opts:["Kedua fitur pasti tidak berhubungan","Mungkin ada hubungan nonlinear kuat","Salah satu fitur harus dihapus","Tidak perlu analisis lebih lanjut"], ans:1, exp:"Pearson HANYA mengukur hubungan LINEAR. r ≈ 0 TIDAK berarti tidak ada hubungan! Bisa saja ada hubungan NONLINEAR yang kuat. Perlu cek dengan Spearman atau visualisasi scatter." },
  { id:7, topic:"Prep", type:"PG", diff:2, q:"Fitur 'kode_pos' (12350, 12345) dan 'tingkat_resiko' (Rendah/Sedang/Tinggi). Preprocessing yang BENAR:", opts:["Kode pos: Min-Max, tingkat resiko: OHE","Kode pos: OHE, tingkat resiko: Label Encoding","Kode pos: Label Encoding, tingkat resiko: OHE","Kode pos: Z-Score, tingkat resiko: Label Encoding"], ans:1, exp:"Kode pos = NOMINAL (meski angka, tidak ada urutan) → OHE. Tingkat resiko = ORDINAL (ada urutan Rendah<Sedang<Tinggi) → Label Encoding. JANGAN terbalik!" },
  { id:8, topic:"Prep", type:"Hitung", diff:2, q:"Data Gaji 5 pegawai: [3M, 5M, 7M, 9M, 11M]. Min-Max scaling untuk gaji 3M dan Z-score untuk gaji 11M (μ=7M, σ=√8M). Hitung keduanya!", opts:["Min-Max 3M = 0, Z-score 11M ≈ 1.41","Min-Max 3M = 0.25, Z-score 11M = 2","Min-Max 3M = 0, Z-score 11M = 0.5","Min-Max 3M = 1, Z-score 11M = 1.41"], ans:0, exp:"Min-Max: (3-3)/(11-3) = 0/8 = 0. Z-Score: (11-7)/√8 = 4/2.83 ≈ 1.41. Nilai minimum selalu 0 di Min-Max, nilai di atas mean selalu POSITIF di Z-Score." },
  { id:9, topic:"Prep", type:"PG", diff:2, q:"Mean imputasi pada suatu fitur menyebabkan masalah JIKA:", opts:["Fitur bertipe interval","Fitur memiliki banyak outlier","Nilai null < 5%","Fitur terdistribusi normal"], ans:1, exp:"Outlier menarik mean jauh dari pusat data. Imputasi dengan mean yang terdistorsi → memberikan nilai imputasi yang tidak representatif. Solusi: pakai MEDIAN." },
  { id:10, topic:"PCA", type:"Hitung", diff:3, q:"Eigenvalues: [6.50, 3.85, 2.90, 2.10, 1.75, 1.40, 1.10, 0.85, 0.55, 0.40]. Hitung: (a) EV PC ke-5, (b) Min PC untuk 95%", opts:["(a) 8.18%, (b) 8 PC dengan 95.56%","(a) 17.5%, (b) 5 PC","(a) 8.18%, (b) 7 PC dengan 93.15%","(a) 8.18%, (b) 9 PC"], ans:0, exp:"Total = 21.40. EV₅ = 1.75/21.40 = 8.18%. Cumulative: PC1-7 = 19.60/21.40 = 91.59%. PC1-8 = 20.45/21.40 = 95.56% ≥ 95%. Jadi min 8 PC." },
  { id:11, topic:"PCA", type:"PG", diff:2, q:"Pernyataan yang SALAH mengenai principal component pada PCA:", opts:["Komponen yang dipilih adalah kombinasi linier fitur asli","Komponen dgn EV terkecil bersesuaian eigenvalue terkecil","Komponen dgn EV terbesar ADALAH nilai eigen tertinggi","PC pertama menjabarkan EV terbanyak"], ans:2, exp:"PC dgn EV terbesar BERSESUAIAN dengan eigenvalue tertinggi, bukan 'ADALAH' eigenvalue tertinggi. PC adalah VEKTOR eigen, bukan skalar eigenvalue. Perbedaan halus tapi penting!" },
  { id:12, topic:"CART", type:"PG", diff:2, q:"Pernyataan BENAR mengenai Decision Tree:", opts:["Gini bisa untuk regression tree","DT perlu normalisasi fitur numerik","DT implisit melakukan feature selection","Semua leaf node harus pure"], ans:2, exp:"DT memilih fitur terbaik di setiap split → fitur yang tidak berguna tidak dipilih → IMPLICIT feature selection. Gini HANYA classification. DT TIDAK perlu normalisasi. Leaf TIDAK harus pure (pruning)." },
  { id:13, topic:"CART", type:"PG", diff:2, q:"DT klasifikasi email spam: training accuracy 98%, testing 72%. Tindakan yang TIDAK TEPAT:", opts:["Ganti ke random forest","Terapkan pruning","Tingkatkan kedalaman tree","Tambah data training"], ans:2, exp:"Gap besar training-testing = OVERFITTING. Menambah depth = MEMPERBURUK overfitting! Yang benar: pruning (kurangi kompleksitas), RF (kurangi variance), tambah data." },
  { id:14, topic:"RF", type:"PG", diff:2, q:"Bootstrap sampling melakukan sampling dengan cara:", opts:["Mengambil data acak TANPA pengembalian","Mengambil data acak DENGAN pengembalian","Mengambil seluruh data tanpa duplikasi","Memilih subset fitur secara acak"], ans:1, exp:"Bootstrap = sampling DENGAN PENGEMBALIAN → data bisa terpilih lebih dari sekali (duplikat). Ini yang membuat setiap tree punya training set berbeda." },
  { id:15, topic:"RF", type:"Hitung", diff:2, q:"RF 4 tree untuk regresi. Prediksi: 11.5, 10, 11, 8. Prediksi akhir?", opts:["11.5","10.125","10","10.5"], ans:1, exp:"RF regresi = RATA-RATA semua tree = (11.5+10+11+8)/4 = 40.5/4 = 10.125" },
  { id:16, topic:"RF", type:"PG", diff:2, q:"Pernyataan PALING TIDAK TEPAT tentang ensemble learning:", opts:["RF adalah contoh bagging","Bagging base model: high variance","Boosting base model: high bias","Boosting base model bisa dilatih paralel"], ans:3, exp:"Boosting bersifat SEQUENTIAL — setiap model belajar dari error model sebelumnya. TIDAK bisa paralel! Ini perbedaan fundamental dengan bagging." },
  { id:17, topic:"Eval", type:"PG", diff:2, q:"Model: specificity 0.90, sensitivity/recall 0.50. Interpretasi yang SESUAI:", opts:["Akurasi pasti rendah","Model sering keliru prediksi sampel positif","Model terlalu banyak false positive","F1-score tinggi"], ans:1, exp:"Recall/Sensitivity = 0.50 → 50% data positif salah diprediksi (FN tinggi). Model SERING KELIRU pada kelas positif. Specificity 0.90 → baik mengenali negatif." },
  { id:18, topic:"Eval", type:"Hitung", diff:3, q:"Evaluasi 2000 records (2% penyakit): Sakit→sakit=30, Sehat→sehat=1900. Hitung Recall!", opts:["75%","93.75%","96.77%","95%"], ans:0, exp:"Total sakit = 2%×2000 = 40. TP=30, FN=40-30=10. Total sehat=1960. TN=1900, FP=1960-1900=60. Recall = TP/(TP+FN) = 30/(30+10) = 30/40 = 75%." },
  { id:19, topic:"BV", type:"PG", diff:2, q:"Jika bias & variance mendekati nol, ekspektasi generalization error mendekati:", opts:["Nol","Training error","Irreducible error","Infinity"], ans:2, exp:"E[Error] = Bias² + Variance + ε. Jika Bias≈0 dan Var≈0, maka Error ≈ ε (irreducible error). Ini batas bawah yang TIDAK bisa dikurangi." },
  { id:20, topic:"BV", type:"PG", diff:2, q:"Metode yang umumnya digunakan untuk mengurangi BIAS model:", opts:["Bagging","Boosting","Dropout","Menambah data"], ans:1, exp:"Boosting = fokus pada data yang salah diprediksi (iteratif) → mengurangi BIAS. Bagging → mengurangi VARIANCE. Menambah data → mengurangi overfitting (variance)." },
  { id:21, topic:"KNN", type:"PG", diff:2, q:"Jika K semakin BESAR pada KNN:", opts:["Bias turun, variance naik","Bias naik, variance turun","Keduanya turun","Model makin overfit"], ans:1, exp:"K besar → decision boundary makin smooth → model makin sederhana → HIGH BIAS, LOW VARIANCE. K=1 paling complex (overfit), K=N paling simple (underfit)." },
  { id:22, topic:"KNN", type:"PG", diff:2, q:"Preprocessing yang WAJIB untuk KNN tapi TIDAK wajib untuk DT:", opts:["Handle missing values","Feature scaling/normalisasi","Encoding fitur kategorikal","Semua di atas"], ans:1, exp:"KNN berbasis JARAK → fitur dengan range besar mendominasi → WAJIB normalisasi. DT berbasis splitting point → TIDAK terpengaruh skala fitur." },
  { id:23, topic:"NB", type:"Essay", diff:3, q:"P(disease=yes)=0.4, P(no)=0.6. P(smoker=yes|yes)=0.7, P(smoker=yes|no)=0.2. P(exercise=low|yes)=0.5, P(exercise=low|no)=0.3. Prediksi: smoker=yes, exercise=low.", opts:["Disease = YES, P(yes|X) ≈ 79.5%","Disease = NO, P(no|X) ≈ 79.5%","Disease = YES, P(yes|X) ≈ 50%","Tidak bisa ditentukan"], ans:0, exp:"P(yes|X) ∝ 0.7×0.5×0.4 = 0.14. P(no|X) ∝ 0.2×0.3×0.6 = 0.036. Total = 0.176. P(yes|X) = 0.14/0.176 = 79.5%. Prediksi: YES." },
  { id:24, topic:"NB", type:"PG", diff:2, q:"Fitur age: distribusi overlap antar kelas. Fitur smoker: distribusi berbeda signifikan. Pengaruhnya:", opts:["Age kontribusi tinggi, smoker rendah","Keduanya kontribusi sama","Age kontribusi rendah, smoker tinggi","Tidak ada pengaruh"], ans:2, exp:"Fitur yang distribusinya OVERLAP → likelihood mirip antar kelas → kontribusi RENDAH. Fitur distribusi BERBEDA SIGNIFIKAN → likelihood beda jauh → kontribusi TINGGI dalam membedakan kelas." },
  { id:25, topic:"Eval", type:"PG", diff:2, q:"Pernyataan BENAR tentang evaluasi model:", opts:["Hold-out paling akurat estimasi generalization error","K-Fold: setiap data validasi tepat 1 kali","Monte Carlo: setiap data pasti pernah validasi","Training error rendah → testing error rendah"], ans:1, exp:"K-Fold: data dibagi K fold, setiap fold jadi validation tepat 1×. Hold-out PALING TIDAK akurat. Monte Carlo: random split, data MUNGKIN tidak pernah jadi validation. Low training error BUKAN jaminan low test error (overfitting)." },
];

const ESSAYS = [
  { title:"CART: Bangun Decision Tree", prob:95, color:"#4ade80", detail:"Diberikan dataset ~10-15 baris. Bangun classification tree manual. Hitung Gini/Entropy. Tentukan split. Gambar tree.", tips:["Hitung Gini setiap fitur untuk SETIAP kemungkinan split","Pilih split dengan Gini TERKECIL → Information Gain TERBESAR","Ulangi rekursif sampai leaf pure atau stopping criterion","DT TIDAK perlu encoding (bisa handle categorical langsung)","Jelaskan perbedaan classification tree vs regression tree: (1) Gini→MSE, (2) majority class→mean value","Jelaskan depth tree: hitung level dari root ke leaf terdalam"] },
  { title:"Metodologi & Evaluation Metrics", prob:90, color:"#f43f5e", detail:"Skenario dunia nyata (misal deteksi penyakit langka). Rancang percobaan, pilih metrik, hitung dari confusion matrix, gambar ROC.", tips:["Rancangan: K-Fold CV (K=5/10) + Stratified (pertahankan proporsi kelas 2%/98%)","Metric: Penyakit fatal → RECALL (minimisir FN, jangan miss pasien sakit)","Hitung TP/TN/FP/FN dari narasi: \"sakit→sakit=30\" → TP=30","ROC: hitung TPR & FPR per threshold, plot, threshold optimal = closest to (0,1)","Jelaskan ALASAN pemilihan metrik: FN = pasien sakit tidak terdeteksi → FATAL","Hati-hati menghitung: total positif = 2% × total records"] },
  { title:"KNN: Prediksi Step-by-Step", prob:90, color:"#38bdf8", detail:"Training set + data baru. Lakukan preprocessing, hitung jarak, prediksi. Diskusikan efek K terhadap bias-variance.", tips:["Step 1: Normalisasi (Min-Max/Z-Score) semua fitur numerik terlebih dahulu","Step 2: Encode fitur kategorikal jika ada","Step 3: Hitung jarak (Euclidean/Manhattan) dari query ke SEMUA training data","Step 4: Sort jarak, ambil K terdekat","Step 5: Majority vote (classification) / Average (regression)","Diskusi K: K=1 high variance, K=9 (semua data) high bias → pilih K optimal via CV"] },
  { title:"Naive Bayes: Prediksi + Analisis", prob:85, color:"#a78bfa", detail:"Hitung prediksi NB dari dataset. Fitur numerik (Gaussian) & kategorikal. Analisis kontribusi fitur.", tips:["Hitung P(C) = prior dari training data","Fitur kategorikal: P(xᵢ|C) = count(xᵢ & C) / count(C)","Fitur numerik: hitung μ dan σ per kelas, masukkan ke rumus Gaussian","Kalikan SEMUA likelihood × prior: P(C|X) ∝ Π P(xᵢ|C) × P(C)","Jika fitur TIDAK disebutkan di query → JANGAN masukkan!","Bandingkan antar kelas, pilih yang lebih besar → itu prediksinya","Fitur overlap = kontribusi rendah, fitur berbeda signifikan = kontribusi tinggi"] },
];


const WEEKS = [
  { n:1, title:"AI Fundamentals & Search", topics:["ai","search"] },
  { n:2, title:"Data Science & Metodologi", topics:["ds"] },
  { n:3, title:"EDA, Statistik & Data Preparation", topics:["eda","prep"] },
  { n:4, title:"Feature Engineering & PCA", topics:["feat","pca"] },
  { n:5, title:"CART & Random Forest", topics:["cart","rf"] },
  { n:6, title:"Evaluation, Bias-Variance & KNN", topics:["eval","bv","knn"] },
  { n:7, title:"Imbalanced Classification", topics:["imb"] },
  { n:8, title:"Naive Bayes", topics:["nb"] },
];

const FORMULAS = [
  { title:"Preprocessing", color:"#34d399", items:["Min-Max = (x − min) / (max − min)","Z-Score = (x − μ) / σ","IQR = Q3 − Q1","Outlier: x < Q1−1.5·IQR  or  x > Q3+1.5·IQR"] },
  { title:"PCA", color:"#c084fc", items:["Explained Var_i = λ_i / Σλ","Cum. EV = Σ(λ₁..λₖ) / Σλ","Cov Matrix = m × m  (m=fitur)"] },
  { title:"Decision Tree", color:"#4ade80", items:["Gini = 1 − Σ(pᵢ²)","Entropy = −Σ(pᵢ·log₂pᵢ)","IG = H(parent) − Σ(wⱼ·H(childⱼ))"] },
  { title:"Distance", color:"#38bdf8", items:["Euclidean = √Σ(xᵢ−yᵢ)²","Manhattan = Σ|xᵢ−yᵢ|","Cosine = (A·B)/(‖A‖·‖B‖)"] },
  { title:"Classification", color:"#f43f5e", items:["Precision = TP/(TP+FP)","Recall = TP/(TP+FN)","Specificity = TN/(TN+FP)","F1 = 2PR/(P+R)","Accuracy = (TP+TN)/N"] },
  { title:"Regression", color:"#fb923c", items:["MAE = (1/n)·Σ|yᵢ−ŷᵢ|","MSE = (1/n)·Σ(yᵢ−ŷᵢ)²","R² = 1 − SS_res/SS_tot"] },
  { title:"Ensemble", color:"#22c55e", items:["RF class = majority_vote","RF reg = mean(trees)","Bootstrap = sampling WITH replacement"] },
  { title:"Naive Bayes", color:"#a78bfa", items:["P(C|X) ∝ P(X|C)·P(C)","P(X|C) = Π P(xᵢ|C)","Gaussian: (1/√(2πσ²))·e^(−(x−μ)²/2σ²)"] },
  { title:"Bias-Variance", color:"#fbbf24", items:["E[Error] = Bias² + Var + ε","Bagging → ↓ Variance","Boosting → ↓ Bias"] },
];


// ======================== THEME ========================
const themes = {
  dark: {
    bg:"#07070a",bg2:"#0f0f14",bg3:"#161620",bgEl:"#1c1c28",
    border:"#1f1f2e",border2:"#2a2a3d",
    text:"#eeeef2",text2:"#c8c8d4",text3:"#8888a0",text4:"#5c5c72",
    glass:"rgba(15,15,20,0.85)",glassBorder:"rgba(255,255,255,0.06)",
    trapBg:"rgba(239,68,68,0.06)",trapBorder:"rgba(239,68,68,0.15)",trapText:"#fca5a5",
    quizRight:"#052e16",quizWrong:"#2d0a0a",quizRightText:"#86efac",quizWrongText:"#fca5a5",
    infoBg:"rgba(99,102,241,0.06)",infoBorder:"rgba(99,102,241,0.15)",infoText:"#c4b5fd",
    accent:"#d4a843",scrollThumb:"rgba(255,255,255,0.08)",
    glow1:"rgba(212,168,67,0.05)",glow2:"rgba(139,92,246,0.04)",mode:"dark",
  },
  light: {
    bg:"#f5f3ee",bg2:"#ffffff",bg3:"#efece5",bgEl:"#e8e5dc",
    border:"#ddd9d0",border2:"#ccc8be",
    text:"#1a1818",text2:"#3a3836",text3:"#6a6862",text4:"#9a9890",
    glass:"rgba(255,255,255,0.9)",glassBorder:"rgba(0,0,0,0.07)",
    trapBg:"#fef2f2",trapBorder:"#fecaca",trapText:"#991b1b",
    quizRight:"#f0fdf4",quizWrong:"#fef2f2",quizRightText:"#166534",quizWrongText:"#991b1b",
    infoBg:"#f0f0ff",infoBorder:"#d4d4ff",infoText:"#4c1d95",
    accent:"#b8922a",scrollThumb:"rgba(0,0,0,0.12)",
    glow1:"rgba(212,168,67,0.08)",glow2:"rgba(139,92,246,0.05)",mode:"light",
  }
};

const F = {
  display:"'Fraunces','Playfair Display',Georgia,serif",
  ui:"'DM Sans','Segoe UI',sans-serif",
  mono:"'JetBrains Mono','Fira Code',monospace",
};

// ======================== APP ========================
function App(){
  const [dark,setDark]=useState(true);
  const [tab,setTab]=useState("map");
  const [sel,setSel]=useState(null);
  const [openSub,setOpenSub]=useState(null);
  const [qi,setQi]=useState(0);
  const [pick,setPick]=useState(null);
  const [show,setShow]=useState(false);
  const [score,setScore]=useState(0);
  const [tot,setTot]=useState(0);
  const [eo,setEo]=useState(null);

  const T=dark?themes.dark:themes.light;
  const q=QUESTIONS[qi];
  const D=T.mode==="dark";
  const weeks=[...new Set(TOPICS.map(t=>t.week))];
  const fl=f=>f===3?"ALWAYS":f===2?"OFTEN":"RARE";
  const fc=f=>f===3?"#ef4444":f===2?"#f59e0b":"#6b7280";

  const check=()=>{if(pick===null)return;setShow(true);setTot(t=>t+1);if(pick===q.ans)setScore(s=>s+1)};
  const next=()=>{setQi(i=>(i+1)%QUESTIONS.length);setPick(null);setShow(false)};

  // Micro component: section label
  const Lbl=({c,children})=><div style={{fontFamily:F.mono,fontSize:9,fontWeight:700,color:c||T.text4,letterSpacing:2.5,textTransform:"uppercase",marginBottom:12}}>{children}</div>;

  return(
    <div style={{minHeight:"100vh",background:T.bg,color:T.text,fontFamily:F.ui,transition:"background 0.5s,color 0.5s"}}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,400;0,9..144,500;0,9..144,600;0,9..144,700;0,9..144,800;1,9..144,400&family=DM+Sans:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;600;700&display=swap');
        *{box-sizing:border-box;margin:0;padding:0}
        ::-webkit-scrollbar{width:5px}::-webkit-scrollbar-thumb{background:${T.scrollThumb};border-radius:9px}
        @keyframes fi{from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:translateY(0)}}
        @keyframes si{from{opacity:0;transform:translateX(-10px)}to{opacity:1;transform:translateX(0)}}
        @keyframes gp{0%,100%{opacity:1}50%{opacity:.5}}
        @keyframes mm{0%{transform:translate(0,0) scale(1)}50%{transform:translate(30px,-20px) scale(1.1)}100%{transform:translate(0,0) scale(1)}}
        @keyframes spin{from{transform:rotate(0)}to{transform:rotate(360deg)}}
        body{overflow-x:hidden;background:${T.bg}}
      `}</style>

      {/* AMBIENT */}
      <div style={{position:"fixed",inset:0,pointerEvents:"none",zIndex:0,overflow:"hidden"}}>
        <div style={{position:"absolute",top:"-15%",right:"-8%",width:600,height:600,borderRadius:"50%",background:`radial-gradient(circle,${T.glow1},transparent 70%)`,animation:"mm 20s ease-in-out infinite"}}/>
        <div style={{position:"absolute",bottom:"-20%",left:"-12%",width:700,height:700,borderRadius:"50%",background:`radial-gradient(circle,${T.glow2},transparent 70%)`,animation:"mm 25s ease-in-out infinite reverse"}}/>
        {D&&<div style={{position:"absolute",inset:0,opacity:0.4,background:`repeating-linear-gradient(0deg,transparent,transparent 79px,${T.border}10 79px,${T.border}10 80px),repeating-linear-gradient(90deg,transparent,transparent 79px,${T.border}10 79px,${T.border}10 80px)`}}/>}
      </div>

      <div style={{position:"relative",zIndex:1,maxWidth:920,margin:"0 auto",padding:"0 24px"}}>

        {/* ══════ HEADER ══════ */}
        <header style={{padding:"40px 0 0",animation:"fi 0.7s both"}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:24}}>
            <div style={{display:"flex",alignItems:"center",gap:10}}>
              <div style={{width:8,height:8,borderRadius:"50%",background:T.accent,boxShadow:`0 0 14px ${T.accent}60`,animation:"gp 2.5s infinite"}}/>
              <span style={{fontFamily:F.mono,fontSize:10,color:T.text4,letterSpacing:3}}>CSGE603130 · GENAP 2025/2026</span>
            </div>
            <button onClick={()=>setDark(!dark)} style={{
              width:46,height:46,borderRadius:14,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",
              background:T.bg2,border:`1.5px solid ${T.border}`,transition:"all 0.4s",fontSize:20,
              boxShadow:D?"inset 0 1px 0 rgba(255,255,255,0.04)":"0 2px 10px rgba(0,0,0,0.06)"
            }}>
              <span style={{display:"inline-block",transition:"transform 0.5s cubic-bezier(0.22,1,0.36,1)",transform:D?"rotate(0)":"rotate(360deg)"}}>{D?"🌙":"☀️"}</span>
            </button>
          </div>

          <h1 style={{fontFamily:F.display,fontSize:"clamp(40px,7.5vw,62px)",fontWeight:300,lineHeight:1.02,letterSpacing:"-0.035em",color:T.text}}>
            UTS <span style={{fontWeight:800,fontStyle:"italic",background:`linear-gradient(135deg,${T.accent},#f59e0b)`,WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>Study</span> Guide
          </h1>
          <p style={{fontSize:14,color:T.text3,marginTop:10,lineHeight:1.6,maxWidth:500}}>
            Kecerdasan Artifisial & Sains Data Dasar<br/>
            <span style={{color:T.accent,fontWeight:500}}>14 topik · 25 soal latihan · 4 prediksi essay</span>
          </p>

          {/* STAT PILLS */}
          <div style={{display:"flex",gap:6,margin:"24px 0 20px",flexWrap:"wrap"}}>
            {[{v:"14 Topik",c:T.accent},{v:"25 Soal",c:"#4ade80"},{v:"4 Essay",c:"#f472b6"},{v:"27.5% Bobot",c:"#60a5fa"}].map((s,i)=>(
              <div key={i} style={{padding:"8px 16px",borderRadius:40,fontFamily:F.mono,fontSize:10,fontWeight:600,letterSpacing:0.5,
                color:s.c,background:`${s.c}${D?"0c":"10"}`,border:`1px solid ${s.c}22`,
                animation:`fi 0.5s ${0.1+i*0.07}s both`}}>{s.v}</div>
            ))}
          </div>

          {/* NAV */}
          <nav style={{display:"flex",gap:2,background:T.bg2,borderRadius:16,padding:4,border:`1px solid ${T.border}`,transition:"all 0.4s"}}>
            {[{id:"map",l:"Peta Materi"},{id:"quiz",l:"Latihan Soal"},{id:"predict",l:"Prediksi Essay"},{id:"formulas",l:"Formula Sheet"}].map(t=>(
              <button key={t.id} onClick={()=>{setTab(t.id);setSel(null);setOpenSub(null)}} style={{
                flex:1,padding:"12px 8px",borderRadius:12,border:"none",cursor:"pointer",
                background:tab===t.id?(D?`${T.accent}15`:"#fff"):"transparent",
                color:tab===t.id?T.text:T.text4,
                fontFamily:F.ui,fontSize:12,fontWeight:tab===t.id?600:400,
                transition:"all 0.3s",
                boxShadow:tab===t.id?(D?`0 0 0 1px ${T.accent}25`:"0 1px 4px rgba(0,0,0,0.06)"):"none",
              }}>{t.l}</button>
            ))}
          </nav>
        </header>

        {/* ══════ CONTENT ══════ */}
        <main style={{padding:"32px 0 72px"}}>

          {/* ─── MAP ─── */}
          {tab==="map"&&!sel&&(
            <div style={{animation:"fi 0.5s both"}}>
              {weeks.map(w=>{
                const wt=TOPICS.filter(t=>t.week===w);
                return(
                <div key={w} style={{marginBottom:32}}>
                  <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:14}}>
                    <div style={{fontFamily:F.display,fontSize:14,fontWeight:700,color:T.accent,width:34,height:34,borderRadius:10,
                      background:`linear-gradient(135deg,${T.accent}15,${T.accent}08)`,border:`1.5px solid ${T.accent}30`,
                      display:"flex",alignItems:"center",justifyContent:"center"}}>{w}</div>
                    <span style={{fontFamily:F.mono,fontSize:10,color:T.text4,letterSpacing:2}}>WEEK {w}</span>
                    <div style={{flex:1,height:1,background:`linear-gradient(90deg,${T.border},transparent)`}}/>
                  </div>
                  <div style={{display:"grid",gridTemplateColumns:wt.length>1?"1fr 1fr":"1fr",gap:8}}>
                    {wt.map((t,i)=>(
                      <div key={t.id} onClick={()=>{setSel(t);setOpenSub(null)}}
                        style={{
                          padding:20,borderRadius:16,cursor:"pointer",position:"relative",overflow:"hidden",
                          background:T.bg2,border:`1px solid ${T.border}`,borderLeft:`3.5px solid ${t.accent}`,
                          transition:"all 0.35s cubic-bezier(0.22,1,0.36,1)",animation:`fi 0.4s ${i*0.06}s both`,
                        }}
                        onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-3px)";e.currentTarget.style.boxShadow=`0 16px 48px ${D?"rgba(0,0,0,0.5)":"rgba(0,0,0,0.08)"},0 0 0 1px ${t.accent}30`;e.currentTarget.style.borderLeftColor=t.accent}}
                        onMouseLeave={e=>{e.currentTarget.style.transform="";e.currentTarget.style.boxShadow="";e.currentTarget.style.borderLeftColor=t.accent}}>
                        <div style={{position:"absolute",top:-24,right:-24,fontSize:64,opacity:D?0.03:0.06,pointerEvents:"none"}}>{t.icon}</div>
                        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
                          <div>
                            <div style={{fontSize:26,marginBottom:10}}>{t.icon}</div>
                            <div style={{fontFamily:F.display,fontSize:18,fontWeight:600,color:T.text,lineHeight:1.25,marginBottom:8}}>{t.title}</div>
                            <div style={{fontFamily:F.mono,fontSize:9,color:T.text4,letterSpacing:1}}>{t.subtopics.length} sub-topik · ~{t.weight}%</div>
                          </div>
                          <div style={{display:"flex",flexDirection:"column",alignItems:"flex-end",gap:6}}>
                            <div style={{fontFamily:F.mono,fontSize:8,fontWeight:700,color:fc(t.freq),padding:"3px 8px",borderRadius:20,background:`${fc(t.freq)}12`,letterSpacing:0.8}}>{fl(t.freq)}</div>
                            <span style={{fontFamily:F.ui,fontSize:20,color:T.text4,marginTop:8}}>→</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );})}
            </div>
          )}

          {/* ─── DETAIL ─── */}
          {tab==="map"&&sel&&(
            <div style={{animation:"fi 0.4s both"}}>
              <button onClick={()=>{setSel(null);setOpenSub(null)}} style={{fontFamily:F.ui,fontSize:12,color:T.text3,background:T.bg2,border:`1px solid ${T.border}`,padding:"8px 18px",borderRadius:10,cursor:"pointer",marginBottom:28,transition:"all 0.3s"}}>← Kembali</button>

              {/* HERO */}
              <div style={{padding:"28px 32px",borderRadius:20,marginBottom:32,position:"relative",overflow:"hidden",
                background:`linear-gradient(160deg,${sel.accent}${D?"10":"14"},${T.bg2} 50%)`,
                border:`1px solid ${sel.accent}20`}}>
                <div style={{position:"absolute",top:-40,right:-40,fontSize:120,opacity:D?0.04:0.07,pointerEvents:"none"}}>{sel.icon}</div>
                <div style={{fontFamily:F.mono,fontSize:10,color:sel.accent,letterSpacing:2.5,marginBottom:8}}>
                  WEEK {sel.week} · ~{sel.weight}% BOBOT · {sel.subtopics.length} SUB-TOPIK · {sel.traps.length} JEBAKAN
                </div>
                <h2 style={{fontFamily:F.display,fontSize:"clamp(26px,5vw,38px)",fontWeight:500,color:T.text,lineHeight:1.1,letterSpacing:"-0.02em"}}>{sel.title}</h2>
              </div>

              {/* SUBTOPICS ACCORDION */}
              <Lbl>Materi Lengkap</Lbl>
              <div style={{marginBottom:28}}>
                {sel.subtopics.map((s,i)=>{
                  const op=openSub===i;
                  return(
                  <div key={i} style={{marginBottom:3,borderRadius:12,overflow:"hidden",
                    background:op?T.bg3:T.bg2,border:`1px solid ${op?sel.accent+"25":T.border}`,
                    transition:"all 0.35s",animation:`si 0.3s ${i*0.03}s both`}}>
                    <div onClick={()=>setOpenSub(op?null:i)} style={{padding:"14px 18px",cursor:"pointer",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                      <div style={{display:"flex",alignItems:"center",gap:12}}>
                        <div style={{fontFamily:F.mono,fontSize:10,fontWeight:700,color:sel.accent,width:26,height:26,borderRadius:8,
                          background:`${sel.accent}12`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>{i+1}</div>
                        <span style={{fontFamily:F.ui,fontSize:13.5,fontWeight:op?600:400,color:op?T.text:T.text2}}>{s.name}</span>
                      </div>
                      <span style={{color:T.text4,fontSize:12,transition:"transform 0.3s",transform:op?"rotate(180deg)":"rotate(0)"}}>▾</span>
                    </div>
                    {op&&(
                      <div style={{padding:"2px 18px 16px 56px",animation:"fi 0.25s both"}}>
                        <div style={{fontFamily:F.display,fontSize:14,color:T.text2,lineHeight:1.9,fontWeight:400}}>{s.detail}</div>
                      </div>
                    )}
                  </div>
                );})}
              </div>

              {/* FORMULAS */}
              {sel.formulas.length>0&&(
                <div style={{marginBottom:28}}>
                  <Lbl c={sel.accent}>Rumus</Lbl>
                  <div style={{display:"flex",flexWrap:"wrap",gap:6}}>
                    {sel.formulas.map((f,i)=>(
                      <code key={i} style={{fontFamily:F.mono,fontSize:11.5,color:T.text,background:`${sel.accent}0a`,border:`1px solid ${sel.accent}18`,padding:"8px 14px",borderRadius:8}}>{f}</code>
                    ))}
                  </div>
                </div>
              )}

              {/* TRAPS */}
              <Lbl c="#ef4444">⚡ Jebakan Soal</Lbl>
              <div style={{background:T.trapBg,border:`1px solid ${T.trapBorder}`,borderRadius:14,padding:18,marginBottom:28,transition:"all 0.4s"}}>
                {sel.traps.map((t,i)=>(
                  <div key={i} style={{display:"flex",gap:10,marginBottom:i<sel.traps.length-1?10:0,lineHeight:1.75}}>
                    <span style={{color:"#ef4444",fontFamily:F.mono,fontSize:10,fontWeight:700,marginTop:4,flexShrink:0}}>!</span>
                    <span style={{fontFamily:F.display,fontSize:13,color:T.trapText,fontWeight:400}}>{t}</span>
                  </div>
                ))}
              </div>

              {/* VIZ PLACEHOLDER — ready for user's week-specific visualizations */}
              <div id={`viz-${sel.id}`}/>
            </div>
          )}

          {/* ─── QUIZ ─── */}
          {tab==="quiz"&&(
            <div style={{animation:"fi 0.5s both"}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}>
                <div style={{fontFamily:F.mono,fontSize:11,color:T.text4}}><span style={{color:T.accent,fontWeight:700}}>{qi+1}</span>/{QUESTIONS.length}{tot>0&&<span style={{marginLeft:12}}>Score: <span style={{color:score/tot>=0.7?"#4ade80":"#f59e0b"}}>{score}/{tot}</span></span>}</div>
                <div style={{display:"flex",gap:4}}>
                  <span style={{fontFamily:F.mono,fontSize:9,padding:"3px 8px",borderRadius:20,background:`${T.accent}12`,color:T.accent}}>{q.topic}</span>
                  <span style={{fontFamily:F.mono,fontSize:9,padding:"3px 8px",borderRadius:20,background:T.bg3,color:T.text4}}>{"★".repeat(q.diff)}</span>
                </div>
              </div>
              <div style={{height:3,background:T.border,borderRadius:3,marginBottom:28,overflow:"hidden"}}>
                <div style={{height:"100%",width:`${((qi+1)/QUESTIONS.length)*100}%`,background:`linear-gradient(90deg,${T.accent},#f59e0b)`,borderRadius:3,transition:"width 0.5s"}}/>
              </div>
              <div style={{fontFamily:F.display,fontSize:18,color:T.text,lineHeight:1.75,marginBottom:24,fontWeight:400}}>{q.q}</div>
              <div style={{display:"flex",flexDirection:"column",gap:6,marginBottom:24}}>
                {q.opts.map((o,i)=>{
                  const r=show&&i===q.ans,w=show&&i===pick&&i!==q.ans;
                  return(<div key={i} onClick={()=>!show&&setPick(i)} style={{
                    padding:"13px 18px",borderRadius:12,cursor:show?"default":"pointer",
                    background:r?T.quizRight:w?T.quizWrong:pick===i?`${T.accent}0c`:T.bg2,
                    border:`1.5px solid ${r?"#16a34a":w?"#dc2626":pick===i?T.accent+"40":T.border}`,
                    transition:"all 0.25s",fontFamily:F.ui,fontSize:14,
                    color:r?T.quizRightText:w?T.quizWrongText:T.text2,lineHeight:1.6
                  }}>{o}</div>);
                })}
              </div>
              {show&&(
                <div style={{background:T.infoBg,border:`1px solid ${T.infoBorder}`,borderRadius:14,padding:18,marginBottom:24,animation:"fi 0.3s both"}}>
                  <Lbl c="#818cf8">Penjelasan</Lbl>
                  <div style={{fontFamily:F.display,fontSize:14,color:T.infoText,lineHeight:1.85,fontWeight:400,fontStyle:"italic"}}>{q.exp}</div>
                </div>
              )}
              {!show?(
                <button onClick={check} disabled={pick===null} style={{width:"100%",padding:"14px",borderRadius:14,border:"none",cursor:pick===null?"not-allowed":"pointer",background:pick===null?T.bg3:`linear-gradient(135deg,${T.accent},#b8922a)`,color:pick===null?T.text4:"#0a0a0a",fontFamily:F.ui,fontSize:14,fontWeight:600,transition:"all 0.3s"}}>Cek Jawaban</button>
              ):(
                <button onClick={next} style={{width:"100%",padding:"14px",borderRadius:14,border:"none",cursor:"pointer",background:`linear-gradient(135deg,${T.accent},#b8922a)`,color:"#0a0a0a",fontFamily:F.ui,fontSize:14,fontWeight:600,transition:"all 0.3s"}}>{qi===QUESTIONS.length-1?"🔄 Mulai Ulang":"Berikutnya →"}</button>
              )}
            </div>
          )}

          {/* ─── PREDICT ─── */}
          {tab==="predict"&&(
            <div style={{animation:"fi 0.5s both"}}>
              <div style={{padding:"16px 20px",borderRadius:16,marginBottom:24,background:`linear-gradient(135deg,${T.accent}${D?"0a":"0f"},transparent)`,border:`1px solid ${T.accent}20`}}>
                <span style={{fontFamily:F.display,fontSize:15,color:T.text,lineHeight:1.7}}>
                  <strong style={{color:T.accent}}>Format UTS:</strong> 60 poin (PG+Isian) & 40 poin (4 Essay × 10). ~150 menit. Open notes 8 hal A4.
                </span>
              </div>
              {ESSAYS.map((e,i)=>(
                <div key={i} style={{marginBottom:6,borderRadius:14,overflow:"hidden",background:T.bg2,border:`1px solid ${eo===i?e.color+"30":T.border}`,transition:"all 0.35s",animation:`fi 0.3s ${i*0.06}s both`}}>
                  <div onClick={()=>setEo(eo===i?null:i)} style={{padding:"16px 20px",cursor:"pointer",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                    <div style={{display:"flex",alignItems:"center",gap:14}}>
                      <div style={{width:38,height:38,borderRadius:10,background:`${e.color}12`,display:"flex",alignItems:"center",justifyContent:"center",fontFamily:F.display,fontSize:16,fontWeight:700,color:e.color}}>{i+1}</div>
                      <div>
                        <div style={{fontFamily:F.ui,fontSize:14,fontWeight:600,color:T.text}}>{e.title}</div>
                        <div style={{fontFamily:F.mono,fontSize:9,color:T.text4}}>Prob: <span style={{color:e.color,fontWeight:600}}>{e.prob}%</span></div>
                      </div>
                    </div>
                    <span style={{color:T.text4,transition:"transform 0.3s",transform:eo===i?"rotate(180deg)":"rotate(0)"}}>▾</span>
                  </div>
                  {eo===i&&(
                    <div style={{padding:"0 20px 20px",animation:"fi 0.25s both"}}>
                      <div style={{fontFamily:F.display,fontSize:14,color:T.text3,lineHeight:1.75,fontStyle:"italic",marginBottom:16,paddingBottom:16,borderBottom:`1px solid ${T.border}`}}>{e.detail}</div>
                      <Lbl c={e.color}>Strategi</Lbl>
                      {e.tips.map((tip,j)=>(
                        <div key={j} style={{display:"flex",gap:10,marginBottom:6}}>
                          <span style={{fontFamily:F.mono,fontSize:10,color:e.color,fontWeight:700,flexShrink:0,marginTop:2}}>{j+1}.</span>
                          <span style={{fontFamily:F.display,fontSize:13,color:T.text2,lineHeight:1.7}}>{tip}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* ─── FORMULAS ─── */}
          {tab==="formulas"&&(
            <div style={{animation:"fi 0.5s both"}}>
              {[
                {t:"Preprocessing",c:"#34d399",f:["Min-Max = (x−min)/(max−min)","Z-Score = (x−μ)/σ","IQR = Q3−Q1","Outlier: < Q1−1.5·IQR or > Q3+1.5·IQR"]},
                {t:"PCA",c:"#c084fc",f:["EV_i = λ_i / Σλ","CumEV = Σ(λ₁..λₖ)/Σλ","CovMatrix = m×m"]},
                {t:"Decision Tree",c:"#4ade80",f:["Gini = 1−Σpᵢ²","Entropy = −Σpᵢ·log₂pᵢ","IG = H(parent)−Σwⱼ·H(childⱼ)"]},
                {t:"Distance",c:"#38bdf8",f:["Euclidean = √Σ(xᵢ−yᵢ)²","Manhattan = Σ|xᵢ−yᵢ|","Cosine = A·B/(‖A‖·‖B‖)"]},
                {t:"Metrics (Cls)",c:"#f43f5e",f:["Prec=TP/(TP+FP)","Rec=TP/(TP+FN)","Spec=TN/(TN+FP)","F1=2PR/(P+R)","Acc=(TP+TN)/N"]},
                {t:"Metrics (Reg)",c:"#fb923c",f:["MAE=Σ|yᵢ−ŷᵢ|/n","MSE=Σ(yᵢ−ŷᵢ)²/n","R²=1−SS_res/SS_tot"]},
                {t:"Ensemble & NB",c:"#a78bfa",f:["RF_reg=mean(trees)","RF_cls=vote(trees)","P(C|X)∝P(X|C)·P(C)","Gauss:(1/√2πσ²)e^(−(x−μ)²/2σ²)"]},
                {t:"Bias-Variance",c:"#fbbf24",f:["Error=Bias²+Var+ε","Bagging→↓Var","Boosting→↓Bias"]},
              ].map((g,gi)=>(
                <div key={gi} style={{marginBottom:12,animation:`fi 0.3s ${gi*0.04}s both`}}>
                  <Lbl c={g.c}>{g.t}</Lbl>
                  <div style={{display:"flex",flexWrap:"wrap",gap:5}}>
                    {g.f.map((f,fi)=>(
                      <code key={fi} style={{fontFamily:F.mono,fontSize:11.5,color:T.text2,background:T.bg2,border:`1px solid ${T.border}`,padding:"8px 14px",borderRadius:8,transition:"all 0.4s"}}>{f}</code>
                    ))}
                  </div>
                </div>
              ))}
              <div style={{marginTop:28}}>
                <Lbl c={T.accent}>Model Comparison</Lbl>
                <div style={{overflowX:"auto",borderRadius:14,border:`1px solid ${T.border}`}}>
                  <table style={{width:"100%",borderCollapse:"collapse",fontSize:12}}>
                    <thead><tr style={{background:T.bg3}}>
                      {["","DT","RF","KNN","NB"].map(h=><th key={h} style={{padding:"10px 12px",textAlign:h?"center":"left",fontFamily:F.mono,fontWeight:600,color:T.text4,fontSize:9,letterSpacing:1,borderBottom:`1px solid ${T.border}`}}>{h}</th>)}
                    </tr></thead>
                    <tbody>
                      {[["Normalize","❌","❌","✅","❌"],["Encode","❌","❌","✅","~"],["Outlier","⚠️","✅","⚠️","✅"],["Overfit","⚠️","✅","K↓⚠️","✅"],["Interpret","✅","❌","~","~"],["Feat Sel","✅","✅","❌","❌"]].map((r,ri)=>(
                        <tr key={ri} style={{background:ri%2?T.bg3:"transparent"}}>
                          {r.map((c,ci)=><td key={ci} style={{padding:"9px 12px",textAlign:ci?"center":"left",fontFamily:ci?F.ui:F.mono,fontWeight:ci?400:600,fontSize:ci?13:10,color:ci?T.text2:T.text4,borderBottom:`1px solid ${T.border}`}}>{c}</td>)}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

        </main>
      </div>
    </div>
  );
}

export default App;
