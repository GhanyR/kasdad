import { useState } from "react";

const TOPICS = [
  {t:"Evaluasi & Metrics",pct:17,cl:"#f43f5e",essay:true,pg:true,what:"Confusion matrix, Precision/Recall/F1/Specificity, ROC curve + AUC, regression metrics (MAE/MSE/R²), cross-validation design",tip:"Hafal rumus dari PENYEBUT: Recall penyebut TP+FN → lihat baris actual+ saja. Precision penyebut TP+FP → lihat kolom predicted+ saja.",trap:"F1 tinggi ≠ specificity tinggi. MAE=2 ≠ semua error ≤2. Hold-out = paling TIDAK akurat."},
  {t:"CART / Decision Tree",pct:14,cl:"#4ade80",essay:true,pg:true,what:"Bangun tree manual (Gini/Entropy), pilih root, hyperparameter pruning, classification vs regression tree",tip:"Asdos: 'Sering muncul sebagai esai UTS, biasanya sampai pembentukan Root.' Step: Gini keseluruhan → Gini per split → weighted → pilih terkecil.",trap:"Gini HANYA classification. Regression = MSE. DT tidak perlu normalisasi. Leaf tidak harus pure (pruning)."},
  {t:"Preprocessing",pct:12,cl:"#34d399",essay:false,pg:true,what:"Encoding (OHE vs Label vs Frequency vs Target), normalisasi (MinMax vs Z-score), imputasi (mean/median/mode/KNN), outlier detection",tip:"KNN imputation: fitur target JANGAN masuk distance calculation. Kode pos = NOMINAL meski angka → OHE bukan scaling.",trap:"Mean imputasi + outlier = BURUK → pakai median. MinMax TIDAK hilangkan outlier. OHE menambah kolom."},
  {t:"KNN",pct:11,cl:"#38bdf8",essay:true,pg:true,what:"Full pipeline: encoding → normalisasi → hitung jarak → K terdekat → majority vote / average",tip:"3 distance metrics: Manhattan Σ|xᵢ−yᵢ|, Euclidean √Σ(xᵢ−yᵢ)², Cosine A·B/(‖A‖·‖B‖). KNN = lazy learner (no training phase).",trap:"KNN ≠ centroid (itu K-Means!). KNN WAJIB normalisasi. K kecil=overfit, K besar=underfit."},
  {t:"PCA",pct:10,cl:"#c084fc",essay:true,pg:true,what:"Eigenvalue → explained variance → pilih PC, covariance matrix size, PCA transformation, dimensi vs EV",tip:"Asdos tip: eigenvector matrix ortogonal → inverse = TRANSPOSE (shortcut). Tapi kalo soal kasih raw data, harus hitung eigen sendiri.",trap:"EV ≠ dimensi reduksi (1/4 PC = 25% dimensi, BUKAN 73%). Cov matrix = m×m BUKAN n×m."},
  {t:"EDA & Statistik",pct:9,cl:"#fbbf24",essay:false,pg:true,what:"IQR, outlier detection, mean vs median, skewness, Pearson correlation, boxplot/histogram insight",tip:"IQR = Q3−Q1. Outlier: di luar [Q1−1.5·IQR, Q3+1.5·IQR]. Mean>Median = right-skewed.",trap:"Pearson r≈0 ≠ tidak ada hubungan (bisa nonlinear kuat). |r| yang dilihat, bukan r."},
  {t:"Bias-Variance",pct:7,cl:"#fb923c",essay:false,pg:true,what:"Overfit vs underfit identification, Error = Bias²+Var+ε, learning curves, regularisasi",tip:"Train 98% test 70% = OVERFITTING. Train 60% test 55% = UNDERFITTING. Bagging↓var. Boosting↓bias.",trap:"Menambah depth tree = MEMPERBURUK overfitting. Menambah data = membantu kurangi overfit."},
  {t:"Random Forest & Ensemble",pct:7,cl:"#22c55e",essay:false,pg:true,what:"Bagging (bootstrap WITH replacement), RF vs DT, RF feature importance, boosting (sequential)",tip:"RF: random feature subset per SPLIT (bukan per tree). RF tidak perlu normalisasi. RF↓variance vs DT.",trap:"Bootstrap = DENGAN pengembalian. Boosting TIDAK bisa paralel. RF prediction: cls=vote, reg=mean."},
  {t:"Naive Bayes",pct:5,cl:"#a78bfa",essay:true,pg:true,what:"Bayes theorem, conditional independence, Gaussian NB, Laplace smoothing, zero-frequency problem",tip:"BARU semester ini. P(C|X) ∝ ΠP(xᵢ|C)·P(C). Fitur tak disebut di query → jangan masukkan ke hitungan.",trap:"Conditionally independent (bukan unconditionally). P(x|C)=0 → semua posterior=0 → pakai Laplace."},
  {t:"AI & Agents",pct:5,cl:"#e879f9",essay:false,pg:true,what:"4 perspektif AI, PEAS framework, 5 tipe agen, 7 sifat environment",tip:"Sensor = alat observasi. Actuator = alat bertindak. Performance diukur pada LINGKUNGAN bukan internal.",trap:"Acting rationally ≠ rule sederhana. Tic-tac-toe = DETERMINISTIC. Known ≠ fully observable."},
  {t:"Search Algorithms",pct:4,cl:"#67e8f9",essay:false,pg:true,what:"BFS, DFS, UCS, A*, heuristic admissible/consistent, state space modeling",tip:"A*: f(n)=g(n)+h(n). UCS = A* dengan h=0. BFS optimal HANYA jika step cost sama.",trap:"DFS TIDAK complete (infinite loop). BFS space O(b^d) mahal. Consistent → Admissible tapi not vice versa."},
  {t:"Imbalanced Classification",pct:3,cl:"#ef4444",essay:false,pg:true,what:"SMOTE, cost-sensitive learning, class weights, metric choice",tip:"SMOTE hanya di TRAINING data (setelah split). Akurasi misleading pada imbalanced → pakai F1/Recall.",trap:"SMOTE sebelum split = DATA LEAKAGE. Tomek Links = undersampling majority."},
];

