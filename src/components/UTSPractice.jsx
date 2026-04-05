import { useState, useEffect, useCallback } from "react";

// ═══════════════════════════════════════════════════
// KASDAD UTS PRACTICE — FULL EXAM SIMULATOR
// Genap 2025/2026 — Prediksi Soal + Pembahasan
// ═══════════════════════════════════════════════════

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 640);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  return isMobile;
}

const QUESTIONS = [
  // ══════════ BAGIAN 1: AI FUNDAMENTALS & PEAS ══════════
  {
    id: 1, topic: "AI & Agents", type: "pg", difficulty: 1, points: 2,
    soal: "Sebuah robot pembersih lantai otomatis beroperasi di sebuah kantor. Manakah yang PALING TEPAT mengenai PEAS dari agen tersebut?",
    options: [
      "A. Sensor infrared adalah aktuator dan debu di lantai adalah environment",
      "B. Sensor infrared adalah sensor, roda penggerak adalah aktuator, dan lantai kantor adalah environment",
      "C. Roda penggerak adalah sensor dan kebersihan lantai adalah performance measure",
      "D. Debu di lantai adalah sensor dan peta ruangan adalah aktuator"
    ],
    answer: 1,
    explanation: {
      text: "PEAS = Performance measure, Environment, Actuators, Sensors. Sensor infrared MENDETEKSI (sensor), roda BERTINDAK (aktuator), lantai kantor adalah LINGKUNGAN tempat agen beroperasi.",
      visual: "peas"
    }
  },
  {
    id: 2, topic: "AI & Agents", type: "pg", difficulty: 2, points: 2,
    soal: "Anda merancang agen cerdas untuk sistem rekomendasi film di platform streaming. Sifat lingkungan agen yang PALING TEPAT adalah...",
    options: [
      "A. Fully observable, static, discrete, episodic",
      "B. Partially observable, dynamic, discrete, sequential",
      "C. Fully observable, static, continuous, episodic",
      "D. Partially observable, dynamic, continuous, sequential"
    ],
    answer: 1,
    explanation: {
      text: "Partially observable: agen tak bisa lihat semua preferensi user. Dynamic: preferensi berubah. Discrete: pilihan film terbatas. Sequential: rekomendasi sebelumnya mempengaruhi berikutnya (user behavior berubah).",
      visual: "environment"
    }
  },
  {
    id: 3, topic: "AI & Agents", type: "pg", difficulty: 1, points: 2,
    soal: "Manakah yang TIDAK menunjukkan sifat cerdas pada mesin?",
    options: [
      "A. Perspektif thinking humanly: mesin mengemulasi proses berpikir mahasiswa memilih antara belajar atau bermain",
      "B. Perspektif acting rationally: mesin mematikan AC ketika suhu ruangan sudah 20°C",
      "C. Perspektif thinking rationally: mesin menentukan hujan dari sinyal audio di genting",
      "D. Perspektif acting humanly: mesin berkomunikasi dengan bahasa manusia"
    ],
    answer: 1,
    explanation: {
      text: "Acting rationally = agen mengambil tindakan TERBAIK untuk mencapai tujuan. Mematikan AC di 20°C adalah aturan sederhana (thermostat), BUKAN tindakan rasional yang mempertimbangkan goal secara cerdas — ini hanya rule-based tanpa reasoning.",
      visual: "ai_perspectives"
    }
  },
  // ══════════ BAGIAN 2: DATA SCIENCE & CRISP-DM ══════════
  {
    id: 4, topic: "Data Science", type: "matching", difficulty: 1, points: 3,
    soal: "Pasangkan task sains data berikut dengan tipenya!",
    pairs: [
      { left: "Berapa harga optimal untuk produk baru?", right: "Prescriptive" },
      { left: "Mengapa penjualan turun di Q3?", right: "Diagnostic" },
      { left: "Berapa pendapatan tahun depan?", right: "Predictive" },
      { left: "Berapa total penjualan bulan lalu?", right: "Descriptive" },
    ],
    answer: [0,1,2,3],
    explanation: {
      text: "4 tipe analytics:\n• Descriptive = APA yang terjadi? (masa lalu)\n• Diagnostic = MENGAPA terjadi?\n• Predictive = APA yang AKAN terjadi? (masa depan)\n• Prescriptive = APA yang HARUS dilakukan? (rekomendasi aksi)",
      visual: "analytics"
    }
  },
  {
    id: 5, topic: "Data Science", type: "pg", difficulty: 1, points: 2,
    soal: "Manakah pernyataan yang BENAR terkait tahap CRISP-DM?",
    options: [
      "A. Mengunduh data dari berbagai sumber adalah tahap Data Preparation",
      "B. Perumusan ruang lingkup bersama stakeholder adalah Business Understanding",
      "C. Pengukuran hasil regresi adalah tahap Modelling",
      "D. Implementasi KNN adalah tahap Data Understanding"
    ],
    answer: 1,
    explanation: {
      text: "CRISP-DM: Business Understanding → Data Understanding → Data Preparation → Modeling → Evaluation → Deployment.\n\n⚠️ JEBAKAN: Download data = Data UNDERSTANDING (bukan Preparation). Pengukuran hasil = EVALUATION (bukan Modeling).",
      visual: "crispdm"
    }
  },
  {
    id: 6, topic: "Data Science", type: "pg", difficulty: 1, points: 2,
    soal: "Pasangkan masalah ML berikut: 'Estimasi masa pakai bohlam baru' adalah problem...",
    options: [
      "A. Classification",
      "B. Regression",
      "C. Clustering",
      "D. Association"
    ],
    answer: 1,
    explanation: {
      text: "Masa pakai = nilai KONTINU (jam/hari) → Regression.\nJika outputnya kategori (rusak/tidak) → Classification.\nJika mengelompokkan tanpa label → Clustering.",
      visual: "ml_types"
    }
  },
  // ══════════ BAGIAN 3: EDA & STATISTIK ══════════
  {
    id: 7, topic: "EDA & Statistik", type: "pg", difficulty: 2, points: 2,
    soal: "Dataset memiliki kolom 'Umur' dengan median=28, mean=35, std=5. Distribusi yang paling mungkin adalah:",
    options: [
      "A. Simetris",
      "B. Left-skewed",
      "C. Uniform",
      "D. Right-skewed"
    ],
    answer: 3,
    explanation: {
      text: "Mean > Median → ekor distribusi lebih panjang ke KANAN → Right-skewed.\n\nIngat rumus:\n• Right-skewed: Mean > Median > Mode\n• Left-skewed: Mean < Median < Mode\n• Simetris: Mean ≈ Median ≈ Mode",
      visual: "skewness"
    }
  },
  {
    id: 8, topic: "EDA & Statistik", type: "hitungan", difficulty: 2, points: 2,
    soal: "Data: [5, 6, 3, 1, 4, 2]. Berapakah nilai IQR?",
    options: ["A. 2", "B. 3", "C. 5", "D. -2"],
    answer: 1,
    explanation: {
      text: "Langkah:\n1. Urutkan: [1, 2, 3, 4, 5, 6]\n2. Q1 = median bawah [1,2,3] = 2\n3. Q3 = median atas [4,5,6] = 5\n4. IQR = Q3 - Q1 = 5 - 2 = 3",
      visual: "iqr"
    }
  },
  {
    id: 9, topic: "EDA & Statistik", type: "pg", difficulty: 2, points: 2,
    soal: "Korelasi Pearson antara dua fitur adalah 0.02. Pernyataan mana yang BENAR?",
    options: [
      "A. Kedua fitur pasti tidak berhubungan sama sekali",
      "B. Mungkin saja kedua fitur memiliki hubungan nonlinear yang kuat",
      "C. Kedua fitur harus dihapus dari dataset",
      "D. Perlu dilakukan normalisasi ulang"
    ],
    answer: 1,
    explanation: {
      text: "Pearson mengukur hubungan LINEAR saja! Korelasi rendah TIDAK berarti tidak ada hubungan — bisa jadi hubungannya NONLINEAR (kurva, parabola, dll).\n\nContoh: x² memiliki Pearson ≈ 0 dengan x, tapi jelas berhubungan!",
      visual: "correlation"
    }
  },
  // ══════════ BAGIAN 4: PREPROCESSING ══════════
  {
    id: 10, topic: "Preprocessing", type: "pg", difficulty: 2, points: 2,
    soal: "Menggunakan nilai mean untuk imputasi pada suatu fitur dapat menyebabkan masalah jika...",
    options: [
      "A. Fitur bertipe interval",
      "B. Fitur memiliki banyak outlier",
      "C. Nilai null kurang dari 5%",
      "D. Fitur terdistribusi normal"
    ],
    answer: 1,
    explanation: {
      text: "Mean SENSITIF terhadap outlier! Jika banyak outlier, mean akan 'tertarik' ke arah outlier → imputasi jadi tidak representatif.\n\nSolusi: gunakan MEDIAN (robust terhadap outlier) atau mode.",
      visual: "imputation"
    }
  },
  {
    id: 11, topic: "Preprocessing", type: "pg", difficulty: 2, points: 2,
    soal: "Fitur kode pos (12350, 12345) bertipe nominal. Pernyataan mana yang BENAR?",
    options: [
      "A. Bisa langsung digunakan sebagai input numerik",
      "B. Harus ditransformasi dengan Min-Max Scaling",
      "C. Tidak boleh ditransformasi dengan Min-Max Scaling karena bertipe nominal",
      "D. Harus di-log transform dulu"
    ],
    answer: 2,
    explanation: {
      text: "Kode pos TERLIHAT numerik tapi sebenarnya NOMINAL (kategorikal)!\n\n12350 tidak 'lebih besar' dari 12345 secara makna. Scaling pada nominal = SALAH karena mengimplikasikan urutan/jarak.\n\nSolusi: One-hot encoding.",
      visual: "encoding"
    }
  },
  {
    id: 12, topic: "Preprocessing", type: "hitungan", difficulty: 2, points: 2,
    soal: "Dataset:\nBaris | X1 | X2 | X3\nA     | 20 | 30 | 5\nB     | 40 | 10 | 7\nC     | 30 | 20 | 6\nD     | 20 | 30 | 2\nE     | 50 | 10 | NaN\n\nImputasi NaN di baris E dengan KNN (K=1) + Manhattan Distance. Hasilnya?",
    options: ["A. 5", "B. 7", "C. 6", "D. 2"],
    answer: 1,
    explanation: {
      text: "Hitung jarak E ke semua baris (hanya fitur X1, X2):\n• d(E,A) = |50-20| + |10-30| = 50\n• d(E,B) = |50-40| + |10-10| = 10 ← TERDEKAT!\n• d(E,C) = |50-30| + |10-20| = 30\n• d(E,D) = |50-20| + |10-30| = 50\n\nTetangga terdekat = B → X3 = 7",
      visual: "knn_impute"
    }
  },
  // ══════════ BAGIAN 5: PCA ══════════
  {
    id: 13, topic: "PCA", type: "hitungan", difficulty: 2, points: 8,
    soal: "PCA pada data 10 fitur menghasilkan eigenvalues: [6.50, 3.85, 2.90, 2.10, 1.75, 1.40, 1.10, 0.85, 0.55, 0.40]. Total = 21.40.\n\na) Explained variance PC ke-5?\nb) Minimal berapa PC untuk 95% variance?",
    options: null,
    answer: "a) 1.75/21.40 = 8.18%\nb) 8 PC → (6.50+3.85+2.90+2.10+1.75+1.40+1.10+0.85)/21.40 = 20.45/21.40 = 95.56%",
    explanation: {
      text: "Explained Variance tiap PC = eigenvalue_i / total_eigenvalues × 100%\n\nCumulative:\nPC1: 30.37% | PC2: 48.36% | PC3: 61.92% | PC4: 71.73% | PC5: 79.91% | PC6: 86.45% | PC7: 91.59% | PC8: 95.56% ✓\n\n⚠️ JEBAKAN: Reduksi dimensi dari 10→1 PC = dimensi jadi 10% (bukan 73%!). Explained variance ≠ persentase dimensi!",
      visual: "pca"
    }
  },
  {
    id: 14, topic: "PCA", type: "pg", difficulty: 1, points: 1,
    soal: "Manakah pernyataan yang SALAH mengenai PCA?",
    options: [
      "A. Komponen dipilih dari kombinasi linear fitur asli",
      "B. PC dengan explained variance terkecil berkaitan dengan eigenvalue terkecil",
      "C. PC dengan explained variance terbesar ADALAH eigenvalue tertinggi",
      "D. PC pertama menjabarkan explained variance terbanyak"
    ],
    answer: 2,
    explanation: {
      text: "C SALAH! PC dengan explained variance terbesar BERKAITAN DENGAN eigenvalue tertinggi, bukan IS eigenvalue tertinggi. PC adalah EIGENVECTOR, bukan eigenvalue.\n\nPC = eigenvector (arah), eigenvalue = magnitude variance.",
      visual: "pca_concept"
    }
  },
  // ══════════ BAGIAN 6: CART & RANDOM FOREST ══════════
  {
    id: 15, topic: "CART", type: "pg", difficulty: 2, points: 2,
    soal: "Pernyataan yang PALING TEPAT mengenai decision tree adalah...",
    options: [
      "A. Saat training, setiap leaf node harus pure",
      "B. Decision tree secara implisit melakukan seleksi fitur",
      "C. Merupakan model linear",
      "D. Semua fitur kategorikal harus di-encode dan dinormalisasi"
    ],
    answer: 1,
    explanation: {
      text: "DT memilih fitur terbaik untuk split di setiap node → fitur yang tidak pernah dipilih = tidak digunakan = implicit feature selection!\n\n⚠️ A salah: leaf tidak harus pure (bisa di-prune). C salah: DT non-linear. D salah: DT bisa handle kategorikal langsung.",
      visual: "cart"
    }
  },
  {
    id: 16, topic: "Random Forest", type: "pg", difficulty: 1, points: 1,
    soal: "Random forest biasanya dipilih daripada decision tree karena...",
    options: [
      "A. Cenderung memiliki variance lebih rendah",
      "B. Training error selalu lebih rendah",
      "C. Menghindari underfitting pada decision tree",
      "D. Lebih mudah diinterpretasi"
    ],
    answer: 0,
    explanation: {
      text: "RF = ensemble dari banyak DT → rata-rata prediksi → MENGURANGI VARIANCE (overfitting).\n\nDT tunggal = high variance, low bias.\nRF = lower variance, similar bias.",
      visual: "rf_vs_dt"
    }
  },
  {
    id: 17, topic: "Random Forest", type: "hitungan", difficulty: 1, points: 2,
    soal: "Random forest dengan 4 DT untuk REGRESI. Prediksi masing-masing: 11.5, 10, 11, 8. Prediksi akhir?",
    options: null,
    answer: "(11.5 + 10 + 11 + 8) / 4 = 10.125",
    explanation: {
      text: "RF Regresi → RATA-RATA prediksi semua tree.\nRF Klasifikasi → MAJORITY VOTE.\n\n= (11.5 + 10 + 11 + 8) / 4 = 40.5 / 4 = 10.125",
      visual: "rf_predict"
    }
  },
  // ══════════ BAGIAN 7: MODEL EVALUATION ══════════
  {
    id: 18, topic: "Evaluasi Model", type: "hitungan", difficulty: 3, points: 8,
    soal: "Confusion Matrix:\n\n              Pred Neg | Pred Pos\nActual Neg |    50    |    10\nActual Pos |     5    |   100\n\nHitung: Accuracy, Precision, Recall, F1-Score, Specificity",
    options: null,
    answer: "Acc=90.9%, Prec=90.9%, Rec=95.2%, F1=93.0%, Spec=83.3%",
    explanation: {
      text: "TN=50, FP=10, FN=5, TP=100\n\nAccuracy = (TP+TN)/(Total) = 150/165 = 90.9%\nPrecision = TP/(TP+FP) = 100/110 = 90.9%\nRecall = TP/(TP+FN) = 100/105 = 95.2%\nF1 = 2×P×R/(P+R) = 2×0.909×0.952/(0.909+0.952) = 93.0%\nSpecificity = TN/(TN+FP) = 50/60 = 83.3%",
      visual: "confusion_matrix"
    }
  },
  {
    id: 19, topic: "Evaluasi Model", type: "pg", difficulty: 2, points: 2,
    soal: "Model klasifikasi memiliki specificity=0.90 dan sensitivity=0.50. Interpretasi yang sesuai:",
    options: [
      "A. Akurasi model pasti rendah",
      "B. Model sering keliru memprediksi sampel positif",
      "C. Model terlalu banyak false positive",
      "D. Model memiliki F1-score tinggi"
    ],
    answer: 1,
    explanation: {
      text: "Sensitivity = Recall = TP/(TP+FN) = 0.50 → hanya 50% sampel positif terdeteksi benar → SERING KELIRU pada positif!\n\nSpecificity = TN/(TN+FP) = 0.90 → baik dalam mendeteksi negatif.\n\n⚠️ A salah: akurasi bisa tinggi jika data imbalanced.",
      visual: "sens_spec"
    }
  },
  {
    id: 20, topic: "Evaluasi Model", type: "pg", difficulty: 2, points: 2,
    soal: "Pernyataan mana yang BENAR tentang evaluasi model regresi?",
    options: [
      "A. R² negatif menunjukkan kesalahan perhitungan",
      "B. R²=0.6 artinya 60% variansi target tidak bisa dijelaskan",
      "C. MSE lebih sensitif terhadap outlier dibanding MAE",
      "D. MAE=2 artinya semua error pasti ≤ 2"
    ],
    answer: 2,
    explanation: {
      text: "MSE = mean(error²) → mengkuadratkan error → outlier dengan error besar akan ter-AMPLIFIKASI.\nMAE = mean(|error|) → hanya absolute → tidak amplifikasi.\n\n⚠️ A salah: R² negatif BISA terjadi (model lebih buruk dari mean). B salah: 60% BISA dijelaskan.",
      visual: "regression_metrics"
    }
  },
  // ══════════ BAGIAN 8: BIAS-VARIANCE ══════════
  {
    id: 21, topic: "Bias-Variance", type: "pg", difficulty: 2, points: 2,
    soal: "Model A: Train acc 78%, Test acc 76%. Model B: Train acc 99%, Test acc 68%. Pernyataan yang TEPAT:",
    options: [
      "A. Model A overfitting, Model B underfitting",
      "B. Model A high bias low variance, Model B low bias high variance",
      "C. Model A low bias high variance, Model B high bias low variance",
      "D. Kedua model seimbang"
    ],
    answer: 1,
    explanation: {
      text: "Model A: train ≈ test → gap kecil → low variance. Tapi akurasi keduanya sedang → high bias (underfitting sedikit).\n\nModel B: train >> test → gap besar → HIGH VARIANCE (overfitting). Train sangat tinggi → low bias.",
      visual: "bias_variance"
    }
  },
  {
    id: 22, topic: "Bias-Variance", type: "pg", difficulty: 1, points: 2,
    soal: "Jika bias dan variance mendekati nol, generalization error mendekati...",
    options: [
      "A. Nol",
      "B. Irreducible error",
      "C. Training error",
      "D. Infinity"
    ],
    answer: 1,
    explanation: {
      text: "Generalization Error = Bias² + Variance + Irreducible Error\n\nJika Bias→0, Variance→0, maka Error→Irreducible Error (noise bawaan data yang TIDAK BISA dihilangkan oleh model apapun).",
      visual: "gen_error"
    }
  },
  // ══════════ BAGIAN 9: KNN ══════════
  {
    id: 23, topic: "KNN", type: "hitungan", difficulty: 3, points: 5,
    soal: "Training set untuk KNN (k=3) dengan Manhattan distance:\n\nX=5,Y=8 → B | X=2,Y=6 → A | X=2,Y=1 → A\nX=8,Y=8 → B | X=3,Y=5 → A | X=6,Y=7 → B\n\nPrediksi data (5,7)?",
    options: null,
    answer: "Kelas B",
    explanation: {
      text: "Hitung Manhattan distance ke (5,7):\n• (5,8): |5-5|+|7-8| = 1 → B\n• (2,6): |5-2|+|7-6| = 4 → A\n• (2,1): |5-2|+|7-1| = 9 → A\n• (8,8): |5-8|+|7-8| = 4 → B\n• (3,5): |5-3|+|7-5| = 4 → A\n• (6,7): |5-6|+|7-7| = 1 → B\n\n3 terdekat: (5,8)→B, (6,7)→B, (2,6)→A\nMajority vote: B wins! (2 vs 1)",
      visual: "knn_compute"
    }
  },
  {
    id: 24, topic: "KNN", type: "pg", difficulty: 2, points: 1,
    soal: "Preprocessing yang HARUS dilakukan untuk KNN tapi TIDAK harus untuk Decision Tree:",
    options: [
      "A. Menangani missing values",
      "B. Normalisasi fitur numerik dengan range berbeda",
      "C. Encoding fitur kategorikal",
      "D. Membuang duplikasi data"
    ],
    answer: 1,
    explanation: {
      text: "KNN berbasis JARAK → fitur dengan range besar akan MENDOMINASI perhitungan jarak → WAJIB normalisasi!\n\nDT berbasis split/threshold → tidak terpengaruh scale → normalisasi TIDAK diperlukan.",
      visual: "knn_preprocessing"
    }
  },
  // ══════════ BAGIAN 10: NAIVE BAYES ══════════
  {
    id: 25, topic: "Naive Bayes", type: "pg", difficulty: 2, points: 2,
    soal: "Asumsi utama pada Naive Bayes classifier adalah...",
    options: [
      "A. Semua fitur harus numerik",
      "B. Setiap fitur independen satu sama lain given kelas",
      "C. Distribusi data harus normal",
      "D. Jumlah kelas harus seimbang"
    ],
    answer: 1,
    explanation: {
      text: "NAIVE = asumsi bahwa fitur-fitur CONDITIONALLY INDEPENDENT given kelas.\n\nP(X₁,X₂|C) = P(X₁|C) × P(X₂|C)\n\nAsumsi ini 'naif' karena jarang benar di dunia nyata, tapi model tetap sering bekerja dengan baik!",
      visual: "naive_bayes"
    }
  },
  // ══════════ BAGIAN 11: VISUALISASI ══════════
  {
    id: 26, topic: "Visualisasi", type: "pg", difficulty: 1, points: 2,
    soal: "Pernyataan mana yang TIDAK BENAR terkait visualisasi data?",
    options: [
      "A. Colored bubble plot tidak dapat memvisualisasi 4 variabel",
      "B. Heatmap untuk menampilkan korelasi antar fitur numerik",
      "C. Horizontal bar chart bisa menggantikan pie chart",
      "D. Line plot cocok untuk time series"
    ],
    answer: 0,
    explanation: {
      text: "Colored bubble plot BISA visualisasi 4 variabel:\n• X-axis = var 1\n• Y-axis = var 2\n• Ukuran bubble = var 3\n• Warna bubble = var 4",
      visual: "visualization"
    }
  },
  // ══════════ ESSAY QUESTIONS ══════════
  {
    id: 27, topic: "CART Essay", type: "essay", difficulty: 3, points: 10,
    soal: "Diberikan data Titanic:\nNo|Class|Gender|Origin|Survival\n1|1|Female|Cherbourg|Survived\n2|1|Male|Southampton|Not Survived\n3|2|Male|Southampton|Survived\n4|1|Male|Cherbourg|Not Survived\n5|1|Female|Cherbourg|Survived\n6|2|Female|Southampton|Survived\n7|1|Male|Southampton|Not Survived\n8|2|Female|Southampton|Survived\n9|2|Female|Southampton|Survived\n10|2|Female|Southampton|Survived\n\nA. Bangun decision tree! (5p)\nB. Perlu encoding? Fitur pertama? Kedalaman? (3p)\nC. Perbedaan regression tree vs classification tree? (2p)",
    options: null,
    answer: "essay",
    explanation: {
      text: "SOLUSI LENGKAP:\n\nA. Hitung Gini Index untuk setiap fitur:\n\nGini(S) = 1 - (7/10)² - (3/10)² = 0.42\n\n→ Gender split:\nFemale: 6 Survived, 0 Not = Gini=0\nMale: 1 Survived, 3 Not = Gini=0.375\nWeighted: 6/10×0 + 4/10×0.375 = 0.15 ← TERBAIK!\n\nRoot = Gender. Female → Survived (pure). Male perlu split lagi.\n\nB.\n• Encoding: TIDAK perlu (CART bisa handle kategorikal langsung)\n• Fitur pertama: Gender (Gini terkecil)\n• Kedalaman: 2 (root → leaf)\n\nC. Perbedaan:\n1. Classification tree: Gini/Entropy untuk split, majority vote di leaf\n2. Regression tree: MSE/variance reduction untuk split, MEAN di leaf",
      visual: "cart_essay"
    }
  },
  {
    id: 28, topic: "KNN Essay", type: "essay", difficulty: 3, points: 10,
    soal: "Training set KNN (k=3):\nNo|Kulit Hijau|Kaki|Tinggi|Bau|Spesies\n1|Tidak|3|Tidak|Iya|Alien\n2|Iya|2|Iya|Tidak|Alien\n3|Tidak|2|Iya|Tidak|Manusia\n4|Iya|2|Tidak|Tidak|Manusia\n5|Iya|3|Iya|Tidak|Alien\n6|Tidak|2|Tidak|Iya|Alien\n7|Iya|3|Iya|Tidak|Alien\n8|Tidak|2|Iya|Iya|Manusia\n9|Tidak|2|Tidak|Tidak|Manusia\n10|Tidak|2|Iya|Iya|?\n\n[2p] Preprocessing apa yang perlu?\n[5p] Prediksi data ke-10!\n[3p] Pengaruh nilai k terhadap bias-variance?",
    options: null,
    answer: "essay",
    explanation: {
      text: "SOLUSI:\n\n[Preprocessing]\n• Encoding kategorikal → numerik (Tidak=0, Iya=1)\n• Normalisasi fitur 'Kaki' (range 2-3) agar setara fitur lain (range 0-1)\n• Distance metric: Manhattan/Euclidean\n\n[Prediksi data 10: (0,2,1,1)]\nSetelah encoding:\n1:(0,3,0,1) 2:(1,2,1,0) 3:(0,2,1,0) 4:(1,2,0,0)\n5:(1,3,1,0) 6:(0,2,0,1) 7:(1,3,1,0) 8:(0,2,1,1) 9:(0,2,0,0)\n\nData 10: (0,2,1,1)\nManhattan distances (tanpa normalisasi):\nd(10,1)=|0|+|1|+|1|+|0|=2\nd(10,2)=|1|+|0|+|0|+|1|=2\nd(10,3)=|0|+|0|+|0|+|1|=1 ← terdekat!\nd(10,4)=|1|+|0|+|1|+|1|=3\nd(10,5)=|1|+|1|+|0|+|1|=3\nd(10,6)=|0|+|0|+|1|+|0|=1 ← terdekat!\nd(10,7)=|1|+|1|+|0|+|1|=3\nd(10,8)=|0|+|0|+|0|+|0|=0 ← terdekat!\nd(10,9)=|0|+|0|+|1|+|1|=2\n\n3 terdekat: 8(Manusia), 3(Manusia), 6(Alien)\nMajority: MANUSIA (2 vs 1)\n\n[Pengaruh k]\nk kecil (1) → low bias, HIGH variance (sensitif noise)\nk besar (9) → HIGH bias, low variance (terlalu general)\nPilih k optimal: cross-validation, k ganjil untuk hindari tie",
      visual: "knn_essay"
    }
  },
  {
    id: 29, topic: "Evaluasi Essay", type: "essay", difficulty: 3, points: 10,
    soal: "Model fraud detection: f(x) output probabilitas 0-1.\n\nData uji 12 transaksi (4 fraud, 8 legal):\nx1:0.9→fraud | x2:0.8→fraud | x3:0.4→fraud | x4:0.4→fraud\nx5:0.6→legal | x6:0.6→legal | x7:0.6→legal\nx8-x12: 0.2→legal\n\na) τ=0.5: hitung accuracy, precision, recall, F1\nb) Hitung FPR dan TPR untuk τ ∈ {0.85, 0.7, 0.5, 0.3}\nc) Gambar kurva ROC",
    options: null,
    answer: "essay",
    explanation: {
      text: "a) τ=0.5 → prediksi fraud jika f(x)>0.5:\nPred fraud: x1,x2,x5,x6,x7 | Pred legal: x3,x4,x8-x12\n\nTP=2(x1,x2) FP=3(x5,x6,x7) FN=2(x3,x4) TN=5(x8-12)\n\nAccuracy = 7/12 = 58.3%\nPrecision = 2/5 = 40%\nRecall = 2/4 = 50%\nF1 = 2×0.4×0.5/0.9 = 44.4%\n\nb) TPR=TP/4, FPR=FP/8:\nτ=0.85: TP=1,FP=0 → TPR=0.25, FPR=0\nτ=0.7: TP=2,FP=0 → TPR=0.5, FPR=0\nτ=0.5: TP=2,FP=3 → TPR=0.5, FPR=0.375\nτ=0.3: TP=4,FP=3 → TPR=1.0, FPR=0.375\n\nc) Plot (FPR,TPR): (0,0)→(0,0.25)→(0,0.5)→(0.375,0.5)→(0.375,1)→(1,1)\nAUC = area di bawah kurva",
      visual: "roc_essay"
    }
  },
  {
    id: 30, topic: "Naive Bayes Essay", type: "essay", difficulty: 3, points: 10,
    soal: "Naive Bayes untuk prediksi penyakit kronis:\nDataset:\nage|smoker|exercise|diet|disease\n25|yes|low|poor|yes\n35|no|low|average|yes\n28|yes|low|poor|yes\n32|yes|low|poor|yes\n45|no|moderate|average|no\n50|no|high|good|no\n36|yes|moderate|average|no\n42|no|moderate|good|no\n\nPrediksi pasien: age=33, smoker=no, exercise=moderate\n\nHint: Gaussian density untuk age=33:\nmean=30,std=3.8 → density=0.07688\nmean=30,std=5.07 → density=0.06605\nmean=43.25,std=3.8 → density=0.00276\nmean=43.25,std=5.07 → density=0.01019",
    options: null,
    answer: "essay",
    explanation: {
      text: "SOLUSI:\n\nP(yes)=4/8=0.5, P(no)=4/8=0.5\n\nUntuk disease=yes:\n• P(smoker=no|yes) = 1/4 = 0.25\n• P(exercise=moderate|yes) = 0/4 = 0 ⚠️\n• P(age=33|yes) → Gaussian(mean=30, std=4.76) ≈ 0.07\n\nUntuk disease=no:\n• P(smoker=no|no) = 2/4 = 0.50\n• P(exercise=moderate|no) = 2/4 = 0.50\n• P(age=33|no) → Gaussian(mean=43.25, std=6.55) ≈ 0.03\n\nP(yes|X) ∝ 0.5 × 0.25 × 0 × 0.07 = 0 ⚠️\nP(no|X) ∝ 0.5 × 0.50 × 0.50 × 0.03 = 0.00375\n\nPrediksi: NO (karena P(yes)=0 karena zero frequency!)\n\n⚠️ ZERO FREQUENCY PROBLEM: P(moderate|yes)=0 membuat seluruh probabilitas = 0. Solusi: Laplace smoothing!",
      visual: "nb_essay"
    }
  }
];

