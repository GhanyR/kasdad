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

const BANK_TOPIC_COLORS = {
  "Statistik":"#fbbf24","Encoding":"#34d399","PCA":"#60a5fa","PCA Hitungan":"#60a5fa",
  "Normalisasi":"#34d399","Preprocessing":"#34d399","Bias-Variance":"#c084fc",
  "Cross-Val":"#f87171","Clustering":"#a78bfa","Decision Tree":"#fb923c","CART":"#fb923c",
  "Z-Score":"#fbbf24","Metrics":"#f87171","KNN Imputation":"#22d3ee","KNN":"#22d3ee",
  "Similarity":"#fcd34d","Environment":"#f472b6","Evaluasi":"#f87171",
  "Naive Bayes":"#e879f9","Imbalanced":"#ef4444",
};

const BANK_SOAL = [
{id:"G25-1",yr:"Gasal 25/26",t:"Statistik",q:"Diberikan data: [22, 25, 28, 30, 32, 35, 38, 40, 42, 51]\nQ1 = 28, Q3 = 40\n\nTentukan IQR dan outlier yang harus dihapus.",o:["IQR=8, Batas Atas=50, outlier: 51","IQR=8, Batas Atas=42, outlier: 51","IQR=12, hapus semua >40","IQR=8, tidak ada outlier"],a:0,s:"Menggunakan Q1=30, Q3=38:\nIQR = Q3 - Q1 = 38 - 30 = 8\nBatas Atas = Q3 + 1.5×IQR = 38 + 12 = 50\nBatas Bawah = Q1 - 1.5×IQR = 30 - 12 = 18\nNilai 51 > 50 → OUTLIER",imp:true},
{id:"G25-2",yr:"Gasal 25/26",t:"Encoding",q:"Dataset dgn fitur kategorikal nominal (warna) untuk KNN. Encoding paling tepat?",o:["One-Hot Encoding","Frequency Encoding","Target Encoding","Label Encoding"],a:0,s:"OHE: biner (1,0,0). Jarak netral.\nLabel Encoding → urutan palsu.\nKNN berbasis jarak → OHE.",imp:true},
{id:"G25-3",yr:"Gasal 25/26",t:"PCA",q:"PCA 6 fitur. Eigenvalues: [4.5, 3.0, 2.5, 1.5, 1.0, 0.5]. Total=13.0\nMinimal PC untuk ≥90% variance?",o:["3 PC (76.9%)","4 PC (88.5%)","5 PC (96.2%)","6 PC (100%)"],a:2,s:"PC4: 88.5% ← belum 90%\nPC5: 96.2% ✓",imp:true},
{id:"G25-4",yr:"Gasal 25/26",t:"PCA",q:"X1 dan X2 berkorelasi positif → PCA akan?",o:["Sumbu jadi ortogonal (tidak berkorelasi)","Tetap berkorelasi positif","Menukar posisi fitur","Mengurangi variansi"],a:0,s:"PCA → fitur baru TIDAK BERKORELASI. PC selalu ortogonal.",imp:false},
{id:"E25-1",yr:"Genap 24/25",t:"Normalisasi",q:"Gaji: [4.5,6,8,12,15]M. MinMax Gaji=4.5? Tanda z-score jika mean=9.1?",o:["MinMax=0, Z negatif","MinMax=0.14, Z negatif","MinMax=0, Z positif","MinMax=0.14, Z nol"],a:0,s:"MinMax = (4.5-4.5)/(15-4.5) = 0\nZ = (4.5-9.1)/σ → negatif (data < mean).",imp:true},
{id:"E25-2",yr:"Genap 24/25",t:"Preprocessing",q:"Tentang Random Forest preprocessing. Yang SALAH:",o:["Split dulu baru preprocess","RF handle kategorikal langsung","RF punya Feature Importance","RF butuh feature scaling"],a:3,s:"RF threshold-based → scaling tidak mengubah urutan.\nBUTUH scaling: KNN, SVM. TIDAK: DT, RF, NB.",imp:true},
{id:"E25-5",yr:"Genap 24/25",t:"PCA Hitungan",q:"10 fitur, eigenvalues: [6.50,3.85,2.90,2.10,1.75,1.40,1.10,0.85,0.55,0.40]\nTotal=21.40. EV PC5? EV PC9? Min PC untuk 95%?",o:["EV5=8.18%, EV9=2.57%, 8 PC","EV5=1.75%, EV9=0.55%, 7 PC","EV5=8.18%, EV9=2.57%, 7 PC","EV5=8.18%, EV9=2.57%, 9 PC"],a:0,s:"EV5=1.75/21.40=8.18%\nEV9=0.55/21.40=2.57%\nPC8 kumulatif=95.56% ✓",imp:true},
{id:"E25-6",yr:"Genap 24/25",t:"Bias-Variance",q:"Bias & variance diminimalkan → sisa error? Metode turunkan masing-masing?",o:["Irreducible error; Boosting↓bias, Bagging↓variance","Training error; Boosting↓variance, Bagging↓bias","Validation error; keduanya turunkan bias","Model error; tidak bisa dikurangi"],a:0,s:"ε = irreducible error.\nBIAS → Boosting. VARIANCE → Bagging.",imp:true},
{id:"21-1",yr:"Ganjil 21/22",t:"Cross-Val",q:"10-fold CV, 200 data. K, M, N?",o:["K=10, M=180, N=20","K=10, M=200, N=20","K=1, M=180, N=20","K=10, M=190, N=10"],a:0,s:"K=10, N=200/10=20, M=200-20=180.",imp:false},
{id:"21-5",yr:"Ganjil 21/22",t:"Statistik",q:"X=[2,2,2,2,2], Y=[0,1,2,3,4]. Mean & std?",o:["Sama semua","Mean sama, std berbeda","Mean berbeda, std sama","Mean berbeda, std berbeda"],a:1,s:"Mean=2 sama. Std X=0, Std Y=√2≈1.41 → berbeda.",imp:false},
{id:"21-6",yr:"Ganjil 21/22",t:"Normalisasi",q:"Raw MSE=1150, setelah z-score MSE=0.9. Kedua lebih baik?",o:["True","False"],a:1,s:"FALSE! MSE tidak bisa dibandingkan jika skala berbeda!",imp:true},
{id:"21-7",yr:"Ganjil 21/22",t:"Decision Tree",q:"DT standarisasi vs tanpa → prediksi berbeda?",o:["True","False"],a:1,s:"FALSE! DT threshold-based. Standarisasi tidak ubah urutan → split SAMA.",imp:true},
{id:"21-8",yr:"Ganjil 21/22",t:"Z-Score",q:"Tes A: 95,μ=90,σ=10. Tes B: 70,μ=60,σ=2. Mana benar?",o:["Z_B=7.0","Z_A=1.5","Z_A=Z_B","Z_B=0.5","Tidak ada tepat"],a:4,s:"Z_A=0.5, Z_B=5.0. Semua pilihan salah → E.",imp:false},
{id:"21-9",yr:"Ganjil 21/22",t:"Metrics",q:"Diagnosa siswa berkebutuhan khusus. Minimisir pendamping tidak perlu. Metrik?",o:["Precision","Brier Score","Accuracy","Recall"],a:0,s:"Minimisir FP → Precision.",imp:true},
{id:"22-1",yr:"Gasal 22/23",t:"Statistik",q:"[5,6,3,1,4,2]. IQR?",o:["2","3","5","-2"],a:1,s:"Urutkan→[1,2,3,4,5,6]. Q1=2, Q3=5. IQR=3.",imp:false},
{id:"22-2",yr:"Gasal 22/23",t:"PCA",q:"Pernyataan TIDAK TEPAT tentang PCA:",o:["PC saling ortogonal","Didiagonalisasi = matriks input n×m","PC1 = eigenvalue terbesar","PCA = transformasi basis"],a:1,s:"Yang didiagonalisasi = COVARIANCE MATRIX (m×m), bukan input (n×m).",imp:true},
{id:"22-4",yr:"Gasal 22/23",t:"KNN",q:"KNN klasifikasi dgn jarak ke centroid kelas?",o:["Benar","Salah"],a:1,s:"SALAH! KNN → jarak ke SEMUA data. Yang pakai centroid = K-MEANS.",imp:true},
{id:"23-1",yr:"Gasal 23/24",t:"PCA",q:"EV=[0.73,0.21,0.04,0.01]. Ambil 1 PC → dimensi jadi?",o:["27%","25%","Tidak ditentukan","73%"],a:1,s:"JEBAKAN! Dimensi=1/4=25%. 73% itu EV, bukan % dimensi!\n60%+ salah menjawab 73%.",imp:true},
{id:"23-2",yr:"Gasal 23/24",t:"Decision Tree",q:"Pernyataan PALING TEPAT tentang DT:",o:["Leaf harus pure","DT implicit feature selection","Model linier","Harus encode+normalisasi"],a:1,s:"DT memilih fitur terbaik → implicit feature selection.",imp:true},
{id:"23-3",yr:"Gasal 23/24",t:"CART",q:"Gini Index untuk regression tree?",o:["True","False"],a:1,s:"FALSE! Gini = classification. Regression → MSE.",imp:true},
{id:"23-4",yr:"Gasal 23/24",t:"Evaluasi",q:"F1 >90% → specificity juga tinggi?",o:["Benar","Salah"],a:1,s:"SALAH! F1 hanya Precision+Recall. Specificity=TN/(TN+FP) terpisah.\n70%+ salah di 2023!",imp:true},
{id:"23-5",yr:"Gasal 23/24",t:"Preprocessing",q:"Preprocessing WAJIB KNN tapi tidak DT:",o:["Handle outlier","Cek format","Buang fitur low corr","Normalisasi"],a:3,s:"KNN=distance → scaling wajib. DT=threshold → tidak perlu.",imp:true},
{id:"NB-1",yr:"Genap 23/24",t:"Naive Bayes",q:"Asumsi utama Naive Bayes:",o:["Fitur harus numerik","Conditional independent given class","Distribusi normal","Kelas seimbang"],a:1,s:"P(X₁,X₂|C)=P(X₁|C)×P(X₂|C). Fitur independen given kelas.",imp:true},
{id:"NB-2",yr:"Genap 23/24",t:"Naive Bayes",q:"P(fitur|class)=0 → dampak?",o:["Normal","Seluruh posterior=0","Crash","Ganti model"],a:1,s:"Zero frequency! Satu 0 → semua 0. Solusi: Laplace (+1).",imp:true},
{id:"IM-1",yr:"Gasal 24/25",t:"Imbalanced",q:"SMOTE sebelum train-test split. Kesalahan?",o:["Tidak ada","SMOTE hanya pada training SETELAH split","SMOTE setelah evaluasi","SMOTE tidak boleh"],a:1,s:"DATA LEAKAGE! SMOTE hanya di training data setelah split.",imp:true},
// ═══ KUIS 1 GASAL 24/25 ═══
{id:"K1A-1",yr:"Kuis Gasal 24/25",t:"AI & Agents",q:"Pernyataan terkait learning agent yang TIDAK TEPAT?",o:["Manusia menentukan struktur dasar model melalui formulasi representasi","Algoritma pelatihan menghasilkan output prediksi jawaban","Proses belajar melalui pencarian model dgn fungsi evaluasi","Data untuk melatih model merupakan sampel dari ruang permasalahan"],a:1,s:"Yang menghasilkan output prediksi = MODEL yang sudah dilatih, bukan algoritma pelatihan itu sendiri. Algoritma pelatihan = proses untuk MEMBUAT model.",imp:true},
{id:"K1A-4",yr:"Kuis Gasal 24/25",t:"Cross-Val",q:"K-fold CV: 6 fold, validasi 600 samples per fold. Berapa N dan M?",o:["N=3600, M=3000","N=3000, M=2400","N=3600, M=3600","N=600, M=3000"],a:0,s:"N/6=600 → N=3600. M=N-600=3000.\nSetiap fold: 600 validasi, 3000 training.",imp:false},
{id:"K1B-1",yr:"Kuis Gasal 24/25",t:"AI & Agents",q:"Pernyataan tentang agen rasional yang TIDAK TEPAT?",o:["Utility-based agent memilih langkah terbaik","Agen sebagai program menghasilkan tindakan terbaik","Ukuran kinerja pada keadaan INTERNAL agen","Menambah sensor untuk partially observable"],a:2,s:"Ukuran kinerja diukur pada keadaan LINGKUNGAN, bukan internal agen! Contoh: kebersihan lantai, bukan jumlah debu di kantong.",imp:true},
{id:"K1B-3",yr:"Kuis Gasal 24/25",t:"CART",q:"CART wajib membuang outlier sebelum training?",o:["Benar","Tidak benar"],a:1,s:"TIDAK BENAR. DT splitting berdasarkan threshold, bukan jarak. Outlier tidak mempengaruhi urutan percabangan. Buang outlier BUKAN wajib untuk CART.",imp:true},
{id:"K1B-4",yr:"Kuis Gasal 24/25",t:"Evaluasi",q:"Akurasi tinggi → precision pasti tinggi?",o:["Benar","Tidak benar"],a:1,s:"TIDAK. Imbalanced data: 9900 negatif, 100 positif → prediksi semua negatif → akurasi 99% tapi precision bisa 0%.",imp:true},
{id:"K1C-2",yr:"Kuis Gasal 24/25",t:"KNN Imputation",q:"Imputation 1-NN Manhattan. Data (60,35,NaN). Baris lain: (50,25,3), (50,30,1), (45,40,2). Hasilnya?",o:["3","1","2","NaN"],a:1,s:"d(2,1)=|60-50|+|35-25|=20\nd(2,3)=|60-50|+|35-30|=15 ← TERDEKAT\nd(2,4)=|60-45|+|35-40|=20\nNearest=baris 3 → Jumlah Klaim=1",imp:false},
{id:"K1C-3",yr:"Kuis Gasal 24/25",t:"Evaluasi",q:"Akurasi >95% → precision tidak mungkin <50%?",o:["Benar","Tidak benar"],a:1,s:"TIDAK BENAR. Contoh: 1000 data (950 neg, 50 pos). TP=10, FP=10, TN=940, FN=40. Acc=(940+10)/1000=95%. Prec=10/20=50%. Bisa dibuat <50%.",imp:true},
// ═══ UTS GENAP 23/24 ═══
{id:"G2324-1",yr:"Genap 23/24",t:"AI & Agents",q:"Ukuran kinerja vacuum = jumlah debu dibersihkan 1 jam. Sesuai kaidah ukuran pada lingkungan?",o:["True","False"],a:1,s:"FALSE. 'Jumlah debu dibersihkan' = keadaan INTERNAL agen. Yang tepat: seberapa bersih lantai (LINGKUNGAN).",imp:true},
{id:"G2324-5",yr:"Genap 23/24",t:"Visualisasi",q:"Visualisasi data kependudukan (Population, Area, Growth Rate)?",o:["Bar chart","Scatter plot","Bubble chart","Pie chart"],a:2,s:"Bubble chart: x=Population, y=Area, size=Growth Rate. 3 variabel numerik sekaligus.",imp:false},
{id:"G2324-11",yr:"Genap 23/24",t:"PCA",q:"Dataset 5000×100 direduksi ke 10 dimensi. Ukuran matriks transformasi?",o:["10×10","10×100","100×10","5000×10"],a:1,s:"Matriks transformasi = k×M = 10×100. k=jumlah PC, M=jumlah fitur awal.",imp:true},
{id:"G2324-15",yr:"Genap 23/24",t:"CART",q:"X1 (2 nilai)=1 split, X2 (3 nilai)=3 split, X3 (5 numerik→4 midpoint)=4 split. Total binary split root?",o:["5","6","8","10"],a:2,s:"Total = 1+3+4 = 8 binary splits.\nKategorik: setiap nilai = 1 kandidat.\nNumerik: midpoint antara berurutan.",imp:true},
{id:"G2324-22",yr:"Genap 23/24",t:"Evaluasi",q:"F1-score >90% → recall tidak mungkin <60%?",o:["Benar","Salah"],a:0,s:"BENAR! F1 = harmonic mean P×R. Jika R<60%, maka F1 pasti <75% (harmonic mean menghukum nilai rendah). Jadi F1>90% menjamin R>60%.",imp:true},
{id:"G2324-27",yr:"Genap 23/24",t:"KNN",q:"Jaccard distance: siapa terdekat dgn Mhs5 (0,1,0,1,0,1)?",o:["Mhs1","Mhs2","Mhs3","Mhs4"],a:2,s:"Mhs5={MK2,MK4,MK6}. Mhs3={MK2,MK3,MK4,MK6}.\nIntersection=3, Union=4. J_sim=3/4=0.75 (tertinggi).\nJ_dist=1-0.75=0.25 (terendah).",imp:false},
{id:"G2324-29",yr:"Genap 23/24",t:"PCA",q:"PCA merupakan salah satu cara untuk seleksi fitur?",o:["Benar","Salah"],a:1,s:"SALAH! PCA = feature EXTRACTION (membuat fitur BARU = kombinasi linear). Feature SELECTION = pilih subset fitur asli.",imp:true},
{id:"G2324-31",yr:"Genap 23/24",t:"Feature Selection",q:"15 fitur, pilih 10 dgn SBFS. Jumlah eksperimen?",o:["55","60","65","75"],a:2,s:"SBFS mulai dari 15, buang 1 per iterasi:\nIter 1: 15, Iter 2: 14, Iter 3: 13, Iter 4: 12, Iter 5: 11\nTotal = 15+14+13+12+11 = 65",imp:false},
// ═══ UTS GENAP 24/25 ═══
{id:"G2425-2",yr:"Genap 24/25",t:"AI & Agents",q:"Sifat lingkungan agen filter email spam? (pilih semua benar)",o:["Dynamic, Sequential, Continuous","Static, Episodic, Discrete","Fully observable, Static","Partially obs, Dynamic"],a:1,s:"Email spam filter: Static (email tidak berubah saat diproses), Episodic (tiap email independen), Discrete (spam/bukan).",imp:true},
{id:"G2425-7",yr:"Genap 24/25",t:"Preprocessing",q:"Kode pos = nominal → tidak boleh MinMax. Gaji = rasio, nol = tidak punya gaji → tidak perlu imputasi. Mana benar?",o:["Hanya kode pos","Hanya gaji","Keduanya benar","Keduanya salah"],a:2,s:"Keduanya benar!\n1. Kode pos NOMINAL meski angka → OHE, BUKAN scaling.\n2. Gaji=0 bukan missing value, tapi memang tidak punya gaji → tidak perlu imputasi.",imp:true},
{id:"G2425-14",yr:"Genap 24/25",t:"Visualisasi",q:"Colored bubble plot tidak bisa 4 variabel?",o:["Benar","Salah"],a:1,s:"SALAH! Bubble plot: x=var1, y=var2, size=var3, color=var4. Bisa 4 variabel!",imp:false},
{id:"G2425-27",yr:"Genap 24/25",t:"Random Forest",q:"Decision boundary RF 50 tree. Pernyataan PALING TEPAT?",o:["Multilabel classification 3 kelas","Error training lebih besar dari nol","Boundary linear","Boundary random"],a:1,s:"RF 50 tree: error training > 0 (karena random sampling + feature subset). Ini MULTICLASS (bukan multilabel). Boundary non-linear.",imp:true},
{id:"G2425-32",yr:"Genap 24/25",t:"Decision Tree",q:"DT lebih sensitif terhadap noise/outlier dibanding RF?",o:["True","False"],a:0,s:"TRUE. Single DT sangat sensitif karena satu tree bisa berubah drastis dgn perubahan kecil di data. RF mengurangi ini melalui averaging banyak tree.",imp:false},
// ═══ KUIS ROC ESSAY ═══
{id:"K1A-ROC",yr:"Kuis Gasal 24/25",t:"ROC Curve",q:"ROC: threshold 0.1→0.9. Hitung TPR & FPR.\nτ=0.1: TP=45,FP=30,TN=20,FN=5\nτ=0.3: TP=40,FP=15,TN=35,FN=10\nτ=0.5: TP=35,FP=10,TN=40,FN=15\nτ=0.7: TP=28,FP=6,TN=44,FN=22\nτ=0.9: TP=20,FP=3,TN=47,FN=30",o:["Threshold optimal ≈ 0.3","Threshold optimal ≈ 0.5","Threshold optimal ≈ 0.7","Threshold optimal ≈ 0.9"],a:0,s:"TPR: 0.90,0.80,0.70,0.56,0.40\nFPR: 0.60,0.30,0.20,0.12,0.06\n\nThreshold 0.3: TPR=0.80, FPR=0.30 → keseimbangan terbaik.\nPlot dari (0,0)→(0.06,0.40)→(0.12,0.56)→(0.20,0.70)→(0.30,0.80)→(0.60,0.90)→(1,1).",imp:true},
];