const ESSAYS = [
  {title:"Bangun Decision Tree (CART)",prob:98,icon:"🌳",cl:"#4ade80",why:"Asdos: 'Sering muncul sebagai esai UTS dan Kuis 1, biasanya sampai pembentukan Root.' Muncul di SETIAP UTS sejak 2021.",steps:["Hitung Gini(S) keseluruhan: Gini = 1 − Σpᵢ²","Siapkan kandidat split per fitur:\n  • Kategorik: setiap nilai unik → kandidat\n  • Numerik: midpoint antara nilai berurutan","Hitung weighted Gini setiap split:\n  Gini_split = Σ(|Sⱼ|/|S|) × Gini(Sⱼ)","Pilih split dengan weighted Gini TERKECIL → jadi root","Ulangi rekursif untuk child nodes sampai pure atau stopping criterion","DT TIDAK perlu encoding — bisa handle kategorikal langsung","Jika soal minta regression tree: ganti Gini dengan MSE, prediksi leaf = MEAN"],history:"2021: 8 baris, 3 fitur. 2022: Titanic. 2023: Alien/Manusia 10 baris. Gasal 24/25: classification + regression."},
  {title:"KNN: Preprocessing + Prediksi",prob:92,icon:"📍",cl:"#38bdf8",why:"Setiap tahun muncul dengan variasi: imputation (21, 22, 23/24), classification (Gasal 23/24), regression (Genap 23/24). Full pipeline selalu ditanyakan.",steps:["Step 1 — Encode kategorikal:\n  • Nominal → One-Hot Encoding\n  • Ordinal → Label Encoding\n  • Binary → 0/1","Step 2 — Normalisasi SEMUA fitur numerik:\n  • MinMax = (x−min)/(max−min)\n  • Z-score = (x−μ)/σ","Step 3 — Hitung jarak ke SEMUA training data:\n  ⚠️ Fitur yang ingin DIPREDIKSI jangan masuk distance!","Step 4 — Sort jarak ascending, ambil K terdekat","Step 5 — Prediksi:\n  • Classification → majority vote\n  • Regression → average\n  • Imputation → nilai dari nearest neighbor","Diskusikan efek K: K=1 high variance, K=N high bias"],history:"3 variasi KNN imputation: Ganjil 21/22 (Manhattan), Gasal 22/23 (Euclidean), Genap 23/24 (Manhattan). Gasal 23/24: full pipeline."},
  {title:"Naive Bayes Classification",prob:85,icon:"🎲",cl:"#a78bfa",why:"BARU semester ini. Asistensi punya 6 latihan + 9 slide WS4. Heavy emphasis = high chance essay.",steps:["Hitung prior: P(C) = count(class C) / total data","Fitur kategorikal: P(xᵢ|C) = count(xᵢ AND C) / count(C)","Fitur numerik (Gaussian):\n  P(x|C) = (1/σ√2π) × e^(−(x−μ)²/2σ²)\n  Hitung μ dan σ PER KELAS","Kalikan semua: P(C|X) ∝ P(C) × ΠP(xᵢ|C)","Bandingkan antar kelas → pilih yang terbesar","⚠️ ZERO FREQUENCY: P(xᵢ|C)=0 → semua jadi 0!\n  Solusi: Laplace: (count+1)/(N+|V|)","Fitur yang TIDAK disebut di query → jangan masukkan"],history:"NB muncul di UAS 22/23, 23/24, 24/25 (Gasal). Pertama kali bisa muncul di UTS semester ini."},
  {title:"Confusion Matrix + ROC Curve",prob:75,icon:"📋",cl:"#f43f5e",why:"Muncul sebagai essay 2021, 2022, 2023. Kuis Gasal 24/25 juga ada ROC.",steps:["Tentukan kelas POSITIF dulu (yang langka/penting)","Dari narasi → isi TP, TN, FP, FN","Hitung metrics:\n  Acc=(TP+TN)/N, Prec=TP/(TP+FP)\n  Rec=TP/(TP+FN), Spec=TN/(TN+FP)\n  F1=2PR/(P+R)","ROC: per threshold τ, hitung TPR dan FPR:\n  TPR = TP/(TP+FN), FPR = FP/(FP+TN)","Plot (FPR, TPR) dari threshold tertinggi ke terendah","AUC = luas di bawah kurva","Threshold optimal = titik paling dekat ke (0,1)"],history:"2021: CM dgn NPM. 2022: fraud 12 transaksi + ROC 4 threshold. 2023: email spam 1000 data."},
  {title:"PCA Computation",prob:65,icon:"🎯",cl:"#c084fc",why:"Asdos mengklarifikasi detail komputasi. Sinyal soal hitungan PCA.",steps:["CASE 1 — Eigenvalues diberikan:\n  • EV = λᵢ/Σλ × 100%\n  • Kumulatif → pilih k PC","CASE 2 — Raw data diberikan:\n  1. Center: xᵢ − mean\n  2. Cov matrix (m×m)\n  3. det(C−λI) = 0 → eigenvalues\n  4. Eigenvectors per λ\n  5. Sort descending\n  6. T = transpose(eigenvector matrix)\n  7. Proyeksi: T × data_centered","SHORTCUT: eigenvector ortogonal → inverse = TRANSPOSE","Bedakan DIMENSI vs EV:\n  1 PC dari 4 = 25% dimensi, bukan 73%!"],history:"Genap 24/25: eigenvalue table 10 fitur. Gasal 25/26: transformation + orthogonal."},
];