const TOPIC_COLORS = {
  "AI & Agents": "#f472b6",
  "Data Science": "#a78bfa",
  "EDA & Statistik": "#fbbf24",
  "Preprocessing": "#34d399",
  "PCA": "#60a5fa",
  "CART": "#fb923c",
  "Random Forest": "#4ade80",
  "Evaluasi Model": "#f87171",
  "Bias-Variance": "#c084fc",
  "KNN": "#22d3ee",
  "Naive Bayes": "#e879f9",
  "Visualisasi": "#fcd34d",
  "CART Essay": "#fb923c",
  "KNN Essay": "#22d3ee",
  "Evaluasi Essay": "#f87171",
  "Naive Bayes Essay": "#e879f9",
};

// ═══════════════ VISUAL COMPONENTS ═══════════════

function PEASDiagram({ dark, isMobile }) {
  const bg = dark ? "#1e293b" : "#f1f5f9";
  const fg = dark ? "#e2e8f0" : "#1e293b";
  return (
    <div style={{ display:"grid", gridTemplateColumns:isMobile ? "1fr" : "1fr 1fr", gap:12, marginTop:12 }}>
      {[
        { icon: "🎯", label: "Performance", desc: "Ukuran keberhasilan", ex: "Kebersihan lantai" },
        { icon: "🌍", label: "Environment", desc: "Lingkungan operasi", ex: "Lantai kantor + debu" },
        { icon: "⚙️", label: "Actuators", desc: "Alat bertindak", ex: "Roda, penyedot" },
        { icon: "👁️", label: "Sensors", desc: "Alat mendeteksi", ex: "Infrared, kamera" },
      ].map((p,i) => (
        <div key={i} style={{ background:bg, borderRadius:12, padding:"12px 14px", border:`1px solid ${dark?"#334155":"#cbd5e1"}` }}>
          <div style={{ fontSize:20, marginBottom:4 }}>{p.icon} <strong style={{ color:fg }}>{p.label}</strong></div>
          <div style={{ fontSize:12, color:dark?"#94a3b8":"#64748b" }}>{p.desc}</div>
          <div style={{ fontSize:11, color:"#f59e0b", marginTop:4, fontStyle:"italic" }}>Ex: {p.ex}</div>
        </div>
      ))}
    </div>
  );
}