// ═══════════════ BANK SOAL COMPONENT ═══════════════

function BankSoalTab({ dark, isMobile }) {
  const [filter, setFilter] = useState("all");
  const [openQ, setOpenQ] = useState(null);
  const [understood, setUnderstood] = useState(() => {
    try { const s = localStorage.getItem("kasdad-bank-understood"); return s ? new Set(JSON.parse(s)) : new Set(); } catch { return new Set(); }
  });
  const [quizMode, setQuizMode] = useState(false);
  const [qi, setQi] = useState(0);
  const [pick, setPick] = useState(null);
  const [showed, setShowed] = useState(false);
  const [score, setScore] = useState({ r: 0, t: 0 });

  const bg = dark ? "#1e293b" : "#ffffff";
  const bg2 = dark ? "#0f172a" : "#f8fafc";
  const border = dark ? "#334155" : "#e2e8f0";
  const fg = dark ? "#e2e8f0" : "#1e293b";
  const fgSub = dark ? "#94a3b8" : "#64748b";
  const ac = "#f59e0b";
  const gn = dark ? "#4ade80" : "#16a34a";
  const rd = dark ? "#fb7185" : "#dc2626";

  const toggleUnderstood = (id) => {
    setUnderstood(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      localStorage.setItem("kasdad-bank-understood", JSON.stringify([...next]));
      return next;
    });
  };

  const years = [...new Set(BANK_SOAL.map(q => q.yr))];
  const filtered = filter === "all" ? BANK_SOAL : filter === "penting" ? BANK_SOAL.filter(q => q.imp) : filter === "belum" ? BANK_SOAL.filter(q => !understood.has(q.id)) : BANK_SOAL.filter(q => q.yr === filter);
  const cq = filtered[qi % Math.max(filtered.length, 1)];

  const topicColor = (t) => BANK_TOPIC_COLORS[t] || "#94a3b8";

  const check = () => { if (pick === null) return; setShowed(true); setScore(s => ({ r: s.r + (pick === cq.a ? 1 : 0), t: s.t + 1 })); };
  const next = () => { setQi(i => (i + 1) % filtered.length); setPick(null); setShowed(false); };

  return (
    <div>
      {/* Stats bar */}
      <div style={{ display: "flex", gap: 8, marginBottom: 12, flexWrap: "wrap", alignItems: "center" }}>
        <div style={{ padding: "6px 12px", borderRadius: 8, background: gn + "15", fontSize: 11, fontWeight: 700, color: gn }}>
          ✅ {understood.size}/{BANK_SOAL.length} paham
        </div>
        <div style={{ padding: "6px 12px", borderRadius: 8, background: rd + "15", fontSize: 11, fontWeight: 700, color: rd }}>
          ❌ {BANK_SOAL.length - understood.size} belum
        </div>
        <div style={{ flex: 1 }} />
        <button onClick={() => { setQuizMode(!quizMode); setQi(0); setPick(null); setShowed(false); setScore({ r: 0, t: 0 }); }} style={{ padding: "6px 14px", borderRadius: 8, border: "none", cursor: "pointer", background: quizMode ? ac : ac + "20", color: quizMode ? "#000" : ac, fontSize: 11, fontWeight: 700, fontFamily: "inherit" }}>
          {quizMode ? "📋 Browse" : "⚡ Quiz Mode"}
        </button>
      </div>

      {/* Progress bar */}
      <div style={{ height: 4, background: border, borderRadius: 4, marginBottom: 12, overflow: "hidden" }}>
        <div style={{ height: "100%", width: `${(understood.size / BANK_SOAL.length) * 100}%`, background: `linear-gradient(90deg, ${gn}, #34d399)`, borderRadius: 4, transition: "width 0.4s" }} />
      </div>

      {/* Filters */}
      <div style={{ display: "flex", gap: 4, marginBottom: 14, overflowX: "auto", paddingBottom: 4 }}>
        {[{ id: "all", label: `Semua (${BANK_SOAL.length})` }, { id: "penting", label: `⭐ Penting (${BANK_SOAL.filter(q => q.imp).length})` }, { id: "belum", label: `❌ Belum paham (${BANK_SOAL.length - understood.size})` }, ...years.map(y => ({ id: y, label: `${y} (${BANK_SOAL.filter(q => q.yr === y).length})` }))].map(f => (
          <button key={f.id} onClick={() => { setFilter(f.id); setQi(0); setPick(null); setShowed(false); }} style={{ padding: "5px 10px", borderRadius: 8, border: `1px solid ${filter === f.id ? ac : border}`, background: filter === f.id ? ac + "15" : "transparent", color: filter === f.id ? ac : fgSub, fontSize: 10, fontWeight: 600, cursor: "pointer", whiteSpace: "nowrap", fontFamily: "inherit", flexShrink: 0 }}>
            {f.label}
          </button>
        ))}
      </div>

      {!quizMode ? (
        /* BROWSE MODE */
        <div>
          {filtered.map((q, i) => (
            <div key={q.id} style={{ marginBottom: 4, borderRadius: 10, overflow: "hidden", background: bg, border: `1px solid ${openQ === i ? ac + "40" : border}`, transition: "all 0.2s" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 6, padding: "10px 12px", cursor: "pointer" }} onClick={() => setOpenQ(openQ === i ? null : i)}>
                {/* Understood checkbox */}
                <button onClick={(e) => { e.stopPropagation(); toggleUnderstood(q.id); }} style={{ width: 22, height: 22, borderRadius: 6, border: `2px solid ${understood.has(q.id) ? gn : border}`, background: understood.has(q.id) ? gn + "20" : "transparent", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, padding: 0 }}>
                  {understood.has(q.id) && <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={gn} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5" /></svg>}
                </button>
                {q.imp && <span style={{ fontSize: 10 }}>⭐</span>}
                <span style={{ fontSize: 9, padding: "2px 6px", borderRadius: 10, background: topicColor(q.t) + "20", color: topicColor(q.t), fontWeight: 700, flexShrink: 0 }}>{q.t}</span>
                <span style={{ fontSize: 9, color: fgSub, flexShrink: 0 }}>{q.yr}</span>
                <span style={{ fontSize: 11, color: fg, flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{q.q.split("\n")[0].slice(0, 55)}</span>
                <span style={{ color: fgSub, fontSize: 10, transition: "transform 0.2s", transform: openQ === i ? "rotate(180deg)" : "" }}>▾</span>
              </div>
              {openQ === i && (
                <div style={{ padding: "0 12px 14px" }}>
                  <div style={{ fontSize: 12, color: fg, lineHeight: 1.8, whiteSpace: "pre-line", marginBottom: 10 }}>{q.q}</div>
                  {q.o.map((o, j) => (
                    <div key={j} style={{ padding: "6px 10px", borderRadius: 7, marginBottom: 2, fontSize: 11, background: j === q.a ? gn + "12" : bg2, border: `1.5px solid ${j === q.a ? gn : border}`, color: j === q.a ? gn : fgSub, fontWeight: j === q.a ? 600 : 400 }}>
                      {o} {j === q.a && " ✓"}
                    </div>
                  ))}
                  <div style={{ marginTop: 10, padding: 12, borderRadius: 10, background: ac + "06", border: `1px solid ${ac}15` }}>
                    <div style={{ fontSize: 9, fontWeight: 700, color: ac, letterSpacing: 1, marginBottom: 4 }}>PEMBAHASAN</div>
                    <div style={{ fontSize: 11, color: fgSub, lineHeight: 1.8, whiteSpace: "pre-line" }}>{q.s}</div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : cq ? (
        /* QUIZ MODE */
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
            <span style={{ fontSize: 10, color: fgSub }}>{(qi % filtered.length) + 1}/{filtered.length}</span>
            {score.t > 0 && <span style={{ fontSize: 10, fontFamily: "monospace", color: score.r / score.t >= 0.7 ? gn : rd }}>{score.r}/{score.t} ({Math.round(score.r / score.t * 100)}%)</span>}
          </div>
          <div style={{ height: 3, background: border, borderRadius: 3, marginBottom: 12 }}><div style={{ height: "100%", width: `${((qi % filtered.length) + 1) / filtered.length * 100}%`, background: ac, borderRadius: 3, transition: "width 0.3s" }} /></div>
          <div style={{ background: bg, borderRadius: 12, padding: 16, border: `1px solid ${border}` }}>
            <div style={{ display: "flex", gap: 4, marginBottom: 8 }}>
              {cq.imp && <span style={{ fontSize: 9, padding: "2px 6px", borderRadius: 10, background: "#ef444420", color: "#ef4444", fontWeight: 700 }}>⭐ PENTING</span>}
              <span style={{ fontSize: 9, padding: "2px 6px", borderRadius: 10, background: topicColor(cq.t) + "20", color: topicColor(cq.t), fontWeight: 700 }}>{cq.t}</span>
              <span style={{ fontSize: 9, color: fgSub }}>{cq.yr}</span>
            </div>
            <div style={{ fontSize: 13, color: fg, lineHeight: 1.8, marginBottom: 14, whiteSpace: "pre-line" }}>{cq.q}</div>
            {cq.o.map((o, j) => {
              const isA = showed && j === cq.a, isW = showed && j === pick && j !== cq.a;
              return (
                <button key={j} onClick={() => !showed && setPick(j)} style={{ display: "block", width: "100%", textAlign: "left", padding: "8px 12px", borderRadius: 8, marginBottom: 3, cursor: showed ? "default" : "pointer", fontSize: 11, fontFamily: "inherit", background: isA ? gn + "15" : isW ? rd + "15" : pick === j ? ac + "08" : bg2, border: `1.5px solid ${isA ? gn : isW ? rd : pick === j ? ac + "40" : border}`, color: isA ? gn : isW ? rd : fg, fontWeight: isA ? 600 : 400 }}>
                  {o} {isA && " ✓"} {isW && " ✗"}
                </button>
              );
            })}
            {showed && (
              <div style={{ marginTop: 10, padding: 12, borderRadius: 10, background: ac + "06", border: `1px solid ${ac}15` }}>
                <div style={{ fontSize: 9, fontWeight: 700, color: ac, letterSpacing: 1, marginBottom: 4 }}>PEMBAHASAN</div>
                <div style={{ fontSize: 11, color: fgSub, lineHeight: 1.8, whiteSpace: "pre-line" }}>{cq.s}</div>
              </div>
            )}
          </div>
          <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
            {showed && <button onClick={() => toggleUnderstood(cq.id)} style={{ flex: 1, padding: 10, borderRadius: 8, border: `1px solid ${understood.has(cq.id) ? gn : border}`, background: understood.has(cq.id) ? gn + "15" : "transparent", color: understood.has(cq.id) ? gn : fgSub, cursor: "pointer", fontSize: 11, fontWeight: 600, fontFamily: "inherit" }}>
              {understood.has(cq.id) ? "✅ Sudah paham" : "Tandai paham"}
            </button>}
            <button onClick={showed ? next : check} disabled={!showed && pick === null} style={{ flex: 1, padding: 10, borderRadius: 8, border: "none", cursor: !showed && pick === null ? "not-allowed" : "pointer", background: !showed && pick === null ? border : ac, color: !showed && pick === null ? fgSub : "#000", fontWeight: 700, fontSize: 12, fontFamily: "inherit" }}>
              {showed ? "Berikutnya →" : "Cek Jawaban"}
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}

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
  try{const{useTabSwipe}=require("@/lib/SwipeNavigationContext");useTabSwipe(["overview","practice","bank","formulas"],tab,setTab);}catch{}
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
    { id: "bank", label: "📦 Bank Soal", desc: `${BANK_SOAL.length} soal UTS` },
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

          {/* BANK SOAL TAB */}
          {tab === "bank" && (
            <div style={{ background:cardBg, borderRadius:16, padding: isMobile ? 16 : 24, border:`1px solid ${border}` }}>
              <h2 style={{ fontSize:18, fontWeight:800, marginBottom:4, color:fg }}>📦 Bank Soal UTS (Multi-Year)</h2>
              <p style={{ color:fgSub, fontSize:12, marginBottom:16 }}>{BANK_SOAL.length} soal dari 5 tahun UTS · Centang yang sudah paham · ⭐ = sering keluar</p>
              <BankSoalTab dark={dark} isMobile={isMobile} />
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