const TRAPS = [
  {t:"EV ≠ Dimensi Reduksi",d:"1 PC dari 4 = 25% dimensi. 73% itu EV (informasi), BUKAN dimensi!",rate:"60%+",cl:"#ef4444"},
  {t:"F1 tinggi ≠ Specificity tinggi",d:"F1 hanya P & R. Specificity = TN/(TN+FP) terpisah.",rate:"70%+",cl:"#ef4444"},
  {t:"MSE beda skala ≠ comparable",d:"Raw MSE=1150 vs normalized MSE=0.9 → TIDAK bisa dibandingkan.",rate:"55%+",cl:"#f59e0b"},
  {t:"DT tidak terpengaruh standarisasi",d:"Ubah skala bukan urutan → split SAMA → prediksi SAMA.",rate:"55%+",cl:"#ef4444"},
  {t:"KNN ≠ centroid-based",d:"KNN = jarak ke SEMUA data. Centroid = K-MEANS!",rate:"Klasik",cl:"#f59e0b"},
  {t:"Gini HANYA classification",d:"Regression tree = MSE/variance reduction.",rate:"Klasik",cl:"#f59e0b"},
  {t:"Cov matrix = m×m",d:"PCA diagonalisasi cov (fitur×fitur). BUKAN data n×m.",rate:"40%+",cl:"#ef4444"},
  {t:"SMOTE hanya di training",d:"Split dulu → SMOTE di train saja. Sebelum split = leakage.",rate:"Penting",cl:"#f59e0b"},
  {t:"NB: P(x|C)=0 → semua 0",d:"Satu nol = semua nol. Laplace: (count+1)/(N+|V|).",rate:"Baru",cl:"#ef4444"},
  {t:"KNN imputation: target ≠ masuk distance",d:"Fitur yang diprediksi JANGAN masuk perhitungan jarak.",rate:"Penting",cl:"#ef4444"},
  {t:"Bootstrap = DENGAN pengembalian",d:"Bisa duplikat. Boosting TIDAK bisa paralel.",rate:"Klasik",cl:"#f59e0b"},
  {t:"Pearson r≈0 ≠ tidak ada hubungan",d:"Bisa nonlinear kuat. Pearson hanya deteksi LINEAR.",rate:"40%+",cl:"#ef4444"},
];