function SkewnessDiagram({ dark }) {
  return (
    <div style={{ display:"flex", gap:8, marginTop:12, justifyContent:"center" }}>
      {[
        { label: "Left-skewed", desc: "Mean < Median", color: "#f472b6" },
        { label: "Normal", desc: "Mean ≈ Median", color: "#a78bfa" },
        { label: "Right-skewed", desc: "Mean > Median", color: "#fbbf24" },
      ].map((s,i) => (
        <div key={i} style={{ textAlign:"center", flex:1 }}>
          <div style={{ height:60, borderRadius:"50% 50% 0 0", background:`linear-gradient(135deg, ${s.color}44, ${s.color}22)`, border:`2px solid ${s.color}`, display:"flex", alignItems:"flex-end", justifyContent:"center", paddingBottom:4 }}>
            <span style={{ fontSize:10, color:s.color, fontWeight:700 }}>{s.label}</span>
          </div>
          <div style={{ fontSize:11, color:dark?"#94a3b8":"#64748b", marginTop:4 }}>{s.desc}</div>
        </div>
      ))}
    </div>
  );
}

function ConfusionMatrixDiagram({ dark, isMobile }) {
  const cells = [
    { r: "Actual Neg", c: "Pred Neg", val: "TN", color: "#34d399", desc: "Benar negatif" },
    { r: "Actual Neg", c: "Pred Pos", val: "FP", color: "#f87171", desc: "False alarm!" },
    { r: "Actual Pos", c: "Pred Neg", val: "FN", color: "#fbbf24", desc: "Terlewat!" },
    { r: "Actual Pos", c: "Pred Pos", val: "TP", color: "#60a5fa", desc: "Benar positif" },
  ];
  return (
    <div style={{ display:"grid", gridTemplateColumns:isMobile ? "1fr" : "1fr 1fr", gap:6, marginTop:12, maxWidth:280 }}>
      {cells.map((c,i) => (
        <div key={i} style={{ padding:10, borderRadius:8, background:`${c.color}22`, border:`2px solid ${c.color}44`, textAlign:"center" }}>
          <div style={{ fontSize:18, fontWeight:800, color:c.color }}>{c.val}</div>
          <div style={{ fontSize:10, color:dark?"#94a3b8":"#64748b" }}>{c.desc}</div>
        </div>
      ))}
    </div>
  );
}

function FormulaCard({ formulas, dark }) {
  return (
    <div style={{ marginTop:12, padding:12, borderRadius:10, background:dark?"#0f172a":"#f8fafc", border:`1px solid ${dark?"#1e293b":"#e2e8f0"}`, fontFamily:"'JetBrains Mono', monospace", fontSize:12 }}>
      {formulas.map((f,i) => (
        <div key={i} style={{ padding:"4px 0", color:dark?"#a5b4fc":"#6366f1" }}>{f}</div>
      ))}
    </div>
  );
}

function getVisualComponent(visual, dark, isMobile) {
  switch(visual) {
    case "peas": return <PEASDiagram dark={dark} isMobile={isMobile}/>;
    case "skewness": return <SkewnessDiagram dark={dark}/>;
    case "confusion_matrix": return <ConfusionMatrixDiagram dark={dark} isMobile={isMobile}/>;
    default: return null;
  }
}

// ═══════════════ RENDER TEXT WITH TABLES ═══════════════

function RenderTextWithTables({ text, fg, dark }) {
  const lines = text.split("\n");
  const segments = [];
  let i = 0;

  while (i < lines.length) {
    if (lines[i].includes("|") && lines[i].split("|").length >= 2) {
      const tableLines = [];
      while (i < lines.length && lines[i].includes("|") && lines[i].split("|").length >= 2) {
        tableLines.push(lines[i]);
        i++;
      }
      if (tableLines.length >= 2) {
        segments.push({ type: "table", lines: tableLines });
      } else {
        segments.push({ type: "text", content: tableLines.join("\n") });
      }
    } else {
      const textLines = [];
      while (i < lines.length && !(lines[i].includes("|") && lines[i].split("|").length >= 2 && i + 1 < lines.length && lines[i + 1].includes("|") && lines[i + 1].split("|").length >= 2)) {
        textLines.push(lines[i]);
        i++;
      }
      segments.push({ type: "text", content: textLines.join("\n") });
    }
  }

  const borderColor = dark ? "#334155" : "#e2e8f0";
  const headerBg = dark ? "#1e293b" : "#f1f5f9";
  const cellBg = dark ? "#0f172a" : "#ffffff";

  return (
    <>
      {segments.map((seg, idx) => {
        if (seg.type === "text") {
          return seg.content ? <span key={idx}>{seg.content}{"\n"}</span> : null;
        }
        // Parse rows, trim cells, filter empty leading/trailing cells
        let rows = seg.lines.map(line => {
          const cells = line.split("|").map(c => c.trim());
          // Remove empty first/last cells from leading/trailing pipes
          if (cells.length > 0 && cells[0] === "") cells.shift();
          if (cells.length > 0 && cells[cells.length - 1] === "") cells.pop();
          return cells;
        });
        // Normalize column count to max
        const maxCols = Math.max(...rows.map(r => r.length));
        rows = rows.map(row => {
          while (row.length < maxCols) row.unshift(""); // pad with empty at start
          return row;
        });
        return (
          <div key={idx} style={{ overflowX: "auto", WebkitOverflowScrolling: "touch", margin: "8px 0" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12, minWidth: 200 }}>
              <thead>
                <tr>
                  {rows[0].map((cell, ci) => (
                    <th key={ci} style={{ padding: "6px 10px", background: headerBg, border: `1px solid ${borderColor}`, fontWeight: 700, color: fg, textAlign: "left", whiteSpace: "nowrap" }}>
                      {cell}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.slice(1).map((row, ri) => (
                  <tr key={ri}>
                    {row.map((cell, ci) => (
                      <td key={ci} style={{ padding: "5px 10px", border: `1px solid ${borderColor}`, background: ci === 0 && cell ? headerBg : cellBg, color: fg, whiteSpace: "nowrap", fontWeight: ci === 0 ? 600 : 400 }}>
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      })}
    </>
  );
}

// ═══════════════ QUESTION CARD ═══════════════

function QuestionCard({ q, dark, index, isMobile }) {
  const [selected, setSelected] = useState(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [matchAnswers, setMatchAnswers] = useState(() => {
    // Shuffle the right-side options for matching questions
    if (q.pairs) {
      const rights = q.pairs.map(p => p.right);
      for (let i = rights.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [rights[i], rights[j]] = [rights[j], rights[i]];
      }
      return { assignments: {}, activeLeft: null, options: rights };
    }
    return { assignments: {}, activeLeft: null, options: [] };
  });
  const topicColor = TOPIC_COLORS[q.topic] || "#94a3b8";
  
  const bg = dark ? "#1e293b" : "#ffffff";
  const bgHover = dark ? "#334155" : "#f8fafc";
  const border = dark ? "#334155" : "#e2e8f0";
  const fg = dark ? "#e2e8f0" : "#1e293b";
  const fgSub = dark ? "#94a3b8" : "#64748b";

  const isCorrect = selected === q.answer;
  const diffStars = "★".repeat(q.difficulty) + "☆".repeat(3 - q.difficulty);

  return (
    <div style={{
      background: bg, borderRadius: 16, padding: "24px 28px",
      border: `1px solid ${border}`, marginBottom: 20,
      boxShadow: dark ? "0 4px 20px rgba(0,0,0,0.3)" : "0 4px 20px rgba(0,0,0,0.06)",
      transition: "all 0.3s ease"
    }}>
      {/* Header */}
      <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:14, flexWrap:"wrap" }}>
        <span style={{ background:`${topicColor}22`, color:topicColor, padding:"3px 10px", borderRadius:20, fontSize:11, fontWeight:700, border:`1px solid ${topicColor}44` }}>
          {q.topic}
        </span>
        <span style={{ color:fgSub, fontSize:11 }}>{diffStars}</span>
        <span style={{ color:fgSub, fontSize:11, marginLeft:"auto" }}>{q.points}p</span>
        <span style={{ background:q.type==="essay"?"#f59e0b22":q.type==="hitungan"?"#22d3ee22":"#a78bfa22", color:q.type==="essay"?"#f59e0b":q.type==="hitungan"?"#22d3ee":"#a78bfa", padding:"2px 8px", borderRadius:12, fontSize:10, fontWeight:600, textTransform:"uppercase" }}>
          {q.type}
        </span>
      </div>

      {/* Question */}
      <div style={{ fontSize:14, color:fg, lineHeight:1.7, marginBottom:16, whiteSpace:"pre-line", fontWeight:500 }}>
        <span style={{ color:topicColor, fontWeight:800, marginRight:6 }}>Q{index+1}.</span>
        <RenderTextWithTables text={q.soal} fg={fg} dark={dark} />
      </div>

      {/* Options for PG/Hitungan */}
      {q.options && (
        <div style={{ display:"flex", flexDirection:"column", gap:8, marginBottom:16 }}>
          {q.options.map((opt, i) => {
            const isSelected = selected === i;
            const isAnswer = showAnswer && i === q.answer;
            const isWrong = showAnswer && isSelected && !isCorrect && i === selected;
            
            let optBg = dark ? "#0f172a" : "#f8fafc";
            let optBorder = dark ? "#334155" : "#e2e8f0";
            let optColor = fgSub;
            
            if (isAnswer) { optBg = "#34d39922"; optBorder = "#34d399"; optColor = "#34d399"; }
            else if (isWrong) { optBg = "#f8717122"; optBorder = "#f87171"; optColor = "#f87171"; }
            else if (isSelected) { optBg = `${topicColor}11`; optBorder = topicColor; optColor = topicColor; }
            
            return (
              <button key={i} onClick={() => { if(!showAnswer) setSelected(i); }}
                style={{
                  display:"block", width:"100%", textAlign:"left", padding:"10px 14px", borderRadius:10,
                  background:optBg, border:`1.5px solid ${optBorder}`, cursor:showAnswer?"default":"pointer",
                  fontSize:13, color:optColor, transition:"all 0.2s", fontFamily:"inherit",
                  fontWeight: isAnswer || isSelected ? 600 : 400,
                }}>
                {opt} {isAnswer && " ✓"} {isWrong && " ✗"}
              </button>
            );
          })}
        </div>
      )}

      {/* Interactive Matching */}
      {q.pairs && (
        <div style={{ marginBottom:16 }}>
          {/* Left side items - click to select */}
          {q.pairs.map((p, i) => {
            const assigned = matchAnswers.assignments[i];
            const isActive = matchAnswers.activeLeft === i;
            const isCorrect = showAnswer && assigned === p.right;
            const isWrong = showAnswer && assigned && assigned !== p.right;
            return (
              <div key={i} style={{ display:"flex", alignItems:"center", gap:8, marginBottom:6, fontSize:13 }}>
                <button
                  onClick={() => {
                    if (showAnswer) return;
                    setMatchAnswers(prev => ({ ...prev, activeLeft: prev.activeLeft === i ? null : i }));
                  }}
                  style={{
                    flex:1, padding:"8px 12px", borderRadius:8, textAlign:"left", cursor: showAnswer ? "default" : "pointer",
                    background: isActive ? `${topicColor}15` : dark ? "#0f172a" : "#f8fafc",
                    color: fg, border: `2px solid ${isCorrect ? "#34d399" : isWrong ? "#f87171" : isActive ? topicColor : border}`,
                    fontFamily:"inherit", fontSize:13, fontWeight: isActive ? 600 : 400,
                    transition:"all 0.2s",
                  }}>
                  {p.left}
                </button>
                <span style={{ color: assigned ? (isCorrect ? "#34d399" : isWrong ? "#f87171" : topicColor) : fgSub, fontWeight:700, fontSize:14 }}>→</span>
                {assigned ? (
                  <button onClick={() => {
                    if (showAnswer) return;
                    setMatchAnswers(prev => {
                      const next = { ...prev, assignments: { ...prev.assignments } };
                      delete next.assignments[i];
                      next.options = [...prev.options, assigned].sort();
                      return next;
                    });
                  }} style={{
                    padding:"5px 12px", borderRadius:8, cursor: showAnswer ? "default" : "pointer",
                    background: isCorrect ? "#34d39922" : isWrong ? "#f8717122" : `${topicColor}22`,
                    color: isCorrect ? "#34d399" : isWrong ? "#f87171" : topicColor,
                    fontWeight:600, fontSize:12, border: `1px solid ${isCorrect ? "#34d39950" : isWrong ? "#f8717150" : topicColor+"44"}`,
                    fontFamily:"inherit", transition:"all 0.2s",
                  }}>
                    {assigned} {isCorrect && "✓"} {isWrong && "✗"}
                  </button>
                ) : (
                  <span style={{ padding:"5px 12px", borderRadius:8, border:`1px dashed ${isActive ? topicColor : border}`, color:fgSub, fontSize:11 }}>
                    {isActive ? "← pilih di bawah" : "?"}
                  </span>
                )}
              </div>
            );
          })}
          {/* Available options to pick from */}
          {!showAnswer && matchAnswers.options.length > 0 && (
            <div style={{ display:"flex", gap:6, flexWrap:"wrap", marginTop:10, padding:"10px 12px", borderRadius:10, background:dark?"#0f172a":"#f8fafc", border:`1px solid ${border}` }}>
              <span style={{ fontSize:10, color:fgSub, fontWeight:600, width:"100%", marginBottom:4 }}>Pilih jawaban:</span>
              {matchAnswers.options.map((opt, oi) => (
                <button key={oi} onClick={() => {
                  if (matchAnswers.activeLeft === null) return;
                  setMatchAnswers(prev => {
                    const next = {
                      ...prev,
                      assignments: { ...prev.assignments, [prev.activeLeft]: opt },
                      options: prev.options.filter((_, idx) => idx !== oi),
                      activeLeft: null,
                    };
                    return next;
                  });
                }} style={{
                  padding:"5px 14px", borderRadius:8, cursor: matchAnswers.activeLeft !== null ? "pointer" : "not-allowed",
                  background: matchAnswers.activeLeft !== null ? `${topicColor}15` : dark ? "#1e293b" : "#e2e8f0",
                  color: matchAnswers.activeLeft !== null ? topicColor : fgSub,
                  fontWeight:600, fontSize:12, border:`1px solid ${matchAnswers.activeLeft !== null ? topicColor+"44" : border}`,
                  fontFamily:"inherit", transition:"all 0.2s", opacity: matchAnswers.activeLeft !== null ? 1 : 0.5,
                }}>
                  {opt}
                </button>
              ))}
            </div>
          )}
          {showAnswer && q.pairs.some((p, i) => matchAnswers.assignments[i] !== p.right) && (
            <div style={{ marginTop:8, fontSize:11, color:"#f87171", fontWeight:600 }}>
              Jawaban benar: {q.pairs.map(p => p.right).join(", ")}
            </div>
          )}
        </div>
      )}

      {/* Show Answer Button */}
      <button onClick={() => setShowAnswer(!showAnswer)}
        style={{
          padding:"8px 20px", borderRadius:10, border:"none", cursor:"pointer",
          background: showAnswer ? (dark?"#334155":"#e2e8f0") : `linear-gradient(135deg, ${topicColor}, ${topicColor}cc)`,
          color: showAnswer ? fgSub : "#fff", fontWeight:600, fontSize:13, fontFamily:"inherit",
          transition:"all 0.3s"
        }}>
        {showAnswer ? "Sembunyikan" : "Lihat Jawaban & Pembahasan"}
      </button>

      {/* Answer & Explanation */}
      {showAnswer && (
        <div style={{ marginTop:16, padding:16, borderRadius:12, background:dark?"#0f172a":"#f0fdf4", border:`1px solid ${dark?"#1e293b":"#bbf7d0"}` }}>
          {q.answer === "essay" ? null : typeof q.answer === "string" ? (
            <div style={{ fontSize:13, color:"#34d399", fontWeight:700, marginBottom:10, fontFamily:"'JetBrains Mono', monospace" }}>
              ✅ Jawaban: {q.answer}
            </div>
          ) : null}
          
          <div style={{ fontSize:13, color:fg, lineHeight:1.8, whiteSpace:"pre-line" }}>
            <RenderTextWithTables text={q.explanation.text} fg={fg} dark={dark} />
          </div>

          {getVisualComponent(q.explanation.visual, dark, isMobile)}

          {q.explanation.visual === "confusion_matrix" && (
            <FormulaCard dark={dark} formulas={[
              "Accuracy = (TP+TN) / Total",
              "Precision = TP / (TP+FP)",
              "Recall = TP / (TP+FN)",
              "F1 = 2×P×R / (P+R)",
              "Specificity = TN / (TN+FP)"
            ]}/>
          )}
        </div>
      )}
    </div>
  );
}

// ═══════════════ FORMULA SHEET ═══════════════

function FormulaSheet({ dark, isMobile }) {
  const bg = dark ? "#1e293b" : "#ffffff";
  const border = dark ? "#334155" : "#e2e8f0";
  const fg = dark ? "#e2e8f0" : "#1e293b";
  const fgSub = dark ? "#94a3b8" : "#64748b";

  const sections = [
    {
      title: "📊 Statistik Dasar", color: "#fbbf24",
      items: [
        "Mean = Σxᵢ / n",
        "Median = nilai tengah (sorted)",
        "IQR = Q3 - Q1",
        "Outlier: x < Q1-1.5×IQR atau x > Q3+1.5×IQR",
        "Right-skewed: Mean > Median",
      ]
    },
    {
      title: "🔄 Normalisasi", color: "#34d399",
      items: [
        "Min-Max: x' = (x - min) / (max - min)",
        "Z-score: x' = (x - μ) / σ",
      ]
    },
    {
      title: "📐 Distance Metrics", color: "#60a5fa",
      items: [
        "Manhattan: Σ|xᵢ - yᵢ|",
        "Euclidean: √(Σ(xᵢ - yᵢ)²)",
        "Cosine: (x·y) / (||x|| × ||y||)",
        "Jaccard: |A∩B| / |A∪B|",
      ]
    },
    {
      title: "🎯 Evaluasi Klasifikasi", color: "#f87171",
      items: [
        "Accuracy = (TP+TN) / (TP+TN+FP+FN)",
        "Precision = TP / (TP+FP)",
        "Recall (Sensitivity) = TP / (TP+FN)",
        "Specificity = TN / (TN+FP)",
        "F1 = 2PR / (P+R)",
        "FPR = FP / (FP+TN) = 1-Specificity",
      ]
    },
    {
      title: "📉 Evaluasi Regresi", color: "#a78bfa",
      items: [
        "MAE = (1/n)Σ|yᵢ - ŷᵢ|",
        "MSE = (1/n)Σ(yᵢ - ŷᵢ)²",
        "RMSE = √MSE",
        "R² = 1 - (SS_res / SS_tot)",
      ]
    },
    {
      title: "🧠 PCA", color: "#22d3ee",
      items: [
        "Explained Var = λᵢ / Σλ × 100%",
        "Dimensi baru = jumlah PC dipilih",
        "PC = eigenvector, λ = eigenvalue",
      ]
    },
    {
      title: "🌲 CART (Gini)", color: "#fb923c",
      items: [
        "Gini(S) = 1 - Σpᵢ²",
        "Gini split = Σ(|Sⱼ|/|S|) × Gini(Sⱼ)",
        "Pilih split dengan Gini TERKECIL",
      ]
    },
    {
      title: "📊 Naive Bayes", color: "#e879f9",
      items: [
        "P(C|X) ∝ P(C) × ΠP(xᵢ|C)",
        "Gaussian: (1/σ√2π) × e^(-(x-μ)²/2σ²)",
        "Laplace: P(x|C) = (count+1) / (N+|V|)",
      ]
    },
    {
      title: "⚖️ Bias-Variance", color: "#c084fc",
      items: [
        "Error = Bias² + Variance + Irreducible",
        "High bias = underfitting",
        "High variance = overfitting",
      ]
    },
  ];

  return (
    <div style={{ display:"grid", gridTemplateColumns:isMobile ? "1fr" : "repeat(auto-fill, minmax(260px, 1fr))", gap:14 }}>
      {sections.map((s, i) => (
        <div key={i} style={{ background:bg, borderRadius:14, padding:"16px 18px", border:`1px solid ${border}`, borderLeft:`4px solid ${s.color}` }}>
          <div style={{ fontWeight:700, color:s.color, fontSize:14, marginBottom:10 }}>{s.title}</div>
          {s.items.map((item, j) => (
            <div key={j} style={{ fontSize:12, color:fgSub, padding:"3px 0", fontFamily:"'JetBrains Mono', monospace", lineHeight:1.6 }}>
              {item}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

// ═══════════════ TOPIC OVERVIEW ═══════════════

function TopicOverview({ dark }) {
  const topics = [
    { name: "AI & Agents", week: 1, weight: "~6pts", freq: "⬛⬛⬜", color: "#f472b6", key: "PEAS, 4 perspektif AI, sifat environment" },
    { name: "Search", week: 1, weight: "~4pts", freq: "⬛⬜⬜", color: "#fb923c", key: "BFS, DFS, UCS, A*, heuristic" },
    { name: "Data Science", week: 2, weight: "~6pts", freq: "⬛⬛⬜", color: "#a78bfa", key: "CRISP-DM, 4 analytics, ML types" },
    { name: "EDA & Statistik", week: 3, weight: "~8pts", freq: "⬛⬛⬛", color: "#fbbf24", key: "Mean/median, IQR, outlier, skewness, korelasi" },
    { name: "Preprocessing", week: 3, weight: "~8pts", freq: "⬛⬛⬛", color: "#34d399", key: "Encoding, normalisasi, imputasi, cleaning" },
    { name: "Feature Eng.", week: 4, weight: "~4pts", freq: "⬛⬜⬜", color: "#fcd34d", key: "Feature selection, extraction" },
    { name: "PCA", week: 4, weight: "~10pts", freq: "⬛⬛⬛", color: "#60a5fa", key: "Eigenvalue, explained var, dimensi reduksi" },
    { name: "CART", week: 5, weight: "~12pts", freq: "⬛⬛⬛", color: "#fb923c", key: "Gini index, tree building, pruning" },
    { name: "Random Forest", week: 5, weight: "~6pts", freq: "⬛⬛⬜", color: "#4ade80", key: "Bagging, bootstrap, majority vote" },
    { name: "Evaluasi Model", week: 6, weight: "~14pts", freq: "⬛⬛⬛", color: "#f87171", key: "Confusion matrix, ROC, AUC, cross-val" },
    { name: "Bias-Variance", week: 6, weight: "~6pts", freq: "⬛⬛⬛", color: "#c084fc", key: "Overfit/underfit, learning curves" },
    { name: "KNN", week: 6, weight: "~10pts", freq: "⬛⬛⬛", color: "#22d3ee", key: "Distance, preprocessing, k selection" },
    { name: "Naive Bayes", week: 8, weight: "~6pts", freq: "⬛⬛⬜", color: "#e879f9", key: "Bayes theorem, Gaussian, zero frequency" },
  ];

  const bg = dark ? "#1e293b" : "#ffffff";
  const border = dark ? "#334155" : "#e2e8f0";
  const fg = dark ? "#e2e8f0" : "#1e293b";
  const fgSub = dark ? "#94a3b8" : "#64748b";

  return (
    <div style={{ overflowX:"auto" }}>
      <table style={{ width:"100%", borderCollapse:"separate", borderSpacing:"0 6px", fontSize:13 }}>
        <thead>
          <tr>
            {["Topik","Week","Bobot","Frekuensi","Key Concepts"].map((h,i) => (
              <th key={i} style={{ textAlign:"left", padding:"8px 12px", color:fgSub, fontWeight:600, fontSize:11, textTransform:"uppercase", letterSpacing:0.5 }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {topics.map((t,i) => (
            <tr key={i} style={{ background:bg }}>
              <td style={{ padding:"10px 12px", borderRadius:"8px 0 0 8px", fontWeight:700 }}>
                <span style={{ color:t.color }}>●</span> <span style={{ color:fg }}>{t.name}</span>
              </td>
              <td style={{ padding:"10px 12px", color:fgSub }}>W{t.week}</td>
              <td style={{ padding:"10px 12px", color:t.color, fontWeight:700 }}>{t.weight}</td>
              <td style={{ padding:"10px 12px", fontSize:10 }}>{t.freq}</td>
              <td style={{ padding:"10px 12px", borderRadius:"0 8px 8px 0", color:fgSub, fontSize:12 }}>{t.key}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ═══════════════ MAIN APP ═══════════════

export default function KASDADExamPractice() {
  const isMobile = useIsMobile();
  const [dark, setDark] = useState(false);
  const [tab, setTab] = useState("overview");
  try{const{useTabSwipe}=require("@/lib/SwipeNavigationContext");useTabSwipe(["overview","practice","formulas"],tab,setTab);}catch{}
  const [filter, setFilter] = useState("all");

  const bg = dark ? "#0f172a" : "#f8fafc";
  const fg = dark ? "#e2e8f0" : "#1e293b";
  const fgSub = dark ? "#94a3b8" : "#64748b";
  const cardBg = dark ? "#1e293b" : "#ffffff";
  const border = dark ? "#334155" : "#e2e8f0";

  const filteredQ = filter === "all" ? QUESTIONS : 
    filter === "pg" ? QUESTIONS.filter(q => q.type === "pg" || q.type === "hitungan" || q.type === "matching") :
    QUESTIONS.filter(q => q.type === "essay");

  const tabs = [
    { id: "overview", label: "📋 Overview", desc: "Peta materi" },
    { id: "practice", label: "🧪 Latihan", desc: `${QUESTIONS.length} soal` },
    { id: "formulas", label: "📝 Rumus", desc: "Cheat sheet" },
  ];

  const pgCount = QUESTIONS.filter(q => q.type !== "essay").length;
  const essayCount = QUESTIONS.filter(q => q.type === "essay").length;
  const totalPts = QUESTIONS.reduce((a,b) => a + b.points, 0);

  return (
    <div style={{ minHeight:"100vh", background:bg, color:fg, fontFamily:"'Nunito', 'Segoe UI', system-ui, sans-serif", transition:"all 0.4s ease", overflowX:"hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;600;700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: ${dark?"rgba(255,255,255,0.1)":"rgba(0,0,0,0.1)"}; border-radius: 3px; }
        @keyframes fadeIn { from { opacity:0; transform:translateY(12px) } to { opacity:1; transform:translateY(0) } }
        button { font-family: inherit; }
      `}</style>

      {/* ═══ HEADER ═══ */}
      <div style={{ maxWidth:920, margin:"0 auto", padding:"0 20px" }}>
        <header style={{ padding:"32px 0 24px", display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:12 }}>
          <div>
            <h1 style={{ fontSize:26, fontWeight:900, letterSpacing:-0.5, lineHeight:1.2 }}>
              <span style={{ background:"linear-gradient(135deg, #f59e0b, #f472b6, #a78bfa)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>KASDAD</span>
              <span style={{ color:fgSub, fontWeight:500, fontSize:16, marginLeft:8 }}>UTS Practice</span>
            </h1>
            <p style={{ color:fgSub, fontSize:12, marginTop:4 }}>
              Genap 2025/2026 · {pgCount} PG + {essayCount} Essay · Total ~{totalPts}pts
            </p>
          </div>
          
          {/* Dark/Light Toggle */}
          <button onClick={() => setDark(!dark)} style={{
            width:52, height:28, borderRadius:14, border:"none", cursor:"pointer", position:"relative",
            background: dark ? "linear-gradient(135deg, #1e293b, #334155)" : "linear-gradient(135deg, #fbbf24, #f59e0b)",
            boxShadow: dark ? "inset 0 1px 3px rgba(0,0,0,0.3)" : "inset 0 1px 3px rgba(0,0,0,0.1)",
          }}>
            <div style={{
              width:22, height:22, borderRadius:"50%", background:"#fff",
              position:"absolute", top:3, left: dark ? 3 : 27,
              transition:"left 0.3s ease", display:"flex", alignItems:"center", justifyContent:"center", fontSize:12,
              boxShadow:"0 1px 4px rgba(0,0,0,0.2)"
            }}>
              {dark ? "🌙" : "☀️"}
            </div>
          </button>
        </header>

        {/* ═══ TABS ═══ */}
        <div style={{ display:"flex", gap:6, marginBottom:24, overflowX:"auto", paddingBottom:4 }}>
          {tabs.map(t => (
            <button key={t.id} onClick={() => setTab(t.id)}
              style={{
                padding:"10px 18px", borderRadius:12, border:`1.5px solid ${tab===t.id ? "#f59e0b" : border}`,
                background: tab===t.id ? (dark?"#f59e0b11":"#fef3c7") : "transparent",
                color: tab===t.id ? "#f59e0b" : fgSub, cursor:"pointer", fontSize:13, fontWeight:tab===t.id?700:500,
                whiteSpace:"nowrap", transition:"all 0.2s", fontFamily:"inherit"
              }}>
              {t.label} <span style={{ fontSize:10, opacity:0.7 }}>{t.desc}</span>
            </button>
          ))}
        </div>

        {/* ═══ CONTENT ═══ */}
        <div style={{ animation:"fadeIn 0.4s ease both", paddingBottom:60 }}>
          
          {/* OVERVIEW TAB */}
          {tab === "overview" && (
            <div>
              <div style={{ background:cardBg, borderRadius:16, padding:24, border:`1px solid ${border}`, marginBottom:20 }}>
                <h2 style={{ fontSize:18, fontWeight:800, marginBottom:4, color:fg }}>📚 Peta Materi UTS</h2>
                <p style={{ color:fgSub, fontSize:12, marginBottom:16 }}>Berdasarkan analisis 3 UTS terakhir + silabus Genap 2025/2026</p>
                <TopicOverview dark={dark}/>
              </div>

              {/* Quick Stats */}
              <div style={{ display:"grid", gridTemplateColumns:isMobile ? "1fr" : "repeat(auto-fit, minmax(150px, 1fr))", gap:12, marginBottom:20 }}>
                {[
                  { label: "Format", value: "60p PG + 40p Essay", color: "#f59e0b" },
                  { label: "Durasi", value: "150 menit", color: "#60a5fa" },
                  { label: "Open Notes", value: "8 hal A4", color: "#34d399" },
                  { label: "Kalkulator", value: "Boleh", color: "#a78bfa" },
                ].map((s,i) => (
                  <div key={i} style={{ background:cardBg, borderRadius:12, padding:"14px 16px", border:`1px solid ${border}`, borderTop:`3px solid ${s.color}` }}>
                    <div style={{ fontSize:11, color:fgSub, fontWeight:600, textTransform:"uppercase", letterSpacing:0.5 }}>{s.label}</div>
                    <div style={{ fontSize:15, fontWeight:800, color:s.color, marginTop:4 }}>{s.value}</div>
                  </div>
                ))}
              </div>

              {/* Strategy */}
              <div style={{ background:cardBg, borderRadius:16, padding:24, border:`1px solid ${border}` }}>
                <h2 style={{ fontSize:18, fontWeight:800, marginBottom:12, color:fg }}>🎯 Strategi Menjawab</h2>
                {[
                  { time: "0-60 min", task: "PG & Isian", tip: "Kerjakan yang yakin dulu. Skip yang berat." },
                  { time: "60-120 min", task: "Essay (2 soal)", tip: "Tulis rumus dulu, baru hitung. Tunjukkan SEMUA langkah." },
                  { time: "120-150 min", task: "Review", tip: "Cek hitungan, isi yang terskip, periksa essay." },
                ].map((s,i) => (
                  <div key={i} style={{ display:"flex", gap:14, alignItems:"flex-start", padding:"10px 0", borderBottom:i<2?`1px solid ${border}`:"none" }}>
                    <div style={{ background:"#f59e0b22", color:"#f59e0b", padding:"4px 10px", borderRadius:8, fontSize:11, fontWeight:700, whiteSpace:"nowrap", minWidth:80, textAlign:"center" }}>{s.time}</div>
                    <div>
                      <div style={{ fontWeight:700, color:fg, fontSize:13 }}>{s.task}</div>
                      <div style={{ color:fgSub, fontSize:12 }}>{s.tip}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* PRACTICE TAB */}
          {tab === "practice" && (
            <div>
              {/* Filter */}
              <div style={{ display:"flex", gap:6, marginBottom:20, flexWrap:"wrap" }}>
                {[
                  { id: "all", label: `Semua (${QUESTIONS.length})` },
                  { id: "pg", label: `PG & Hitungan (${pgCount})` },
                  { id: "essay", label: `Essay (${essayCount})` },
                ].map(f => (
                  <button key={f.id} onClick={() => setFilter(f.id)}
                    style={{
                      padding:"6px 14px", borderRadius:8, fontSize:12, fontWeight:600, cursor:"pointer",
                      background: filter===f.id ? "#f59e0b" : "transparent",
                      color: filter===f.id ? "#000" : fgSub,
                      border: `1px solid ${filter===f.id?"#f59e0b":border}`,
                      fontFamily:"inherit", transition:"all 0.2s"
                    }}>
                    {f.label}
                  </button>
                ))}
              </div>

              {/* Questions */}
              {filteredQ.map((q, i) => (
                <QuestionCard key={q.id} q={q} dark={dark} index={QUESTIONS.indexOf(q)} isMobile={isMobile} />
              ))}
            </div>
          )}

          {/* FORMULAS TAB */}
          {tab === "formulas" && (
            <div>
              <div style={{ marginBottom:16, color:fgSub, fontSize:13 }}>
                📝 Semua rumus penting untuk UTS — cetak ini di catatan 8 halaman A4!
              </div>
              <FormulaSheet dark={dark} isMobile={isMobile}/>
              
              {/* Model Comparison Table */}
              <div style={{ background:cardBg, borderRadius:16, padding:24, border:`1px solid ${border}`, marginTop:20 }}>
                <h3 style={{ fontSize:16, fontWeight:800, marginBottom:14, color:fg }}>⚔️ Perbandingan Model</h3>
                <div style={{ overflowX:"auto" }}>
                  <table style={{ width:"100%", borderCollapse:"collapse", fontSize:12 }}>
                    <thead>
                      <tr>
                        {["","DT","RF","KNN","NB"].map((h,i) => (
                          <th key={i} style={{ padding:"8px 10px", textAlign:"left", color:fgSub, borderBottom:`1px solid ${border}`, fontWeight:700 }}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        ["Perlu normalisasi?", "❌", "❌", "✅ Wajib!", "❌"],
                        ["Handle kategorikal?", "✅ Langsung", "✅ Langsung", "❌ Perlu encoding", "✅ Langsung"],
                        ["Interpretable?", "✅ Sangat", "⚠️ Kurang", "⚠️ Kurang", "✅ Cukup"],
                        ["Sensitif outlier?", "✅ Ya", "⚠️ Lebih robust", "✅ Ya", "⚠️ Sedikit"],
                        ["Bias vs Variance", "Low B, High V", "Low B, Lower V", "Tergantung k", "High B, Low V"],
                        ["Lazy learner?", "❌", "❌", "✅ Ya", "❌"],
                      ].map((row,i) => (
                        <tr key={i} style={{ background: i%2===0 ? (dark?"rgba(255,255,255,0.02)":"rgba(0,0,0,0.02)") : "transparent" }}>
                          {row.map((cell,j) => (
                            <td key={j} style={{ padding:"8px 10px", color: j===0 ? fg : fgSub, fontWeight: j===0 ? 600 : 400, borderBottom:`1px solid ${border}22` }}>
                              {cell}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