const DECISION_TABLE = [
  ["Prediksi harga rumah","Regression","Bukan classification (kontinu)"],
  ["EV=73%, 1 dari 4 PC","Dimensi = 25%","Bukan 73% (itu EV)"],
  ["DT perlu normalisasi?","TIDAK","Threshold-based"],
  ["KNN perlu normalisasi?","YA, WAJIB","Distance-based"],
  ["RF perlu normalisasi?","TIDAK","Threshold-based"],
  ["Gini untuk regression?","TIDAK","Gini = classification. Regression = MSE"],
  ["Bootstrap sampling?","DENGAN pengembalian","Bisa duplikat"],
  ["F1 tinggi → spec tinggi?","TIDAK pasti","F1 hanya P & R"],
  ["Cov matrix PCA?","m × m (fitur)","Bukan n × m"],
  ["SMOTE kapan?","Setelah split, train only","Sebelum = leakage"],
  ["NB: P(x|C)=0?","Posterior = 0","Laplace smoothing"],
  ["PCA inverse eigvec?","TRANSPOSE","Karena ortogonal"],
  ["Boosting vs Bagging?","Boost↓bias, Bag↓var","Jangan terbalik!"],
];

const FORMULAS = [
  {t:"📊 Statistik",cl:"#fbbf24",f:["IQR = Q3−Q1","Outlier: <Q1−1.5·IQR or >Q3+1.5·IQR","Right-skew: Mean > Median","Var = Σ(xᵢ−μ)²/n","Std = √Var"]},
  {t:"🔄 Scaling",cl:"#34d399",f:["MinMax = (x−min)/(max−min)","Z-score = (x−μ)/σ","Below mean → Z negatif"]},
  {t:"📐 Distance",cl:"#60a5fa",f:["Manhattan = Σ|xᵢ−yᵢ|","Euclidean = √Σ(xᵢ−yᵢ)²","Cosine = A·B/(‖A‖·‖B‖)","Jaccard = |A∩B|/|A∪B|"]},
  {t:"🌳 CART",cl:"#4ade80",f:["Gini = 1−Σpᵢ²","Entropy = −Σpᵢ·log₂pᵢ","IG = H(parent)−Σwⱼ·H(childⱼ)","Regression: MSE split"]},
  {t:"🎯 Metrics",cl:"#f43f5e",f:["Prec = TP/(TP+FP)","Rec = TP/(TP+FN)","Spec = TN/(TN+FP)","F1 = 2PR/(P+R)","Acc = (TP+TN)/N","FPR = 1−Spec"]},
  {t:"📉 Regression",cl:"#fb923c",f:["MAE = Σ|yᵢ−ŷᵢ|/n","MSE = Σ(yᵢ−ŷᵢ)²/n","R² = 1−SS_res/SS_tot"]},
  {t:"🎯 PCA",cl:"#c084fc",f:["EV = λᵢ/Σλ","CumEV = Σλ₁..ₖ/Σλ","Cov = m×m","T = transpose(eigvecs)"]},
  {t:"🌲 Ensemble",cl:"#22c55e",f:["RF cls = vote","RF reg = mean","Bag→↓Var","Boost→↓Bias"]},
  {t:"🎲 NB",cl:"#a78bfa",f:["P(C|X) ∝ ΠP(xᵢ|C)·P(C)","Gaussian: (1/σ√2π)·e^(−(x−μ)²/2σ²)","Laplace: (count+1)/(N+|V|)"]},
  {t:"⚖️ Bias-Var",cl:"#fbbf24",f:["Error = Bias²+Var+ε","Overfit: train≫test","Underfit: both low"]},
  {t:"🔍 Search",cl:"#67e8f9",f:["A*: f=g+h","Admissible: h≤h*","Consistent: h≤c+h'","UCS = A* h=0"]},
];

const MODEL_CMP = [
  ["Normalisasi","❌","❌","✅ WAJIB","❌"],
  ["Encoding","❌","❌","✅ WAJIB","Frekuensi"],
  ["Outlier","⚠️","✅ Robust","⚠️","✅ Robust"],
  ["Interpretable","✅","❌","❌","✅"],
  ["Feat Selection","✅ implicit","✅","❌","❌"],
  ["Lazy learner","❌","❌","✅","❌"],
  ["Bias/Variance","Low B High V","Low B Low V","Depends K","High B Low V"],
];

export default function ExamIntel(){
  const [dark,setDark]=useState(true);
  const [tab,setTab]=useState("intel");
  const [eo,setEo]=useState(null);
  const [to,setTo]=useState(null);
  const D=dark;
  const bg=D?"#06060a":"#f5f3ee",bg2=D?"#0d0d15":"#fff",bg3=D?"#14141e":"#ebe8e0";
  const bd=D?"#1e1e30":"#d8d4ca",t1=D?"#eeeef4":"#1a1816",t2=D?"#b0b0c8":"#4a4840",t3=D?"#6a6a88":"#8a8880";
  const ac="#dba830",gn=D?"#51cf66":"#16a34a",rd=D?"#ff6b6b":"#dc2626";
  const tabs=[{id:"intel",l:"🎯 Intel"},{id:"essay",l:"📝 Essay"},{id:"traps",l:"💀 Traps"},{id:"formulas",l:"📐 Rumus"}];

  return <div style={{minHeight:"100vh",background:bg,color:t1,fontFamily:"'Segoe UI',-apple-system,sans-serif",transition:"all .3s",overflowX:"hidden"}}>
    <style>{`@keyframes fi{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:none}}@keyframes gp{0%,100%{opacity:1}50%{opacity:.4}}*{box-sizing:border-box;margin:0;padding:0}::-webkit-scrollbar{width:4px}::-webkit-scrollbar-thumb{background:${bd};border-radius:8px}`}</style>
    <div style={{maxWidth:860,margin:"0 auto",padding:"0 18px"}}>
      <header style={{padding:"28px 0 0",animation:"fi .5s both"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <div>
            <div style={{display:"flex",alignItems:"center",gap:6}}>
              <div style={{width:5,height:5,borderRadius:"50%",background:ac,boxShadow:"0 0 10px "+ac+"60",animation:"gp 2s infinite"}}/>
              <span style={{fontFamily:"monospace",fontSize:8,color:t3,letterSpacing:2}}>KASDAD · GENAP 25/26</span>
            </div>
            <h1 style={{fontSize:"clamp(28px,6vw,40px)",fontWeight:300,lineHeight:1.08,marginTop:6}}>
              Exam <span style={{fontWeight:800,fontStyle:"italic",background:"linear-gradient(135deg,"+ac+",#f59e0b)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>Intel</span>
            </h1>
          </div>
          <button onClick={()=>setDark(!dark)} style={{width:38,height:38,borderRadius:11,cursor:"pointer",background:bg2,border:"1px solid "+bd,fontSize:15,display:"flex",alignItems:"center",justifyContent:"center"}}>{D?"🌙":"☀️"}</button>
        </div>
        <p style={{fontSize:10,color:t3,marginTop:6}}>5 tahun UTS · asistensi PDF · asdos tips · {TOPICS.length} topik · {ESSAYS.length} prediksi essay</p>
        <nav style={{display:"flex",gap:2,background:bg2,borderRadius:11,padding:3,border:"1px solid "+bd,marginTop:16,overflowX:"auto"}}>
          {tabs.map(tb=><button key={tb.id} onClick={()=>setTab(tb.id)} style={{flex:1,padding:"10px 6px",borderRadius:9,border:"none",cursor:"pointer",whiteSpace:"nowrap",background:tab===tb.id?ac+"10":"transparent",color:tab===tb.id?t1:t3,fontSize:11,fontWeight:tab===tb.id?700:400,fontFamily:"inherit"}}>{tb.l}</button>)}
        </nav>
      </header>

      <main style={{padding:"20px 0 60px"}}>
        {tab==="intel"&&<div style={{animation:"fi .3s both"}}>
          <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:6,marginBottom:20}}>
            {[{l:"Format",v:"60+40",s:"PG + Essay",c:"#f59e0b"},{l:"Waktu",v:"150'",s:"2.5 jam",c:"#60a5fa"},{l:"Notes",v:"8 hal",s:"A4 open",c:"#34d399"},{l:"Calc",v:"Boleh",s:"Scientific",c:"#a78bfa"}].map((s,i)=>
              <div key={i} style={{background:bg2,borderRadius:10,padding:"10px 8px",border:"1px solid "+bd,borderTop:"2.5px solid "+s.c,textAlign:"center"}}>
                <div style={{fontFamily:"monospace",fontSize:7,color:t3,letterSpacing:1}}>{s.l}</div>
                <div style={{fontSize:17,fontWeight:800,color:s.c}}>{s.v}</div>
                <div style={{fontSize:8,color:t3}}>{s.s}</div>
              </div>)}
          </div>
          <div style={{fontFamily:"monospace",fontSize:7,color:t3,letterSpacing:2,marginBottom:8}}>TOPIC WEIGHT</div>
          <div style={{background:bg2,borderRadius:12,padding:14,border:"1px solid "+bd,marginBottom:20}}>
            {TOPICS.map((p,i)=><div key={i} style={{display:"flex",alignItems:"center",gap:8,marginBottom:i<TOPICS.length-1?7:0}}>
              <div style={{width:105,fontSize:10,fontWeight:600,color:t2,flexShrink:0}}>{p.t}</div>
              <div style={{flex:1,height:16,background:bg3,borderRadius:4,overflow:"hidden",position:"relative"}}>
                <div style={{height:"100%",width:Math.min(p.pct*5.5,100)+"%",background:"linear-gradient(90deg,"+p.cl+"88,"+p.cl+"44)",borderRadius:4}}/>
                <span style={{position:"absolute",right:4,top:2,fontFamily:"monospace",fontSize:8,color:t3}}>{p.pct}%</span>
              </div>
              <div style={{display:"flex",gap:2,flexShrink:0}}>
                {p.essay&&<span style={{fontSize:6,fontWeight:700,color:"#f43f5e",padding:"1px 4px",borderRadius:8,background:"#f43f5e12",border:"1px solid #f43f5e22"}}>ESSAY</span>}
                {p.pg&&<span style={{fontSize:6,fontWeight:700,color:"#60a5fa",padding:"1px 4px",borderRadius:8,background:"#60a5fa12",border:"1px solid #60a5fa22"}}>PG</span>}
              </div>
            </div>)}
          </div>
          <div style={{fontFamily:"monospace",fontSize:7,color:t3,letterSpacing:2,marginBottom:8}}>TIME STRATEGY</div>
          <div style={{background:bg2,borderRadius:12,border:"1px solid "+bd,overflow:"hidden",marginBottom:20}}>
            {[{t:"0–50'",task:"30 PG/BS",tip:"Yang yakin dulu. Flag ragu. Skip >2min/soal.",cl:"#34d399"},{t:"50–70'",task:"Review PG",tip:"Kembali ke flagged. Cek hitungan.",cl:"#fbbf24"},{t:"70–130'",task:"4–5 Essay",tip:"Tulis RUMUS dulu, baru hitung. Tunjukkan SEMUA langkah.",cl:"#f43f5e"},{t:"130–150'",task:"Final",tip:"Semua sub-soal terjawab? Nama+NPM?",cl:"#a78bfa"}].map((s,i)=><div key={i} style={{display:"flex",alignItems:"center",gap:10,padding:"10px 14px",borderBottom:i<3?"1px solid "+bd:"none"}}>
              <div style={{width:3,height:28,borderRadius:2,background:s.cl,flexShrink:0}}/>
              <div style={{minWidth:60}}><div style={{fontFamily:"monospace",fontSize:9,fontWeight:700,color:s.cl}}>{s.t}</div><div style={{fontSize:11,fontWeight:700,color:t1}}>{s.task}</div></div>
              <div style={{fontSize:10,color:t3,lineHeight:1.5}}>{s.tip}</div>
            </div>)}
          </div>
          <div style={{fontFamily:"monospace",fontSize:7,color:t3,letterSpacing:2,marginBottom:8}}>DETAIL PER TOPIK</div>
          {TOPICS.map((p,i)=><div key={i} style={{marginBottom:3,borderRadius:10,overflow:"hidden",background:bg2,border:"1px solid "+(to===i?p.cl+"30":bd)}}>
            <div onClick={()=>setTo(to===i?null:i)} style={{padding:"10px 14px",cursor:"pointer",display:"flex",alignItems:"center",gap:8}}>
              <div style={{width:3,height:24,borderRadius:2,background:p.cl,flexShrink:0}}/><span style={{fontSize:12,fontWeight:700,color:p.cl,flex:1}}>{p.t}</span><span style={{fontFamily:"monospace",fontSize:9,color:t3}}>{p.pct}%</span><span style={{color:t3,fontSize:9,transition:"transform .2s",transform:to===i?"rotate(180deg)":"none"}}>▾</span>
            </div>
            {to===i&&<div style={{padding:"0 14px 12px 25px",animation:"fi .2s both"}}>
              <div style={{fontSize:10,color:t2,lineHeight:1.7,marginBottom:6}}><strong style={{color:t1}}>Cakupan:</strong> {p.what}</div>
              <div style={{fontSize:10,color:ac,lineHeight:1.7,marginBottom:6}}>💡 {p.tip}</div>
              <div style={{fontSize:10,color:rd,lineHeight:1.7}}>⚠️ {p.trap}</div>
            </div>}
          </div>)}
        </div>}

        {tab==="essay"&&<div style={{animation:"fi .3s both"}}>
          <div style={{padding:"10px 14px",borderRadius:10,marginBottom:16,background:ac+"08",border:"1px solid "+ac+"18"}}><span style={{fontSize:12,color:t1}}>Essay = <strong style={{color:ac}}>40 pts</strong> (40% total). Partial credit → tunjukkan SEMUA langkah!</span></div>
          {ESSAYS.map((e,i)=><div key={i} style={{marginBottom:4,borderRadius:12,overflow:"hidden",background:bg2,border:"1px solid "+(eo===i?e.cl+"30":bd)}}>
            <div onClick={()=>setEo(eo===i?null:i)} style={{padding:"14px 16px",cursor:"pointer",display:"flex",alignItems:"center",gap:12}}>
              <span style={{fontSize:24}}>{e.icon}</span>
              <div style={{flex:1}}><div style={{fontSize:13,fontWeight:700,color:t1}}>{e.title}</div><div style={{fontSize:9,color:t3,marginTop:2}}>{e.why.slice(0,80)}...</div></div>
              <div style={{textAlign:"right",flexShrink:0}}><div style={{fontFamily:"monospace",fontSize:20,fontWeight:800,color:e.cl}}>{e.prob}%</div><div style={{fontFamily:"monospace",fontSize:7,color:t3}}>PROB</div></div>
              <span style={{color:t3,fontSize:9,transition:"transform .2s",transform:eo===i?"rotate(180deg)":"none"}}>▾</span>
            </div>
            {eo===i&&<div style={{padding:"0 16px 16px",animation:"fi .2s both"}}>
              <div style={{padding:10,borderRadius:8,background:e.cl+"06",border:"1px solid "+e.cl+"12",marginBottom:12}}>
                <div style={{fontFamily:"monospace",fontSize:7,color:e.cl,letterSpacing:1.5,marginBottom:4}}>KENAPA DIPREDIKSI KELUAR?</div>
                <div style={{fontSize:11,color:t2,lineHeight:1.6}}>{e.why}</div>
              </div>
              <div style={{fontFamily:"monospace",fontSize:7,color:e.cl,letterSpacing:2,marginBottom:6}}>STEP-BY-STEP</div>
              {e.steps.map((s,j)=><div key={j} style={{display:"flex",gap:8,marginBottom:5}}><span style={{fontFamily:"monospace",fontSize:9,color:e.cl,fontWeight:700,flexShrink:0,marginTop:1}}>{j+1}.</span><span style={{fontSize:11,color:t2,lineHeight:1.65,whiteSpace:"pre-line"}}>{s}</span></div>)}
              <div style={{marginTop:10,padding:10,borderRadius:8,background:bg3,border:"1px solid "+bd}}><div style={{fontFamily:"monospace",fontSize:7,color:t3,letterSpacing:1.5,marginBottom:4}}>📋 HISTORY</div><div style={{fontSize:10,color:t2,lineHeight:1.6}}>{e.history}</div></div>
            </div>}
          </div>)}
        </div>}

        {tab==="traps"&&<div style={{animation:"fi .3s both"}}>
          <div style={{padding:"10px 14px",borderRadius:10,marginBottom:16,background:rd+"08",border:"1px solid "+rd+"18"}}><span style={{fontSize:12,color:t1}}>💀 {TRAPS.length} jebakan paling sering SALAH!</span></div>
          {TRAPS.map((tr,i)=><div key={i} style={{background:bg2,borderRadius:10,padding:"12px 14px",border:"1px solid "+bd,borderLeft:"3px solid "+tr.cl,marginBottom:3}}>
            <div style={{display:"flex",justifyContent:"space-between",gap:8}}>
              <div><div style={{fontSize:12,fontWeight:700,color:t1}}>{tr.t}</div><div style={{fontSize:10,color:t2,lineHeight:1.6,marginTop:3}}>{tr.d}</div></div>
              <span style={{fontSize:7,fontWeight:700,color:tr.cl,padding:"2px 6px",borderRadius:8,background:tr.cl+"12",border:"1px solid "+tr.cl+"22",whiteSpace:"nowrap",flexShrink:0,height:"fit-content"}}>{tr.rate}</span>
            </div>
          </div>)}
          <div style={{fontFamily:"monospace",fontSize:7,color:t3,letterSpacing:2,marginTop:20,marginBottom:8}}>QUICK DECISION TABLE</div>
          <div style={{background:bg2,borderRadius:10,border:"1px solid "+bd,overflow:"auto"}}>
            <table style={{width:"100%",borderCollapse:"collapse",fontSize:10}}>
              <thead><tr style={{background:bg3}}>{["Situasi","Jawaban","Jangan Terjebak"].map(h=><th key={h} style={{padding:"7px 10px",textAlign:"left",color:t3,fontSize:8,fontWeight:700,borderBottom:"1px solid "+bd}}>{h}</th>)}</tr></thead>
              <tbody>{DECISION_TABLE.map((r,i)=><tr key={i}><td style={{padding:"5px 10px",color:t2,borderBottom:"1px solid "+bd+"15"}}>{r[0]}</td><td style={{padding:"5px 10px",color:gn,fontWeight:600,borderBottom:"1px solid "+bd+"15"}}>{r[1]}</td><td style={{padding:"5px 10px",color:rd,fontSize:9,borderBottom:"1px solid "+bd+"15"}}>{r[2]}</td></tr>)}</tbody>
            </table>
          </div>
        </div>}

        {tab==="formulas"&&<div style={{animation:"fi .3s both"}}>
          {FORMULAS.map((g,gi)=><div key={gi} style={{marginBottom:10}}>
            <div style={{fontFamily:"monospace",fontSize:8,color:g.cl,fontWeight:700,letterSpacing:1.5,marginBottom:4}}>{g.t}</div>
            <div style={{display:"flex",flexWrap:"wrap",gap:3}}>{g.f.map((f,fi)=><code key={fi} style={{fontFamily:"monospace",fontSize:10,color:t2,background:bg2,border:"1px solid "+bd,padding:"5px 10px",borderRadius:6}}>{f}</code>)}</div>
          </div>)}
          <div style={{fontFamily:"monospace",fontSize:7,color:t3,letterSpacing:2,marginTop:16,marginBottom:6}}>MODEL COMPARISON</div>
          <div style={{background:bg2,borderRadius:10,border:"1px solid "+bd,overflow:"auto"}}>
            <table style={{width:"100%",borderCollapse:"collapse",fontSize:10}}>
              <thead><tr style={{background:bg3}}>{["","DT","RF","KNN","NB"].map(h=><th key={h} style={{padding:"6px 8px",textAlign:h?"center":"left",color:t3,fontSize:9,fontWeight:700,borderBottom:"1px solid "+bd}}>{h}</th>)}</tr></thead>
              <tbody>{MODEL_CMP.map((r,ri)=><tr key={ri}>{r.map((c,ci)=><td key={ci} style={{padding:"5px 8px",textAlign:ci?"center":"left",fontSize:ci?10:9,fontWeight:ci?400:600,color:ci?t2:t3,borderBottom:"1px solid "+bd+"15"}}>{c}</td>)}</tr>)}</tbody>
            </table>
          </div>
          <div style={{fontFamily:"monospace",fontSize:7,color:ac,letterSpacing:2,marginTop:20,marginBottom:6}}>💡 ASDOS TIPS</div>
          <div style={{background:bg2,borderRadius:10,padding:14,border:"1px solid "+ac+"20"}}>
            {["PCA: eigenvector ortogonal → inverse = TRANSPOSE","PCA: raw data → harus hitung eigen sendiri","KNN imputation: fitur target JANGAN masuk distance","CART essay: biasanya sampai ROOT saja","SMOTE: SETELAH split, training only","Recall: penyebut = baris actual+. Precision: penyebut = kolom predicted+."].map((tip,i)=><div key={i} style={{display:"flex",gap:8,marginBottom:i<5?6:0}}>
              <span style={{fontFamily:"monospace",fontSize:9,color:ac,fontWeight:700,flexShrink:0}}>•</span>
              <span style={{fontSize:11,color:t2,lineHeight:1.6}}>{tip}</span>
            </div>)}
          </div>
        </div>}
      </main>
    </div>
  </div>;
}
