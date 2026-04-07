# KASDAD — Kecerdasan Artifisial & Sains Data Dasar
## Rangkuman Lengkap Seluruh Materi UTS
### CSGE603130 · Genap 2025/2026 · Fasilkom UI

> File ini berisi SEMUA konten dari website KASDAD (kasdad-web.vercel.app) — materi, contoh soal, pembahasan, rumus, dan jebakan UTS.

---


---

Now I have all the content. Here is the complete markdown extraction:

## Materi 1: Kecerdasan Artifisial
**KASDAD - Week 1**

---

## 4 Definisi Kecerdasan Artifisial

Russell & Norvig membagi definisi AI berdasarkan 2 dimensi: Thinking vs Acting, dan Humanly vs Rationally

|  | Human-Like | Rational |
|---|---|---|
| **Thought** | Cognitive Modeling | Laws of Thought |
| **Behavior** | Turing Test | Rational Agent |

### Thinking Humanly - Cognitive Modeling
- **Tokoh:** Haugeland 1985, Bellman 1978
- **Pertanyaan Inti:** Bagaimana membuat komputer berpikir seperti manusia?
- **Pendekatan:** Untuk menjawab ini, kita harus tahu dulu bagaimana manusia berpikir. Caranya lewat introspeksi (mengamati pikiran sendiri), eksperimen psikologi (observasi perilaku), dan brain imaging (scan otak).
- **Bidang Terkait:** Cognitive Science = gabungan model AI + psikologi eksperimental → membangun teori tentang cara kerja akal manusia
- **Contoh Nyata:** Convolutional Neural Networks (CNN) terinspirasi dari cara visual cortex otak memproses gambar — neuron di otak merespons area kecil (receptive field), CNN meniru ini dengan filter.
- **Kritik / Kelemahan:** Kita belum sepenuhnya paham cara manusia berpikir, jadi sulit menjadikan itu standar.

### Thinking Rationally - Laws of Thought
- **Tokoh:** Charniak & McDermott 1985, Winston 1992
- **Pertanyaan Inti:** Bagaimana membuat komputer berpikir secara logis dan benar?
- **Pendekatan:** Pakai logika formal — penalaran yang tak terbantahkan. Jika premis benar dan aturan benar, kesimpulan PASTI benar.
- **Bidang Terkait:** Classical logic (proposisional, first-order), probabilistic logic untuk menangani ketidakpastian
- **Contoh Nyata:** Modus Ponens: Jika hujan → jalan basah. Sekarang hujan. Maka: jalan basah. Ini 100% valid secara logika.
- **Kritik / Kelemahan:** 3 masalah: (1) Manusia sering TIDAK rasional, (2) Tidak semua pengetahuan bisa ditulis dalam logika formal, (3) Tidak scalable — terlalu lambat untuk masalah besar.

### Acting Humanly - Turing Test
- **Tokoh:** Kurzweil 1990, Rich & Knight 1991
- **Pertanyaan Inti:** Bisakah mesin berperilaku sehingga tidak bisa dibedakan dari manusia?
- **Pendekatan:** Turing Test: seorang tester bertanya ke mesin dan manusia lewat teks. Jika tester tidak bisa bedakan mana mesin, mesin itu "cerdas".
- **Bidang Terkait:** Untuk lulus perlu: NLP (komunikasi), knowledge representation (simpan pengetahuan), automated reasoning, machine learning. Total Turing Test tambah: computer vision + robotika.
- **Contoh Nyata:** Chatbot modern seperti ChatGPT bisa meyakinkan banyak orang bahwa itu manusia — tapi apakah benar-benar "berpikir"?
- **Kritik / Kelemahan:** Pesawat terbang sukses tanpa meniru kepakan sayap burung. AI juga tidak harus meniru perilaku manusia untuk bisa cerdas.

### Acting Rationally - Rational Agent (Model Standar)
- **Tokoh:** Poole et al. 1998, Nilsson 1998
- **Pertanyaan Inti:** "Do the right thing" — bertindak untuk hasil TERBAIK yang diharapkan.
- **Pendekatan:** Rational agent = agen yang selalu memilih aksi dengan expected outcome terbaik. Diukur lewat fungsi utilitas atau cost function.
- **Bidang Terkait:** Lebih general dari thinking rationally karena mencakup perilaku tanpa penalaran eksplisit (contoh: refleks menarik tangan dari kompor panas — rasional tapi tanpa "berpikir logis"). Paling mudah dimodelkan secara matematis.
- **Contoh Nyata:** Self-driving car: sensor deteksi situasi → pilih aksi yang memaksimalkan keselamatan + kecepatan + kenyamanan.
- **Kritik / Kelemahan:** Perfect rationality (selalu optimal) sering impossible di dunia nyata yang kompleks. Solusi: bounded rationality — cari yang "cukup baik" dalam batasan komputasi.

### Kenapa Ini Penting?
Di kuliah ini, kita pakai pendekatan **Acting Rationally** karena paling mudah dimodelkan secara matematis. Tapi ada **Value Alignment Problem** — bagaimana memastikan tujuan mesin selaras dengan keinginan manusia? Contoh: mesin catur yang disuruh "menang" bisa curang. Solusinya → **Provably Beneficial AI**.

---

## Agen Cerdas

Agen = entitas yang merasakan lingkungan lewat sensor, lalu bertindak lewat aktuator

### Diagram Agen
- **AGEN** terdiri dari: Sensor, Fungsi/Program Agen, Aktuator
- **LINGKUNGAN** = dunia luar agen
- Alur: Lingkungan → (Percepts) → Sensor → Fungsi/Program Agen → Aktuator → (Actions) → Lingkungan

### Formula Fungsi Agen

```
f : P* → A
```

| Simbol | Nama | Deskripsi |
|--------|------|-----------|
| P* | Percept Sequence | Seluruh riwayat percept dari awal — bukan cuma yang sekarang! Ini complete history. |
| A | Action | Tindakan yang dipilih agen: gerakan fisik (belok), atau keputusan (approve/reject). |
| f | Agent Function | Pemetaan abstrak dari seluruh history percept ke aksi. Agent Program = implementasi konkritnya di hardware. |

### PEAS Framework

Sebelum desain agen, definisikan **lingkup tugasnya**. Contoh: Taksi Otonom

| Komponen | Nama | Deskripsi | Catatan |
|----------|------|-----------|---------|
| **P** | Performance | Ukuran sukses → aman, cepat, patuh rambu, nyaman | Diukur pada LINGKUNGAN, bukan state agen! |
| **E** | Environment | Dunia luar → jalan, rambu, kendaraan lain, penumpang | Menentukan seberapa sulit masalah agen |
| **A** | Actuators | Alat bertindak → kemudi, gas, rem, klakson, sinyal | Menentukan aksi apa saja yang tersedia |
| **S** | Sensors | Alat persepsi → kamera, LIDAR, sonar, speedometer, GPS | Menentukan seberapa banyak info yang bisa didapat |

### Kenapa Ini Penting?
Performance measure diukur pada **keadaan lingkungan**, bukan state internal agen. Kalau vacuum cleaner diukur dari "jumlah debu dibersihkan dalam 8 jam", agen bisa curang — sebar debu dulu baru bersihkan! Ukur **kebersihan lantai keseluruhan** lebih tepat.

---

## 7 Properti Lingkungan

Sifat lingkungan menentukan seberapa sulit masalah & desain agen yang tepat

### 1. Observable: Fully vs Partially
- **Apa Maksudnya?** Apakah sensor bisa lihat SELURUH keadaan lingkungan?
- **Fully:** Catur — seluruh papan terlihat
- **Partially:** Mengemudi — ada blind spot
- **Kenapa Penting?** Jika partially → agen perlu internal state/model untuk melacak hal yang tidak terlihat.

### 2. Agents: Single vs Multi
- **Apa Maksudnya?** Apakah ada entitas lain yang juga bertindak di lingkungan?
- **Single:** Sudoku — hanya kamu
- **Multi:** Catur — ada lawan
- **Kenapa Penting?** Multi-agent bisa kompetitif atau kooperatif. Perilaku agen lain jadi sumber ketidakpastian.

### 3. Deterministic: Deterministic vs Stochastic
- **Apa Maksudnya?** Apakah state selanjutnya 100% pasti berdasarkan state + aksi sekarang?
- **Deterministic:** Catur — pasti
- **Stochastic:** Mengemudi — ban bisa bocor tiba-tiba
- **Kenapa Penting?** Stochastic → agen harus menangani probabilitas & ketidakpastian.

### 4. Memory: Episodic vs Sequential
- **Apa Maksudnya?** Apakah aksi sekarang mempengaruhi keputusan masa depan?
- **Episodic:** Deteksi spam — tiap email independen
- **Sequential:** Catur — setiap langkah mengubah posisi
- **Kenapa Penting?** Sequential jauh lebih sulit karena setiap langkah berdampak jangka panjang.

### 5. Timing: Static vs Dynamic
- **Apa Maksudnya?** Apakah lingkungan berubah SAAT agen berpikir?
- **Static:** Teka-teki silang — no time pressure
- **Dynamic:** Mengemudi — mobil lain terus bergerak
- **Kenapa Penting?** Semi-dynamic: lingkungan tidak berubah tapi skor berubah (catur + clock).

### 6. Values: Discrete vs Continuous
- **Apa Maksudnya?** Berapa banyak kemungkinan state/aksi/percept?
- **Discrete:** Catur — posisi terbatas
- **Continuous:** Self-driving — posisi tak terbatas
- **Kenapa Penting?** Continuous → butuh teknik numerik/sampling, tidak bisa enumerate semua.

### 7. Knowledge: Known vs Unknown
- **Apa Maksudnya?** Apakah agen tahu semua aturan/hukum lingkungan?
- **Known:** Catur — aturan lengkap
- **Unknown:** Video game baru — belum tahu efek tombol
- **Kenapa Penting?** INI BUKAN sifat lingkungan, tapi sifat PENGETAHUAN agen. Known bisa partially observable (Solitaire). Unknown bisa fully observable (video game baru).

### Perbandingan (sering keluar UTS!)

| Properti | Catur + Clock | Catur biasa | Mengemudi |
|---|---|---|---|
| Observable? | ✅ Fully | ✅ Fully | ❌ Partial |
| Single agent? | ❌ No | ❌ No | ❌ No |
| Deterministic? | ✅ Yes | ✅ Yes | ❌ No |
| Episodic? | ❌ Sequential | ❌ Sequential | ❌ Sequential |
| Static? | ⚠️ Semi-dynamic | ✅ Static | ❌ Dynamic |
| Discrete? | ✅ Yes | ✅ Yes | ❌ Continuous |

> ⚠️ Semi-dynamic = lingkungan tidak berubah, tapi skor (waktu) berubah saat agen berpikir.

### Dunia Nyata
= Partial, Multi, Stochastic, Sequential, Dynamic, Continuous, Unknown — **paling kompleks!**

---

## 5 Tipe Program Agen

Dari sederhana ke canggih — setiap level tambahkan kemampuan baru

### Level 1: Simple Reflex
- **Inti:** Langsung respon percept sekarang — seperti refleks, tanpa ingatan
- **Cara Kerja:** IF kondisi THEN aksi. Tidak ada memori, tidak ada model.
- **Contoh:** Thermostat: IF suhu > 25°C THEN nyalakan AC
- **Keterbatasan:** Hanya bekerja di fully observable. Tanpa memori → bisa infinite loop.
- **Kunci:** Paling sederhana. Zero internal state.

### Level 2: Model-Based Reflex
- **Inti:** Punya internal state + model dunia untuk track keadaan yang tak terlihat
- **Cara Kerja:** 2 model: (1) Model Transisi — efek aksi terhadap lingkungan, (2) Model Sensor — bagaimana keadaan tercermin di percept.
- **Contoh:** Mobil otonom yang tahu posisi mobil lain meskipun sesaat tak terlihat di kamera
- **Keterbatasan:** Masih pakai condition-action rules, tidak bisa planning.
- **Kunci:** Bisa handle partially observable dengan menyimpan state.

### Level 3: Goal-Based
- **Inti:** Punya GOAL masa depan, bisa cari sekuens aksi menuju goal
- **Cara Kerja:** Model + Goal → Search/Planning → Sequence of actions.
- **Contoh:** GPS: goal = sampai Senayan. Cari rute, pertimbangkan macet.
- **Keterbatasan:** Goal binary (tercapai/tidak). Jika banyak rute ke goal, tidak bisa pilih "terbaik".
- **Kunci:** Beda utama: bisa melihat ke DEPAN dan PLANNING.

### Level 4: Utility-Based
- **Inti:** Banyak cara menuju goal → pilih yang memaksimalkan expected utility
- **Cara Kerja:** Utility function = internalisasi performance measure. Pilih aksi yang maximize expected utility.
- **Contoh:** Taksi: rute A cepat tapi sempit, rute B lambat tapi aman → timbang tradeoff.
- **Keterbatasan:** Utility function sulit ditentukan sempurna. Perfect rationality impossible.
- **Kunci:** Paling canggih dalam pemilihan aksi. Handle partial + non-deterministic.

### Level 5: Learning Agent
- **Inti:** Bukan tipe aksi baru — ini tentang bagaimana agen BELAJAR & BERKEMBANG
- **Cara Kerja:** 4 komponen: Performance element (pilih aksi), Critic (evaluasi), Learning element (perbaiki), Problem generator (eksplore hal baru).
- **Contoh:** AlphaGo: belajar dari jutaan game, critic bilang menang/kalah, update strategi.
- **Keterbatasan:** Semua 4 tipe di atas bisa dijadikan learning agent.
- **Kunci:** Bisa improve dari pengalaman. Problem generator penting agar tidak stuck.

---

## Taksonomi AI

Peta besar AI — di mana kita sekarang?

### Narrow AI (Weak) — ✅ SUDAH ADA
- **Deskripsi:** Satu tugas spesifik saja. Tidak bisa generalisasi.
- **Contoh:** Chatbot reservasi, spam filter, face recognition
- **Sifat:** Repetitif, tanpa keputusan otonom

### General AI (Strong) — ❌ MASIH RISET
- **Deskripsi:** Semua tugas seperti manusia — berpikir, menalar, belajar.
- **Contoh:** ??? (belum ada)
- **Sifat:** Pengambilan keputusan otonom

### Hubungan AI, ML, DL, dan Data Science
AI adalah payung besar. ML ⊂ AI belajar dari data. DL ⊂ ML pakai neural network berlapis. Data Science beririsan — tidak semua DS pakai ML.

### 3 Pokok Bahasan AI

| Pokok Bahasan | Topik |
|---|---|
| Search & Optimization | BFS, DFS, UCS, A*, Gradient Descent |
| Logic & Knowledge | Propositional Logic, FOL, Bayesian Net |
| Learning Agents (**Fokus Kuliah**) | Decision Tree, KNN, Neural Network |

---

## Sejarah Singkat AI

1943-2025: drama, winter, kebangkitan, dan revolusi

| Tahun | Era | Peristiwa |
|---|---|---|
| 1943 | Fondasi | McCulloch & Pitts: model neuron buatan pertama — pondasi neural networks |
| 1950 | Fondasi | Turing menulis "Computing Machinery & Intelligence" → Turing Test |
| 1956 | Fondasi | Dartmouth Conference — istilah "Artificial Intelligence" resmi lahir |
| 1957 | Fondasi | Rosenblatt: Perceptron — neural network pertama yang bisa belajar |
| 1965 | Awal | ELIZA — program NLP pertama, simulasi percakapan |
| 1974 | Winter | AI Winter pertama — pendanaan turun, harapan vs realita |
| 1980 | Revival | Expert Systems populer — perusahaan mulai pakai AI |
| 1986 | Revival | Backpropagation (Hinton dkk.) — training deep neural networks jadi mungkin |
| 1997 | Revival | IBM Deep Blue kalahkan Kasparov — pertama kalinya komputer menang vs grandmaster |
| 2012 | Modern | Deep neural net kenali kucing di YouTube — awal era deep learning |
| 2015 | Modern | AlphaGo kalahkan Lee Sedol di Go — dianggap mustahil sebelumnya |
| 2020 | GenAI | GPT-3: terobosan besar NLP, teks sangat meyakinkan |
| 2022 | GenAI | ChatGPT dirilis — AI jadi mainstream |
| 2025 | GenAI | DeepSeek R1: reasoning berkualitas tinggi, biaya training hanya $5.6M — guncang industri |

---

## Konsep Dasar Machine Learning

Komputer belajar pola dari data, bukan diprogram manual

### Traditional Programming vs Machine Learning

| Traditional Programming | Machine Learning |
|---|---|
| Data + Program → Computer → Output | Data + Output → Computer → Program |
| Manusia tulis aturan → komputer jalankan | Komputer temukan aturan sendiri dari data! |

### Supervised Learning
- **Ide:** Belajar dari data + label (jawaban benar)
- **Input:** Data + Label
- **Output:** Model prediktif
- **Analogi:** Seperti belajar dari buku soal + kunci jawaban — lihat soal dan jawabannya, lalu bisa jawab soal baru.

| Sub-tipe | Deskripsi | Contoh |
|---|---|---|
| Classification | Prediksi kelas (diskret) | Spam/Not Spam, Approve/Reject |
| Regression | Prediksi angka (kontinu) | Harga rumah, suhu besok |

### Unsupervised Learning
- **Ide:** Belajar pola dari data TANPA label
- **Input:** Data saja
- **Output:** Kelompok/pola
- **Analogi:** Seperti anak kecil kelompokkan mainan berdasarkan bentuk/warna — tanpa diajari nama-namanya.

| Sub-tipe | Deskripsi | Contoh |
|---|---|---|
| Clustering | Kelompokkan data mirip | Segmentasi pelanggan mall |
| Dim. Reduction | Kurangi fitur, pertahankan info | PCA untuk visualisasi |

### Reinforcement Learning
- **Ide:** Belajar lewat trial & error + reward/punishment
- **Input:** Env + Actions + Rewards
- **Output:** Policy optimal
- **Analogi:** Seperti latih anjing: treat kalau benar (reward), diabaikan kalau salah. Lama-lama agen tahu apa yang harus dilakukan.

| Sub-tipe | Deskripsi | Contoh |
|---|---|---|
| Game AI | Belajar strategi game | AlphaGo main Go |
| Robotics | Belajar navigasi/manipulasi | Robot belajar jalan |

### 3 Elemen Kunci ML (Domingos 2012)

| Elemen | Pertanyaan | Contoh |
|---|---|---|
| Representation | Bentuk model? | Decision Tree, NN, KNN |
| Evaluation | Ukur kualitas? | Accuracy, MSE, F1 |
| Optimization | Cari model terbaik? | Gradient Descent, Greedy |

**Contoh:** Klasifikasi "beli komputer?" pakai Multilayer Perceptron → Representation: **Neural Network**, Evaluation: **Accuracy**, Optimization: **Gradient Descent**.

---

# MATERI 02 - KASDAD - FASILKOM UI

# Uninformed & Informed Search

Bayangkan kamu tersesat di kota asing. **Uninformed search** = jalan tanpa peta. **Informed search** = punya GPS dengan estimasi jarak.

## Core Concepts

| Concept | Description |
|---------|-------------|
| Problem-Solving Agent | Agent yang punya goal & merencanakan aksi lewat search |
| State Space | Semua kemungkinan keadaan direpresentasikan sbg graph |
| Search Strategy | Cara memilih node mana yang di-expand duluan — inti perbedaan |

## Contoh Utama — Peta Romania

Agent di **Arad**, harus ke **Bucharest**. Angka = biaya jalan (km). Tugas: cari rute terbaik!

### Kota dan Heuristic (SLD ke Bucharest)

| Kota | h (SLD) |
|------|---------|
| Arad | 366 |
| Bucharest | 0 |
| Craiova | 160 |
| Drobeta | 242 |
| Eforie | 161 |
| Fagaras | 176 |
| Giurgiu | 77 |
| Hirsova | 151 |
| Iasi | 226 |
| Lugoj | 244 |
| Mehadia | 241 |
| Neamt | 234 |
| Oradea | 380 |
| Pitesti | 100 |
| R.Vilcea | 193 |
| Sibiu | 253 |
| Timisoara | 329 |
| Urziceni | 80 |
| Vaslui | 199 |
| Zerind | 374 |

### Edge Weights (km)

| From | To | Cost |
|------|----|------|
| Arad | Zerind | 75 |
| Arad | Sibiu | 140 |
| Arad | Timisoara | 118 |
| Zerind | Oradea | 71 |
| Oradea | Sibiu | 151 |
| Timisoara | Lugoj | 111 |
| Lugoj | Mehadia | 70 |
| Mehadia | Drobeta | 75 |
| Drobeta | Craiova | 120 |
| Craiova | Pitesti | 138 |
| Craiova | R.Vilcea | 146 |
| Sibiu | Fagaras | 99 |
| Sibiu | R.Vilcea | 80 |
| Fagaras | Bucharest | 211 |
| R.Vilcea | Pitesti | 97 |
| Pitesti | Bucharest | 101 |
| Bucharest | Giurgiu | 90 |
| Bucharest | Urziceni | 85 |
| Urziceni | Hirsova | 98 |
| Hirsova | Eforie | 86 |
| Urziceni | Vaslui | 142 |
| Vaslui | Iasi | 92 |
| Iasi | Neamt | 87 |

## Asumsi Lingkungan

| Asumsi | Penjelasan |
|--------|------------|
| Fully Observable | Agent lihat seluruh peta |
| Deterministic | Aksi pasti hasilnya sesuai prediksi |
| Static | Peta tak berubah saat berpikir |
| Discrete | State & aksi terbatas |

> **KENAPA?** Dengan 4 asumsi ini, agent bisa menghitung rute SEBELUM jalan — seperti buka Google Maps dulu sebelum nyetir. Solusinya pasti bisa dijalankan tanpa kejutan di tengah jalan.

---

## Konsep Dasar

### Evolusi Agent

1. **Reflex Agent** — IF kotor → sedot
2. **Goal-Based** — Punya tujuan, evaluasi aksi
3. **Problem-Solving** — Formalisasi + Search!

> **KENAPA?** **Reflex agent** langsung bereaksi (cocok untuk tugas simpel). Tapi navigasi kota? Perlu **berpikir dulu** — formalisasi masalah jadi state space, lalu cari urutan aksi terbaik. Itulah **problem-solving agent**.

### State Space — 5 Komponen Wajib

State space = **peta lengkap semua kemungkinan**. Dimodelkan sebagai **graph**: node=state, edge=aksi, weight=biaya.

| Komponen | Deskripsi | Contoh (Romania) | Penjelasan |
|----------|-----------|-------------------|------------|
| **States** | Semua keadaan yang mungkin | LocatedIn(Arad), LocatedIn(Sibiu), ... | Semua titik di peta yang bisa dikunjungi |
| **S_init** | Titik awal — sebelum aksi pertama | S_init = LocatedIn(Arad) | Di mana kamu SEKARANG? |
| **PosAct(s)** | Aksi yang tersedia di state s | PosAct(Arad) = {DriveTo(Sibiu), DriveTo(Tim), DriveTo(Zer)} | Dari sini, ke mana saja kamu BISA pergi? |
| **NextState(s,a)** | State baru setelah melakukan aksi a di state s | NextState(Arad, DriveTo(Sibiu)) = LocatedIn(Sibiu) | Kalau belok kiri, sampai di mana? |
| **ActCost(s,a,s')** | Biaya satu langkah dari s ke s' | ActCost(Arad, DriveTo(Sibiu), Sibiu) = 140 | Berapa ongkos langkah ini? |

### Solusi = Path dari Start ke Goal

```
Arad --140--> Sibiu --80--> R.Vilcea --97--> Pitesti --101--> Bucharest
g=0          g=140         g=220            g=317             g=418
```

**PathCost = 140 + 80 + 97 + 101 = 418 ✓ OPTIMAL**

> **KENAPA?** **PathCost** = jumlah semua ActCost di path. **Optimal solution** = path dgn PathCost terkecil. Rute Arad→Sibiu→R.Vilcea→Pitesti→Bucharest = 418 adalah optimal. Rute lewat Fagaras (450) lebih mahal — bukan optimal.

### Frontier & Explored — Jantung Search

**Frontier**: Node yang **menunggu giliran** di-expand. **Data structure frontier = strategi search!**

| Data Structure | Algoritma |
|----------------|-----------|
| Queue | BFS |
| Stack | DFS |
| PriorityQ | UCS/A* |

**Explored Set**: Dictionary berisi state yang **sudah dikunjungi**. Tujuan: **cegah infinite loop!**

> **KENAPA?** Tanpa explored set, graph dgn cycle (A→B→C→A) bisa muter-muter selamanya tanpa pernah menemukan goal.

---

## Uninformed Search

Disebut **"blind"** karena **tak tahu arah goal**. Perbedaan antar strategi HANYA: **urutan expand node**.

### Breadth-First Search (BFS)

**Data Structure:** Queue (FIFO)

**Expand node paling DEKAT ke root dulu — level per level**

```
Queue — First In, First Out
[Sibiu | Tim. | Zerind | Oradea | Fag.]
← POP sini                    ADD sini →
```

> **KENAPA?** Cari kunci di rumah → cek **semua ruangan lantai 1** dulu, baru naik lantai 2. Queue menjamin ini: yang masuk duluan, keluar duluan. Jadi level demi level tereksplorasi sempurna.

| Property | Value | Note |
|----------|-------|------|
| Complete? | Ya ✓ | jika b finite |
| Time | O(b^d) | semua node sampai lvl d |
| Space | O(b^d) | simpan semua di memori! |
| Optimal? | =cost only | jika step cost sama |

> ⚠️ **Masalah: MEMORI.** b=10, d=12 → 10^12 node ≈ 1 petabyte!

### Depth-First Search (DFS)

**Data Structure:** Stack (LIFO)

**Expand node paling JAUH dari root — terus maju sampai mentok**

```
Stack — Last In, First Out
[Oradea | Fagaras | R.Vilcea | Sibiu]
← POP sini                  PUSH sini →
```

> **KENAPA?** Di labirin → **terus maju sampai buntu**, baru balik coba arah lain. Hemat memori (cuma simpan 1 path), tapi bisa **nyasar sangat dalam** meski goal dekat dari start.

| Property | Value | Note |
|----------|-------|------|
| Complete? | Bisa tidak! | loop tanpa explored |
| Time | O(b^m) | m bisa >> d! |
| Space | O(bm) | hemat! 1 path saja |
| Optimal? | Tidak ✗ | bisa path panjang dulu |

### Uniform Cost Search (UCS)

**Data Structure:** Priority Queue (by g)

**Expand node dgn TOTAL PATH COST kumulatif terkecil**

```
Priority Queue — sorted by g(n) ascending
[Zer(75) | Tim(118) | Sib(140) | Ora(146)]
← POP terkecil              INSERT sorted →
```

> **KENAPA?** BFS optimal jika step cost sama. Tapi kalau beda? UCS selalu pilih yang **total biayanya paling murah**. Hasilnya: **selalu optimal!**
>
> **Fun fact:** UCS = BFS jika semua cost sama. UCS mirip Dijkstra, tapi berhenti begitu goal ketemu (Dijkstra hitung ke SEMUA node).

| Property | Value | Note |
|----------|-------|------|
| Complete? | Ya ✓ | jika cost > 0 |
| Time | O(b^⌊C*/ε⌋) | C*=optimal, ε=min step |
| Space | O(b^⌊C*/ε⌋) | bisa sangat besar |
| Optimal? | Ya! ✓ | always cheapest |

### Iterative Deepening Search (IDS)

**BEST Uninformed**

**Jalankan DFS dgn depth limit 0, 1, 2, 3, ... naik terus sampai goal ketemu**

```
DFS limit=0 → ✗ Cutoff
DFS limit=1 → ✗ Cutoff
DFS limit=2 → ✗ Cutoff
DFS limit=3 → ✓ Found!
```

> **KENAPA?** Gabungkan yang terbaik dari BFS & DFS:
> - **Space O(bd)** dari DFS — hemat memori
> - **Completeness** dari BFS — pasti ketemu
> - **Time O(b^d)** — sama dgn BFS!
>
> "Boros karena ulang?" → Tidak! Node level atas sedikit. Overhead cuma ~11% jika b=10. **Strategi uninformed terbaik** saat depth goal unknown.

| Property | Value | Note |
|----------|-------|------|
| Complete? | Ya ✓ | b finite |
| Time | O(b^d) | sama BFS! |
| Space | O(bd) | linear! spt DFS |
| Optimal? | =cost only | jika step cost sama |

---

## Informed Search

Agent punya **heuristic h(n)** — estimasi biaya dari n ke goal. Seperti punya **kompas**!

### Heuristic Function

Fungsi **h(n)** yang **mengestimasi** biaya tersisa dari state n ke goal. Untuk Romania: **jarak garis lurus (SLD)** ke Bucharest.

| Kota | h (SLD) |
|------|---------|
| Arad | 366 |
| Sibiu | 253 |
| Fagaras | 176 |
| Pitesti | 100 |
| Bucharest | 0 |

> **KENAPA?** SLD bagus karena **garis lurus SELALU ≤ jarak jalan sebenarnya**. Jadi SLD tak pernah "menipu" — ini disebut **admissible**.

### Admissible

**Formula:**

```
0 ≤ h(n) ≤ h*(n)
```

h*(n) = biaya optimal sebenarnya. Heuristic **TIDAK BOLEH overestimate**.

> **KENAPA?** Ibarat teman bilang "paling jauh 5 km" — boleh lebih dekat, tapi JANGAN bilang lebih jauh dari kenyataan.

→ Jamin A* optimal

### Consistent

**Formula:**

```
h(n) ≤ c(n,a,n') + h(n')
```

**Triangle inequality**: jarak langsung ≤ jarak lewat tetangga.

> **KENAPA?** Estimasi Arad→Bucharest langsung tidak boleh lebih dari (Arad→Sibiu) + (estimasi Sibiu→Bucharest). Logis!

→ Consistent ⊂ Admissible (selalu!)

### Greedy Best-First Search (GBFS)

**Data Structure:** Priority Queue by h(n)

**Evaluation function:**

```
Eval(n) = h(n)
```

> **KENAPA?** Seperti orang yang **selalu jalan ke arah yang TERLIHAT paling dekat**. Cepat? Iya. Bisa tersesat? Juga! Ada gunung menghalangi → SLD bilang dekat, jalan sebenarnya jauh.
>
> **TIDAK optimal, TIDAK complete!** Jangan tertipu nama "best-first".

| Property | Value |
|----------|-------|
| Complete? | Tidak ✗ |
| Time | O(b^m) |
| Space | O(b^m) |
| Optimal? | Tidak ✗ |

### A* Search

**Data Structure:** Priority Queue by f(n) = g(n) + h(n)

**Formula:**

```
f(n) = g(n) + h(n)
```

- **g(n)** = biaya aktual (cost so far)
- **h(n)** = estimasi sisa (estimated cost to goal)
- **f(n)** = estimated total cost melalui node n

> **KENAPA?** A* gabungkan **biaya sudah dikeluarkan (g)** + **estimasi biaya sisa (h)** = total estimated cost. Ini sweet spot:
> - UCS = A* dgn h=0 (hanya lihat g)
> - GBFS = A* abaikan g (hanya lihat h)
> - **A* = yang terbaik dari kedua dunia! Optimal + Complete.**

| Property | Value | Note |
|----------|-------|------|
| Complete? | Ya ✓ | kondisi tertentu |
| Time | Varies | tergantung h |
| Space | Varies | tergantung h |
| Optimal? | Ya! ✓✓ | jika h admissible |

> ✅ Optimal jika h **admissible**. Tidak re-explore jika h **consistent**.

---

## Rangkuman

### Tabel Perbandingan

| | BFS | DFS | UCS | IDS | GBFS | A* |
|---|---|---|---|---|---|---|
| **Frontier** | Queue | Stack | PQ(g) | Stk+lim | PQ(h) | PQ(g+h) |
| **Complete?** | Ya* | Tidak** | Ya | Ya | Tidak | Ya*** |
| **Time** | O(b^d) | O(b^m) | O(b^⌊C*/ε⌋) | O(b^d) | O(b^m) | Varies |
| **Space** | O(b^d) | O(bm) | O(b^⌊C*/ε⌋) | O(bd) | O(b^m) | Varies |
| **Optimal?** | =cost | Tidak | Ya! | =cost | Tidak | Ya! |
| **Pakai h?** | Tidak | Tidak | Tidak | Tidak | Ya | Ya |

\* b finite | \*\* bisa jika m bounded + explored | \*\*\* finite states

### Kapan Pakai Apa?

| Algoritma | Gunakan Ketika |
|-----------|----------------|
| **BFS** | Step cost sama, goal dangkal |
| **DFS** | Memori terbatas, banyak solusi |
| **UCS** | Cost beda, butuh optimal |
| **IDS** | Space besar, depth unknown — BEST blind! |
| **GBFS** | Butuh cepat, optimal ga penting |
| **A*** | Butuh optimal + heuristic bagus — BEST! |

### Rumus Penting

| Formula | Keterangan |
|---------|------------|
| `f(n) = g(n) + h(n)` | A*: total estimated cost |
| `0 ≤ h(n) ≤ h*(n)` | Admissible: never overestimate |
| `h(n) ≤ c(n,a,n') + h(n')` | Consistent: triangle inequality |
| `PathCost = Σ ActCost` | Total biaya sepanjang path |

### Jebakan UTS

1. **UCS = A* dengan h(n)=0** — Tanpa heuristic, A* jadi UCS
2. **BFS optimal HANYA jika step cost SAMA** — Cost beda? Pakai UCS!
3. **DFS bisa INFINITE LOOP** — Tanpa explored set di graph dgn cycle
4. **IDS Time = O(b^d) — SAMA dgn BFS** — Overhead pengulangan cuma ~11%
5. **GBFS TIDAK optimal & TIDAK complete** — Nama 'best-first' menipu — dia cuma greedy
6. **Consistent → Admissible, BUKAN sebaliknya** — Consistent lebih ketat
7. **b ≠ d ≠ m** — b=branching, d=depth goal, m=max depth tree
8. **h₂(Manhattan) ≥ h₁(misplaced) selalu** — Keduanya admissible, h₂ lebih informatif

---

Now I have all the content. Let me produce the markdown.

# Materi 03 -- Sains Data

**CSGE603130 KASDD -- Genap 2025/2026**
Fakultas Ilmu Komputer -- Universitas Indonesia

---

## 1. Motivasi: Kenapa Sains Data?

Pertanyaan-pertanyaan ini bisa dijawab dengan sains data + learning agent:

| Pertanyaan | Kategori |
|---|---|
| Kata kunci apa yang paling sering dicari di Google? | Descriptive |
| Apa yang sedang trend di TikTok / Instagram? | Descriptive |
| Berapa harga saham PT. PIK 2 Tbk besok? | Predictive |
| Bagaimana sentimen orang terhadap DeepSeek? | Diagnostic |
| Kenapa user e-commerce tinggalkan keranjang? | Diagnostic |
| Lagu apa yang cocok direkomendasikan besok? | Prescriptive |

**KENAPA PENTING?** Semua pertanyaan ini butuh DATA + METODE SISTEMATIS untuk dijawab. Tanpa pendekatan yang benar, kita cuma nebak. Sains data memberikan kerangka kerja ilmiah untuk mengubah data mentah menjadi jawaban yang bisa diandalkan.

### Learning Agent Pipeline

```
KUMPULAN INFORMASI  -->  REPRESENTASI DATA  -->  TRAIN MODEL  -->  RUN INFERENCE  -->  INFERRED ANSWER
(Data mentah dari       (Input + Expected       (Komputer        (Query masuk       (Prediksi /
 dunia nyata)            Output)                 belajar pola)    → model proses)    Jawaban)
                                    ↻ Feedback loop — model terus diperbaiki dengan data baru
```

**KENAPA PENTING?** Ini inti dari semua sistem AI/ML. Tapi banyak pertanyaan muncul: dari mana datanya? Apakah bersih? Gimana tahu hasilnya bagus? Itulah kenapa butuh METODOLOGI sains data yang sistematis!

---

## 2. Big Data -- 6V

Kenapa kita hidup di era 'Big Data'? Karena data sekarang punya 6 karakteristik ini:

| V | Pertanyaan | Definisi | Contoh Nyata | Kenapa Penting? |
|---|---|---|---|---|
| **Volume** | Seberapa BESAR? | Data terakumulasi sangat besar -- terabyte sampai yottabyte | Facebook: 4+ petabytes/hari. Google: 8.5 miliar search/hari. | Butuh tools khusus (Hadoop, Spark) -- ga bisa Excel lagi! |
| **Velocity** | Seberapa CEPAT? | Data terhasilkan sangat cepat -- per detik, per menit | Twitter: 500K+ tweet/menit. Sensor IoT: ribuan reading/detik. | Tentukan: batch processing (berkala) atau stream processing (real-time). |
| **Variety** | Seberapa BERAGAM? | Terstruktur (tabel), semi (JSON), tidak terstruktur (teks, gambar, video) | 80% data dunia TIDAK terstruktur (teks, gambar, video). | Tantangan: ubah data beragam ini jadi format yang bisa dianalisis. |
| **Veracity** | Seberapa AKURAT? | Kesesuaian data dengan fakta semakin sulit ditakar | Fake reviews, bot accounts, data survei bias. | Garbage in = garbage out! Makanya data cleaning 70-90% waktu proyek. |
| **Value** | Seberapa BERNILAI? | Kemampuan menghasilkan value (profit, efisiensi, manfaat sosial) | Netflix hemat $1B/tahun dari recommendation engine. | Data tanpa value = sampah mahal. Tujuan akhir = VALUE, bukan model keren. |
| **Variability** | Seberapa BERVARIASI? | Variasi penggunaan data di berbagai konteks & aplikasi | Data transaksi → fraud detection + segmentation + forecasting. | Satu dataset bisa punya banyak kegunaan -- kreativitas kuncinya! |

---

## 3. Apa itu Sains Data?

> **Sains Data** = ekstraksi **insight** dari data yang *messy*
>
> Tujuan: **pengambilan keputusan masa depan** atau **pemahaman masa lampau**

**KENAPA PENTING?** Kata "messy" penting -- data dunia nyata ga pernah rapi. Ada yang kosong, duplikat, format beda. Sains data bukan cuma ML, tapi keseluruhan proses dari data kotor sampai keputusan bermanfaat.

### Area Dasar yang Dibutuhkan

- Math
- Statistics
- Domain Expertise
- Data Engineering
- Scientific Method
- Hacker Mindset
- Visualization
- Advanced Computing

---

## 4. Empat Tipe Data Analytics

Dari yang paling simple ke paling complex -- setiap level menambah value.

| Tipe | Pertanyaan Kunci | Deskripsi | Contoh | Analogi | Tools |
|---|---|---|---|---|---|
| **Descriptive** | APA yang terjadi? | Melihat ke BELAKANG -- merangkum data historis | Dashboard penjualan bulan lalu | Seperti kaca spion -- lihat apa yang sudah terjadi | SQL, pivot tables, Tableau |
| **Diagnostic** | MENGAPA ini terjadi? | Menggali LEBIH DALAM -- cari root cause fenomena | Kenapa penjualan Q3 turun 20%? | Seperti dokter diagnosa penyebab sakit | Drill-down, correlation, root-cause analysis |
| **Predictive** | APA yang AKAN terjadi? | Melihat ke DEPAN -- prediksi berdasarkan pola historis | Prediksi harga saham besok | Seperti ramalan cuaca -- berdasarkan pola, bisa salah | ML, regression, classification |
| **Prescriptive** | APA yang HARUS dilakukan? | Rekomendasi AKSI -- tindakan terbaik berdasarkan prediksi | Harga optimal produk baru | Seperti GPS -- bukan cuma bilang macet, tapi kasih rute alternatif | Optimization, simulation, RL |

**Tingkat kesulitan dan nilai:** MUDAH → SULIT + BERNILAI (Descriptive → Diagnostic → Predictive → Prescriptive)

### Jebakan Umum

- **Descriptive:** "Bagaimana penjualan Q3?" = Descriptive kalau masa LALU. Kalau Q3 belum terjadi = PREDICTIVE!
- **Diagnostic:** Diagnostic bukan cuma "lihat data" -- harus cari PENYEBAB. Merangkum aja = masih Descriptive.
- **Predictive:** Prediksi ≠ pasti benar! Selalu ada uncertainty. Estimasi shelf-life/masa pakai = REGRESSION (output kontinu).
- **Prescriptive:** "Berapa harga optimal?" = Prescriptive (rekomendasi aksi), BUKAN Predictive.

---

## 5. Ekosistem: AI vs Data Science vs Big Data

Hubungan dan perbedaan (konsep nested/bersarang):

| Konsep | Deskripsi |
|---|---|
| **Artificial Intelligence** | Bidang PALING LUAS -- segala upaya bikin mesin 'cerdas' |
| **Machine Learning** | SUBSET AI -- mesin belajar dari data, tanpa diprogram satu-satu |
| **Neural Networks** | SUBSET ML -- arsitektur terinspirasi neuron otak |
| **Deep Learning** | SUBSET NN -- banyak layer → sangat powerful |
| **Data Science** | Ekstraksi insight -- OVERLAP dengan AI & Big Data, tapi scope sendiri |
| **Big Data** | Data masif (6V) -- fokus INFRASTRUKTUR penyimpanan & pemrosesan |

**Hubungan:** AI ⊃ Machine Learning ⊃ Neural Networks ⊃ Deep Learning. Data Science dan Big Data beririsan dengan AI tetapi memiliki scope masing-masing.

**JEBAKAN:** Data Science ≠ Big Data ≠ AI! DS BERIRISAN tapi punya scope sendiri. DS bisa tanpa Big Data (pakai data kecil), AI bisa tanpa DS (rule-based).

---

## 6. Peran Pelaku Sains Data

Setiap industri bisa bervariasi, tapi umumnya ada 3 peran utama:

### Data Engineer

- **Fokus:** INFRASTRUKTUR -- biar data bisa diakses
- **Tugas:**
  - Mengumpulkan & mengelola data
  - Membangun pipeline ETL
  - Maintain arsitektur database
- **Core Skills:** Data Ingest & ETL, Database Systems, Hadoop / Spark, Data APIs, Data Warehousing
- **Analogi:** Seperti TUKANG LEDENG -- pastikan air (data) mengalir lancar

### Data Scientist

- **Fokus:** ANALISIS -- ubah data mentah jadi insight
- **Tugas:**
  - Data mentah → insight via ML
  - Eksperimen model & algoritma
  - Storytelling & visualisasi
- **Core Skills:** Python / R, ML & Deep Learning, Feature Engineering, Statistics, Visualization
- **Analogi:** Seperti DETEKTIF -- cari petunjuk tersembunyi di data

### Business Stakeholder

- **Fokus:** KEPUTUSAN -- terjemahkan insight ke aksi
- **Tugas:**
  - Ukur ROI & NPV
  - Analisis value chains
  - Keputusan strategis berbasis data
- **Core Skills:** Business Intelligence, Statistics, Data Stewardship, Communication, Domain Expertise
- **Analogi:** Seperti KAPTEN KAPAL -- tentukan arah berdasarkan info crew

---

## 7. Training vs Usage

Sistem KA punya 2 tahap: buat model (training) dan pakai model (usage).

### Tahap 1: Training (Pengembangan)

Fokus: bangun model yang **akurat dan rigid** -- proses panjang & mahal.

```
Define Goal → Gather Data → Prepare Data → Create Model → Evaluate → Deploy
```

### Tahap 2: Usage (Penggunaan)

Model sudah jadi → masukkan data baru → dapat hasil -- cepat & murah.

```
Send Data → Run Model → Get Result
```

**KENAPA PENTING?** Bedakan! Training = panjang & mahal. Usage = cepat & murah. Kayak belajar masak (training) vs masak sehari-hari (usage).

---

## 8. CRISP-DM

**Cross-Industry Standard Process for Data Mining** -- metodologi PALING POPULER. Iteratif! Bisa kembali ke fase sebelumnya. DATA selalu di tengah proses.

### Fase 1: Business Understanding

- **Pertanyaan:** Masalah apa yang mau dipecahkan?
- **Deskripsi:** Definisikan masalah bisnis dulu -- BUKAN langsung ke data/model!
- **Detail:** Tentukan tujuan spesifik & pendekatan analitik (desc/diag/pred/presc). Tahap PALING KRUSIAL.
- **JEBAKAN:** Perumusan scope bersama stakeholder = Business Understanding. Download data = BUKAN ini!

### Fase 2: Data Understanding

- **Pertanyaan:** Data apa yang dibutuhkan?
- **Deskripsi:** Tentukan kebutuhan data, kumpulkan, pahami dengan EDA.
- **Detail:** Tentukan konten, format, representasi. Iterasi jika data kurang → kembali ke fase 1.
- **JEBAKAN:** Mengunduh data dari berbagai sumber = Data Understanding, BUKAN Data Preparation!

### Fase 3: Data Preparation

- **Pertanyaan:** Bagaimana menyiapkan data?
- **Deskripsi:** Cleaning, integrasi, feature engineering. 70-90% WAKTU PROYEK!
- **Detail:** Handle missing values, duplikat, encoding, normalisasi, feature engineering.
- **JEBAKAN:** Feature engineering juga bagian Data Prep! Ini fase PALING MEMAKAN WAKTU.

### Fase 4: Modeling

- **Pertanyaan:** Model apa yang cocok?
- **Deskripsi:** Pilih & latih model. Bersifat ITERATIF -- eksperimen berulang.
- **Detail:** Decision Tree, KNN, Naive Bayes, dll. Tune parameter. Bandingkan algoritma.
- **JEBAKAN:** Implementasi kNN untuk estimasi harga = Modeling. Pengukuran regresi = EVALUATION, bukan Modeling!

### Fase 5: Evaluation

- **Pertanyaan:** Apakah model menjawab masalah bisnis?
- **Deskripsi:** Evaluasi kualitas model DAN kesesuaian dengan business problem.
- **Detail:** Bukan cuma metrik teknis -- harus BERGUNA untuk bisnis. Presentasi ke stakeholders.
- **JEBAKAN:** Evaluasi = cek BUSINESS QUESTION dari fase 1 terjawab, bukan hanya accuracy tinggi!

### Fase 6: Deployment

- **Pertanyaan:** Bagaimana menerapkan di dunia nyata?
- **Deskripsi:** Deploy, A/B testing, monitoring, evaluasi berkelanjutan.
- **Detail:** TIDAK BERHENTI setelah deploy! ML models always get worse over time. Retraining berkala.
- **JEBAKAN:** Deploy ≠ selesai! Model HARUS terus dimonitor dan di-retrain.

---

## 9. Studi Kasus: Pankreatitis Akut

Penerapan CRISP-DM pada prediksi risiko kematian di ICU.

### Fase 1: Business Understanding

| Aspek | Detail |
|---|---|
| Masalah | Pankreatitis Akut (AP) di ICU. Kematian 1-5%. Sulit identifikasi pasien risiko tinggi. |
| Pertanyaan | Bagaimana alokasi sumber daya terbatas untuk perawatan efisien? |
| Reformulasi | Minimalisasi dampak AP → prediksi risiko kematian pasien. |
| Tujuan | Prediksi risiko keparahan/kematian dari data historis. |
| Pendekatan | Klasifikasi (risiko tinggi vs tidak) → Decision Tree. |

### Fase 2: Data Understanding

| Aspek | Detail |
|---|---|
| Syarat | Usia >18, di ICU ≥24 jam, diagnosis AP. |
| Sumber | Electronic Health Records (EHR) RS. |
| Format | 1 entri per pasien, kolom = variabel. |
| Label | Meninggal = risiko tinggi, sisanya = tidak. |

### Fase 3: Data Preparation

| Aspek | Detail |
|---|---|
| Integrasi | 3 sumber: pendaftaran + lab/klinis + perangkat ICU. |
| Cleaning | Data 24 jam pertama saja. Hapus duplikat. Hapus >20% missing. |
| Feature Eng. | Agregasi data historis per pasien (rerata). |
| Variabel | Umur, kelamin, WBC, platelet, creatinine, glukosa, dll. |

### Fase 4: Modeling

| Aspek | Detail |
|---|---|
| Model | Decision Tree classifier. |
| Input | Fitur klinis & lab yang sudah di-prepare. |
| Output | Risiko kematian: Ya / Tidak. |
| Proses | Iteratif -- eksperimen berulang. |

### Fase 5: Evaluation

| Aspek | Detail |
|---|---|
| Cek | Apakah model menjawab business question awal? |
| Stakeholder | Pastikan manajemen RS paham output. |
| Metrik | Accuracy, recall, precision, F1 + dampak klinis. |

### Fase 6: Deployment

| Aspek | Detail |
|---|---|
| Deploy | Model diuji real-time di ICU. |
| Edukasi | Petugas klinis diajari baca output model. |
| Feedback | Umpan balik → penyempurnaan model. |
| Maintain | Monitoring + retraining berkala. |

---

## 10. Data Reimagined -- Tipe Data

Data bukan cuma angka di tabel! Teks, gambar, suara -- semuanya bisa dianalisis.

### Tabular Data

- **Deskripsi:** Data format TABEL -- baris = entri, kolom = variabel. Paling umum.
- **Contoh:** Human Body Measurement: Age, BMI, Body Fat %, Heart Rate, dll.
- **Analisis yang bisa dilakukan:**
  - Clustering → rekomendasi fitness per kelompok
  - Regresi → prediksi BMI
  - Klasifikasi → kategori berat badan
  - Time-series → body fat vs usia

### Textual Data

- **Deskripsi:** Data TEKS -- buku, tweet, review. Analisis sentimen, topik, pola bahasa.
- **Contoh:** Sentimen Harry Potter per bab, asosiasi kata per umur di Facebook.
- **Analisis yang bisa dilakukan:**
  - Sentiment analysis
  - Topic modeling berita
  - Word association per kelompok
  - Bias detection media

### Image Data

- **Deskripsi:** Data CITRA -- satelit, X-ray, CCTV. Ekstrak informasi visual.
- **Contoh:** Citra satelit malam → prediksi GDP. Indonesia 1997→1998: cahaya -6%, GDP -13%.
- **Analisis yang bisa dilakukan:**
  - Restorasi warna foto lama
  - Deteksi penyakit dari X-ray/MRI
  - Deteksi kriminal CCTV
  - Prediksi ekonomi dari satelit

---

## 11. Kegagalan Proyek Sains Data

Menurut Gartner (2018): mayoritas proyek gagal. Kenapa?

### Statistik Kunci

| Metrik | Nilai |
|---|---|
| Proyek SELESAI | 15-20% |
| Menghasilkan VALUE | ~8% |
| Waktu di DATA PREP | 70-90% |

### Penyebab Kegagalan

| Penyebab | Deskripsi | Proporsi |
|---|---|---|
| **Problem** | Tidak jelas / salah formulasi. Over-promise. | 30% |
| **Data** | Tidak cukup, tidak tepat, kualitas buruk, bias, makna tidak jelas. | 35% |
| **Model** | Terlalu kompleks, metrik tidak tepat. | 15% |
| **Algoritma** | Terlalu rumit, tak bisa dipahami. | 10% |
| **SDM** | One-man show, stakeholder support kurang. | 10% |

**KENAPA PENTING?** Problem + Data = 65% kegagalan! Makanya jangan langsung loncat ke model. Pahami masalahnya dulu, kurasi datanya benar.

---

## 12. Metodologi Lainnya

Semuanya punya pola mirip: pahami masalah → kumpulkan data → siapkan → model → evaluasi → deploy.

### KDD Process

- **Fokus:** Teknis
- **Deskripsi:** Knowledge Discovery in Databases -- proses LINIER. Fokus teknis, kurang bicara bisnis.
- **Langkah:** Selection → Preprocessing → Transformation → Data Mining → Interpretation

### CRISP-DM

- **Fokus:** Bisnis + Teknis
- **Deskripsi:** Paling populer -- siklus ITERATIF, bisa kembali. Fokus bisnis DAN teknis.
- **Langkah:** Business Und. → Data Und. → Data Prep → Modeling → Evaluation → Deployment

### IBM DS

- **Fokus:** Bisnis + Teknis
- **Deskripsi:** Tambah Analytic Approach & Feedback loop eksplisit.
- **Langkah:** Business Und. → Analytic Approach → Data Req. → Collection → Understanding → Prep → Modeling → Eval → Deploy → Feedback

### Microsoft TDSP

- **Fokus:** Bisnis + Teknis
- **Deskripsi:** Team DS Process -- detail sub-step seperti Feature Eng & A/B Testing.
- **Langkah:** Business Und. → Data Acquisition → Modeling → Deployment → Acceptance

### SKKNI -- Kepmenaker No. 299/2020

Standar Kompetensi Kerja Nasional Indonesia -- 21 fungsi dasar AI & Data Science.

---

Now I have all the content from both files. Let me compile the complete educational content.

# Materi 4: From Raw Data to Ready Data

KASDD Genap 2025/2026 -- Data Collection, EDA, Statistics, and Data Preparation

## Overview

Analogy: Bayangkan mau masak seblak: (1) beli bahan (collection), (2) cek bahan -- ini kencur atau jahe? (understanding), (3) cuci, potong, blender (preparation). Tanpa persiapan yang benar, masakannya gagal.

### CRISP-DM Framework

Standar proses data science. Sifatnya ITERATIF -- bisa bolak-balik ke fase sebelumnya.

6 phases (circular):
1. Business Understanding
2. Data Understanding
3. Data Preparation
4. Modeling
5. Evaluation
6. Deployment

Materi 4 fokus pada fase Data Understanding dan Data Preparation.

### 3 Fase Utama

| Fase | Nama | Deskripsi |
|------|------|-----------|
| Fase 1 | Data Collection | Kumpulkan bahan mentah dari berbagai sumber |
| Fase 2 | Data Understanding | Pahami karakteristik: tipe, distribusi, kualitas |
| Fase 3 | Data Preparation | Bersihkan & transformasi agar siap dimasak |

> Data scientist menghabiskan ~80% waktu untuk collecting + preparing data. Garbage In = Garbage Out!

---

## Data Collection

Mengumpulkan data yang dibutuhkan untuk menjawab pertanyaan bisnis.

### Data Primer

Data spesifik belum ada -- kumpulkan sendiri dari sumber asli.

- Interview -- tanya langsung
- Observasi -- amati perilaku
- Survei/Kuesioner -- pertanyaan terstruktur
- Focus Group -- diskusi kelompok
- Oral Histories -- rekam pengalaman

### Data Sekunder

Sudah dikumpulkan orang lain. Lebih cepat & murah.

- Internet / Web / API
- Arsip Organisasi
- Perpustakaan & Jurnal
- Database Publik
- Open Data Portal

### Open Data

Data bebas untuk publik. Prinsip: Public, Accessible, Reusable, Complete, Timely, Managed.

Sumber: Kaggle, UCI ML Repo, Data.gov, World Bank, Satudata Jakarta, Google Dataset Search, OpenML, Nasdaq.

### Sumber Modern

- **Social Media**: 500M+ tweets/hari, via API, unstructured. Punya terms!
- **Web Scraping**: Otomatis ekstrak dari web. Tools: BeautifulSoup, Scrapy.
- **IoT**: Sensor: camera -> video, lock -> sidik jari. Data multimodal.

### Format Data

| Format | Full Name | Contoh | Keterangan |
|--------|-----------|--------|------------|
| CSV | Comma-Separated Values | `name,age\nAli,20` | Paling umum, ringan, semua tools support. |
| TSV | Tab-Separated Values | `name→age→city` | Seperti CSV tapi TAB. Berguna kalau data ada koma. |
| JSON | JavaScript Object Notation | `{"name":"Ali"}` | Cocok data nested. Standar API web. |
| XML | eXtensible Markup Language | `<n>Ali</n>` | Verbose tapi masih di enterprise. |

> **Tantangan:** Ketersediaan kurang, kualitas buruk (NA, outlier), semantik tidak jelas, bias sampling, privasi & etika.

---

## EDA & Tipe Data

EDA = analisis awal untuk memahami data sebelum modeling. Diciptakan John W. Tukey (1977).

### Kenapa EDA?

Tanpa EDA = coding buta. Kamu tidak tahu data bersih atau tidak, ada pola tersembunyi atau tidak. EDA = buka mata sebelum melangkah.

**Familiarisasi:**
- Berapa atribut? Tipe apa?
- Ada missing values?
- Distribusi tiap variabel?
- Dataset imbalanced?

**Hunting Insight:**
- Ada outlier?
- Korelasi antar atribut?
- Pola dalam distribusi?
- Perbandingan antar grup?

### Tipe Data: NOIR

Sebelum analisis, HARUS tahu tipe datamu. Akronim NOIR: semakin kanan, semakin banyak operasi valid.

| Tipe | Kategori | Contoh | Apa itu? | Operasi Valid | Penjelasan |
|------|----------|--------|----------|---------------|------------|
| **Nominal** | Kategorikal | Warna mata, Gender | Label saja | = ≠ | Tidak ada urutan. 'Merah' ≠ lebih besar dari 'Biru'. |
| **Ordinal** | Kategorikal | Sangat Puas > Puas | Label + urutan | = ≠ < > | Ada ranking, tapi jarak antar level TIDAK pasti sama. |
| **Interval** | Numerik | Suhu °C, Tahun | Urutan + jarak sama | = ≠ < > + - | 20° -> 30° = 30° -> 40°. Tapi 0°C ≠ 'tidak ada suhu'. |
| **Rasio** | Numerik | Tinggi, Berat, Harga | Interval + true zero | = ≠ < > + - x / | 0 kg = tidak ada berat. 10 kg = 2x dari 5 kg. |

Urutan NOIR: Nominal -> Ordinal -> Interval -> Rasio. Kiri paling terbatas, kanan paling fleksibel.

---

## Statistik Deskriptif

### Central Tendency -- "Di Mana Pusat Data?"

| Ukuran | Formula | Deskripsi | Kelebihan | Kelemahan | Contoh |
|--------|---------|-----------|-----------|-----------|--------|
| **Mean** | `Sum(xi) / n` | Rata-rata semua | Pakai semua data | Sensitif outlier! | 1,2,3,4,100 -> mean=22 |
| **Median** | Nilai ke-(n+1)/2 | Nilai tengah | Robust outlier | Abaikan data lain | 1,2,3,4,100 -> med=3 |
| **Mode** | argmax(freq) | Paling sering | Bisa untuk kategorikal | Bisa >1 (bimodal) | 1,2,2,3 -> mode=2 |

### Variation -- "Seberapa Menyebar?"

**Range:**
```
Range = Max - Min
```
Simpel tapi sangat sensitif outlier.

**IQR (Interquartile Range):**
```
IQR = Q3 - Q1
```
Sebaran 50% data tengah. Robust karena abaikan 25% atas & bawah.

**Variance (Sample):**
```
s^2 = Sum(xi - x_bar)^2 / (n - 1)
```
Rata-rata kuadrat deviasi. Dibagi (n-1) = Bessel's correction untuk sample.

**Standard Deviation:**
```
s = sqrt(variance)
```
Akar variance. Satuan sama dengan data asli -- lebih mudah diinterpretasi.

> **Kenapa variance DAN std dev?** Variance menghilangkan tanda negatif (kuadrat), tapi satuan jadi 'kuadrat'. Std dev mengembalikan ke satuan asli via akar kuadrat.

### Worked Example: Hitung IQR Step-by-Step

Data Mentah: [5, 7, 4, 4, 6, 2, 8]

- **Step 1: Urutkan** -> [2, 4, 4, 5, 6, 7, 8]
- **Step 2: Cari Q2 (Median)** -> n=7, posisi tengah = ke-4 -> Q2 = 5. Median membagi data jadi 2 bagian.
- **Step 3: Cari Q1** -> Q1 = median dari bagian BAWAH [2, 4, 4] -> Q1 = 4
- **Step 4: Cari Q3** -> Q3 = median dari bagian ATAS [6, 7, 8] -> Q3 = 7
- **Hasil:** IQR = Q3 - Q1 = 7 - 4 = 3 | Range = 8 - 2 = 6

### Box Plot & Outlier Detection

Box plot = 5 dimensi distribusi sekaligus. Outlier via IQR:

```
RLB (Left Lower Bound)  = Q1 - 1.5 x IQR
RUB (Right Upper Bound)  = Q3 + 1.5 x IQR
```

**Worked Example (Box Plot):**

Data values: Min=2.78, Q1=4.045, Median=6.595, Q3=9.01, Max=17.11

- IQR = Q3 - Q1 = 9.01 - 4.045 = **4.965**
- RUB = Q3 + 1.5 * IQR = 9.01 + 1.5 * 4.965 = **16.46**
- RLB = Q1 - 1.5 * IQR = 4.045 - 1.5 * 4.965 = **-3.40**
- Nilai di luar [-3.40, 16.46] = Outlier (contoh: 17.11)

> **Kenapa 1.5xIQR?** Pada distribusi normal, ~99.3% data ada dalam range ini. Yang di luar = sangat langka -> outlier.

### Skewness -- "Ke Mana Data Miring?"

Mengukur asimetri. Saat miring, mean "ditarik" ke arah ekor panjang.

| Tipe | Hubungan |
|------|----------|
| Left-Skewed | mean < median < mode |
| Normal | mean ≈ median ≈ mode |
| Right-Skewed | mode < median < mean |

Contoh right-skew: gaji karyawan (banyak rendah, sedikit sangat tinggi -- mean ditarik ke kanan).

### Kurtosis -- "Seberapa Lancip?"

Kurtosis tinggi = banyak outlier!

| Tipe | Kondisi | Deskripsi |
|------|---------|-----------|
| Platykurtic | K < 3 | Datar |
| Mesokurtic | K = 3 | Normal |
| Leptokurtic | K > 3 | Lancip, banyak outlier! |

### Pearson Correlation

Mengukur hubungan LINEAR dua variabel. Range: -1 sampai +1.

```
r = Sum((xi - x_bar)(yi - y_bar)) / sqrt(Sum((xi - x_bar)^2) * Sum((yi - y_bar)^2))
```

| Nilai r | Interpretasi |
|---------|-------------|
| r ≈ 1 | Positif kuat |
| r ≈ 0.4 | Positif lemah |
| r ≈ 0 | Tidak ada hubungan linear |
| r ≈ -1 | Negatif kuat |

> **JEBAKAN!** r=0 BUKAN berarti tidak ada hubungan! Bisa non-linear (parabola, sinusoidal). Pearson HANYA deteksi linear.

> **Kapan pakai apa?** Pearson -> interval/rasio. Spearman rho -> ordinal/monotonic. Chi-Square chi^2 -> kategorikal.

---

## Data Visualization

Tujuan: (1) eksplorasi, (2) komunikasi jelas, (3) representasi tidak bias, (4) support keputusan.

### LESS IS MORE

Setiap elemen visual harus mendukung pesan utama. Yang tidak perlu -- hapus.

> Hindari: 3D tanpa alasan, background berlebihan, warna terlalu banyak, proporsi salah, y-axis tidak dari 0.

### Kapan Pakai Chart Apa?

| Chart | Kegunaan | Kapan | Tipe Data |
|-------|----------|-------|-----------|
| Line Plot | Tren waktu | Time-series | Kontinu |
| Bar Chart | Bandingkan kategori | Perbandingan | Kategorikal |
| Histogram | Distribusi frekuensi | 1 var numerik | Numerik |
| Scatter Plot | Korelasi 2 var | Cari hubungan | 2 Numerik |
| Box Plot | Distribusi + outlier | Bandingkan grup | Numerik |
| Pie Chart | Proporsi (hati-hati!) | Max 5 kategori | Kategorikal |
| Heat Map | Variasi multi-var | Matriks korelasi | Matrix |
| Bubble Plot | 3 variabel | X, Y, + size | 3 Numerik |
| Area Plot | Tren kumulatif | Total beberapa grup | Kontinu |
| Tree Map | Hierarki | Data bertingkat | Hierarki |
| Word Cloud | Frekuensi kata | Analisis teks | Teks |
| Waffle Chart | Progress | Alternatif pie | Kategorikal |
| Density Plot | Distribusi smooth | KDE, bandingkan | Numerik |

### Histogram vs Bar Chart

| Histogram | Bar Chart |
|-----------|-----------|
| Data NUMERIK kontinu | Data KATEGORIKAL |
| Bar MENEMPEL (no gap) | Ada GAP antar bar |
| X = range/bin | X = kategori (label) |
| Distribusi FREKUENSI | PERBANDINGAN nilai |
| Bin size penting! Kecil -> noisy, besar -> hilang detail | Variasi: single, dual, stacked, horizontal |
| Y-axis HARUS dari 0 | Horizontal -> mudah baca label panjang |

> **Masalah Pie Chart:** Manusia buruk bandingkan sudut. Label susah cocokkan. % kecil hilang. Warna habis. Solusi: horizontal bar chart!

---

## Dirty Data & GIGO

Data dunia nyata hampir selalu kotor. Prinsip GIGO: bad data in -> bad results out.

```
Data Kotor -> Analisis -> Hasil Sampah
Data Bersih -> Analisis -> Insight Akurat
```

### Masalah Survey

- Responden hanya jawab sebagian
- Bukan target yang diinginkan
- Terlalu cepat (asal klik)
- Straight-line (semua sama)
- Jawaban tidak realistis (umur 999)
- Jawaban kontradiktif

> 57% data scientist bilang cleaning = bagian PALING TIDAK MENYENANGKAN. Tapi ini ~80% waktu!

### Data Preparation = Solusi

Cleaning -> Integration -> Transformation -> Selection -> Reduction -> Discretization -> Balancing

---

## Data Cleaning

Tiga masalah utama:

### 1. Missing Data

Data kosong/NA/blank. Penyebab: Responden skip, sensor error, data unavailable.

**Solusi:**
- Cek sumber (selalu coba dulu!)
- Replace mean (numerik normal)
- Replace modus (kategorikal)
- Replace 0/konstan (domain logic)
- Nearest neighbor (time-series)
- Domain knowledge (expert)
- Drop (NA terlalu banyak)

### 2. Noisy Data

Error, outlier, berantakan. Penyebab: Human error, sensor rusak, bug kode, lingkungan.

**Solusi:**
- Regression smoothing
- Clustering (deteksi outlier)
- Manual inspection
- Binning

### 3. Inconsistent Data

Format beda untuk hal sama. Penyebab: Beda sumber, beda entry, data outdated.

**Solusi:**
- Formatting (NY -> New York)
- Standarisasi (metric <-> imperial)
- Validasi tipe (age: 'twenty' -> 20)

> **Data Munging/Wrangling** = konversi format sulit -> mudah. Ex: teks resep -> data terstruktur.

---

## Data Integration

Gabungkan data dari berbagai sumber menjadi satu kesatuan koheren.

### 1. Schema Integration

Gabungkan metadata. Nama beda tapi artinya sama.
Contoh: A.cust_id = B.cust_# -> sama!

### 2. Resolve Conflicts

Atasi perbedaan nilai untuk entitas sama.
Contoh: Bill Clinton = William Clinton. Metric vs imperial.

### 3. Handle Redundancy

Hapus atribut redundan (deteksi via korelasi).
Contoh: is_male & is_female -> r=-1 -> hapus satu. annual_revenue = monthly x 12.

### Deteksi Redundansi

- **Pearson r**: Variabel numerik. |r| ≈ 1 -> redundan.
- **Chi-Square chi^2**: Variabel kategorikal. Uji independensi.

```
chi^2 = Sum((Observed - Expected)^2 / Expected)
```

chi^2 besar -> variabel TIDAK independen (ada hubungan).

---

## Transformasi, Selection & Discretization

### Jenis Transformasi

- Smoothing: hilangkan noise
- Aggregation: rangkum data
- Generalization: naik level abstraksi
- Normalization: skalakan range
- Feature Construction: buat fitur baru

### Normalization -- 3 Metode

> **Kenapa?** "age" (0-100) vs "income" (0-20jt). Tanpa normalisasi, income mendominasi model karena nilainya besar -- padahal belum tentu lebih penting!

**1. Simple Feature Scaling:**
```
x_new = x_old / x_max
```
Range: 0..1. Simpel tapi sensitif outlier di max.

**2. Min-Max:**
```
x_new = (x_old - x_min) / (x_max - x_min)
```
Range: pasti 0..1. Paling umum. Sensitif outlier.

**3. Z-Score:**
```
x_new = (x_old - mu) / sigma
```
Mean=0, std=1. BISA negatif. Lebih robust. mu=mean, sigma=std dev.

#### Worked Example: Normalization (data: [2, 5, 10, 15, 20])

min = 2, max = 20, mean (mu) = 10.40, std (sigma) = 6.35

For x = 10:

- **Simple Scaling:** x / x_max = 10 / 20 = **0.500**
- **Min-Max:** (x - min) / (max - min) = (10 - 2) / (20 - 2) = 8 / 18 = **0.444**
- **Z-Score:** (x - mu) / sigma = (10 - 10.40) / 6.35 = -0.40 / 6.35 = **-0.063**

Full comparison table:

| Method | Formula | 2 | 5 | 10 | 15 | 20 |
|--------|---------|---|---|----|----|-----|
| Original | -- | 2 | 5 | 10 | 15 | 20 |
| Simple Scaling | x / x_max | 0.100 | 0.250 | 0.500 | 0.750 | 1.000 |
| Min-Max | (x-min)/(max-min) | 0.000 | 0.167 | 0.444 | 0.722 | 1.000 |
| Z-Score | (x-mu)/sigma | -1.322 | -0.850 | -0.063 | 0.724 | 1.511 |

### Data Selection

- **Column Selection**: Pilih kolom tertentu. Ex: dari 10 kolom -> ambil "Position" & "Salary" saja. Kurangi dimensi, fokus fitur relevan.
- **Row Selection**: Filter baris. Ex: Salary >= 10 juta saja. Fokus subset relevan untuk analisis.

### Data Discretization

Ubah kontinu -> kategori diskret.

Contoh: Wine consumption -> Kategori

| Range | Label |
|-------|-------|
| <= 1.00 | 0 |
| 1.01-2.00 | 1 |
| 2.01-5.00 | 2 |
| > 5.00 | 3 |

> **Binning:** Urutkan -> bagi ke bin (equal-freq/equal-width) -> smooth by mean/median/boundaries.

---

## Data Reduction & Balancing

Representasi data lebih kecil tapi analisis tetap sama/mirip.

### Strategi Reduction

| Strategi | Deskripsi | Alasan |
|----------|-----------|--------|
| Data Cube Aggregation | Harian -> bulanan -> tahunan | Kurangi baris, pertahankan pola |
| Dimensionality Reduction | PCA, Feature Selection | Terlalu banyak fitur -> curse of dimensionality |
| Numerosity Reduction | Sampling, clustering, histogram | Banyak baris tapi pola sudah jelas |
| Data Compression | Lossless (string) vs Lossy (audio) | Storage/bandwidth terbatas |

### Data Balancing

Imbalanced -> model bias ke mayoritas. Ex: fraud (99.5% non-fraud, 0.5% fraud).

> **Kenapa masalah?** Model malas -- prediksi mayoritas saja sudah 99.5% akurat. Tapi gagal deteksi fraud yang justru paling penting!

| Metode | Deskripsi | Risiko |
|--------|-----------|--------|
| **Undersampling** | Kurangi sampel mayoritas | Kehilangan informasi |
| **Oversampling** | Perbanyak sampel minoritas | Overfitting (duplikat) |

### Ringkasan Data Preparation

| Tahap | Inti |
|-------|------|
| Cleaning | Missing, noisy, inconsistent |
| Integration | Gabungkan, resolve conflict |
| Transformation | Smoothing, normalisasi |
| Selection | Pilih kolom & baris |
| Reduction | Kurangi dimensi/ukuran |
| Discretization | Kontinu -> kategori |
| Balancing | Seimbangkan kelas |

---

# Materi 5: Feature Engineering & Selection

KASDD Genap 2025/2026

## Overview

### Apa itu Feature?

**Feature** = sifat atau karakteristik yang bisa diukur dari setiap data point. Ini yang jadi input ke model ML.

| Luas (m^2) | Sumber Air | Gaya | Kamar | Harga (Jt) |
|------------|------------|------|-------|------------|
| 100 | Sumur | Minimalis | 3 | 1.5 |
| 120 | PDAM | Greek | 4 | 1.7 |
| 200 | Sumur | Farm | 5 | 3.0 |

- **NUMERIK** -> Luas, Kamar
- **KATEGORIKAL** -> Sumber Air, Gaya
- **TARGET** -> Harga

### Peta Materi

| Topik | Deskripsi | Subtopik |
|-------|-----------|----------|
| Feature Engineering | Buat & transform fitur jadi lebih berguna | Aggregation, Encoding, Scaling, BoW |
| Feature Selection | Pilih fitur terbaik, buang yang ga penting | Filter, Wrapper, Embedded |

### 3 Proses Feature Engineering

| Proses | Teknik |
|--------|--------|
| **Creation** | Domain knowledge, Data-driven patterns, Synthetic features |
| **Transformation** | Normalization, Scaling, Encoding, Log / sqrt transform |
| **Extraction** | PCA / tSNE, Feature combination, Feature aggregation |

---

## Feature Engineering

### Aggregation

Menggabungkan beberapa data point untuk bikin pandangan yang lebih menyeluruh. Contoh: untuk deteksi fraud, transaction amount satu-satu ga cukup -- kita perlu **rolling median** dari 5 transaksi terakhir.

- Individual View: Low-value transaction bisa normal ATAU fraud
- Aggregated View (median 5): Fraud terlihat jelas karena penurunan tiba-tiba

### Differences & Ratios

Membandingkan perilaku sekarang vs historis. Transaksi banyak hari ini belum tentu anomali -- tapi kalau rasionya tinggi dibanding kebiasaan, itu mencurigakan!

| Customer | Hari Ini | Median 30hr | Rasio |
|----------|----------|-------------|-------|
| AQTRDAS1 | 10 | 9.5 | 1.05 |
| AQTRDAS5 | 16 | 2 | 8.00 (alert) |
| AQTRDAS7 | 27 | 6 | 4.50 (alert) |
| AQTRDAS9 | 4 | 6 | 0.67 |

### Age Encoding

Mengubah tanggal jadi angka bermakna -- berapa hari sejak suatu event.

Contoh: "Date first used" -> "Days since device first used"

2022-08-13 -> 270 hari

### Indicator Encoding

Membuat fitur biner (0/1) berdasarkan perubahan kondisi.

Contoh: "Country change from previous transaction" -- berguna untuk deteksi fraud.

| Previous | Current | Change Indicator |
|----------|---------|-----------------|
| US | US | 0 |
| US | US | 0 |
| US | HK | 1 |

### Binarization

Set threshold, di atas = 1, di bawah = 0.

Contoh: suhu > 38 derajat C -> demam.

| Suhu | 36 | 36 | 39 | 40 | 35 |
|------|----|----|----|----|-----|
| Binary | 0 | 0 | 1 | 1 | 0 |

Threshold = 38 derajat C

### Binning

Mengelompokkan angka ke dalam interval/kategori. Bisa untuk angka maupun kategori.

**Numerik:**

| Bin | Nilai |
|-----|-------|
| 0-20 | 15 |
| 21-40 | 22, 37 |
| 41-60 | 45, 52 |
| >60 | 70 |

**Kategorikal:**

| Grup | Kategori |
|------|----------|
| Professional | Engineer, Doctor, Lawyer |
| Creative | Artist, Youtuber |
| Education | Teacher |

---

## Encoding

### One-Hot Encoding

Setiap kategori jadi kolom baru berisi 0 atau 1. Cocok untuk sedikit kategori.

> Banyak kategori = banyak kolom baru -> curse of dimensionality!

**Contoh:**

Before (kolom "Device"):
1. iPhone
2. Macbook
3. Macbook
4. Android
5. iPhone

After (3 kolom baru):

| # | iPhone | Macbook | Android |
|---|--------|---------|---------|
| 1 | 1 | 0 | 0 |
| 2 | 0 | 1 | 0 |
| 3 | 0 | 1 | 0 |
| 4 | 0 | 0 | 1 |
| 5 | 1 | 0 | 0 |

### Target Encoding (Mean Encoding)

Ganti kategori dengan rata-rata target untuk kategori itu. Regression -> mean value. Classification -> probability P(y=1).

> Hanya untuk supervised learning! Rawan overfitting jika data per kategori sedikit.

**Contoh Data:**

| Color | Height | Troll |
|-------|--------|-------|
| Blue | 1.77 | 1 |
| Red | 1.32 | 0 |
| Green | 1.81 | 1 |
| Blue | 1.56 | 0 |
| Green | 1.64 | 1 |
| Green | 1.61 | 0 |
| Blue | 1.73 | 0 |

**Regression (target = Height):**

| Color | Encoded Value |
|-------|--------------|
| Blue | 1.69 (= mean height of Blue) |
| Red | 1.32 |
| Green | 1.69 |

**Classification (target = Troll):**

| Color | Encoded Value |
|-------|--------------|
| Blue | 0.33 (= P(troll=1 | Blue)) |
| Red | 0 |
| Green | 0.67 |

### Label Encoding

Ganti kategori ordinal (yang punya urutan) dengan angka berurutan.

SD -> 1, SMP -> 2, SMA -> 3, S1 -> 4, S2 -> 5

> Jangan pakai untuk nominal (tidak ada urutan) -- model bisa salah interpretasi "Bandung > Jakarta"!

### Frequency Encoding

Ganti kategori dengan jumlah kemunculannya dalam data. Simple tapi powerful.

| Kota | Frekuensi |
|------|-----------|
| Jakarta | 2 |
| Surabaya | 2 |
| Bandung | 1 |

> Kelemahan: Jakarta & Surabaya sama-sama 2 -> tidak bisa dibedakan!

### Perbandingan Encoding

| Aspek | One-Hot | Target | Label | Frequency |
|-------|---------|--------|-------|-----------|
| Data Type | Nominal | Nominal | Ordinal | Nominal |
| Jumlah Kolom | Bertambah | Tetap | Tetap | Tetap |
| Butuh Target? | Tidak | YA | Tidak | Tidak |
| Overfitting? | Rendah | Tinggi | Rendah | Sedang |
| Info Loss? | Tidak | Tidak | Bisa | Bisa |

---

## Scaling

### Kenapa Perlu Scaling?

Fitur dengan range berbeda jauh bisa mendominasi model. Contoh: Credit Rating (18-21) vs Expenses (1jt-4jt) -> model pikir Expenses lebih penting hanya karena angkanya besar!

Setelah scaling: semua fitur dalam range 0-1.

### Min-Max Scaling

```
x' = (x - min) / (max - min)
```

- Range: [0, 1]
- Min -> 0, Max -> 1
- Sensitif terhadap outlier

### Simple Feature Scaling

```
x' = x / x_max
```

- Range: [0, 1]
- Hanya bagi dengan max
- Min TIDAK jadi 0

### Worked Example: Scaling

Data (Expenses): [1.0M, 2.0M, 1.5M, 2.5M, 4.0M, 2.2M]

min = 1.0M, max = 4.0M

**Min-Max Scaling** (x' = (x - min) / (max - min)):

Contoh: x = 1.0M
- x' = (1000000 - 1000000) / (4000000 - 1000000) = 0 / 3000000 = **0.00**

**Simple Feature Scaling** (x' = x / x_max):

Contoh: x = 1.0M
- x' = 1000000 / 4000000 = **0.25**

| Original | Min-Max | Simple |
|----------|---------|--------|
| 1.0M | 0.00 | 0.25 |
| 2.0M | 0.33 | 0.50 |
| 1.5M | 0.17 | 0.38 |
| 2.5M | 0.50 | 0.63 |
| 4.0M | 1.00 | 1.00 |
| 2.2M | 0.40 | 0.55 |

---

## Text & Bag of Words (BoW)

### Bag of Words (BoW)

Cara mengubah teks -> angka. Pecah jadi kata, hitung frekuensi setiap kata -- urutan tidak penting.

Langkah: Tokenization -> Buat vocabulary -> Hitung frekuensi per dokumen

**Contoh:**

- S1: "I love programming"
- S2: "Programming is fun"
- S3: "I love learning programming and new programming languages"

Vocabulary: [I, love, programming, is, fun, learning, and, new, languages]

| | I | love | programming | is | fun | learning | and | new | languages |
|---|---|------|-------------|----|----|----------|-----|-----|-----------|
| S1 | 1 | 1 | 1 | 0 | 0 | 0 | 0 | 0 | 0 |
| S2 | 0 | 0 | 1 | 1 | 1 | 0 | 0 | 0 | 0 |
| S3 | 1 | 1 | 2 | 0 | 0 | 1 | 1 | 1 | 1 |

### BoW: Kelebihan & Kekurangan

**Kelebihan:**
- Simple & mudah diimplementasi
- Cocok untuk klasifikasi teks dasar
- Tidak perlu deep learning

**Kekurangan:**
- Hilang urutan kata (semantik)
- Sparse matrix (banyak 0)
- Vocabulary besar = dimensi tinggi

---

## Feature Selection

### Curse of Dimensionality

**Hughes Phenomenon**: Menambah fitur TIDAK selalu meningkatkan akurasi! Ada titik optimal -- setelahnya, akurasi justru turun.

Grafik: akurasi naik seiring penambahan fitur hingga titik OPTIMAL (~8 fitur), lalu menurun.

### Kenapa Feature Selection?

- Kurangi dimensi
- Percepat training
- Akurasi lebih baik
- Lebih interpretable

### 3 Metode Feature Selection

| Metode | Deskripsi | Contoh | Kelebihan | Kekurangan |
|--------|-----------|--------|-----------|------------|
| **Filter** | Evaluasi fitur SEBELUM masuk model | Missing Value Ratio, Variance Threshold, Correlation, Chi-Square, Information Gain | Cepat & murah | Tidak lihat interaksi antar fitur |
| **Wrapper** | Coba kombinasi fitur, evaluasi dengan model | Forward Selection, Backward Elimination, Exhaustive, SFFS | Akurat, lihat interaksi | Lambat, mahal komputasi |
| **Embedded** | Feature selection BUILT-IN di algoritma | Decision Tree, Lasso Regression, Random Forest | Balance speed & accuracy | Tergantung algoritma tertentu |

---

## Filter Methods

Evaluasi fitur SEBELUM masuk model ML. Cepat, murah, bagus untuk buang fitur redundan.

### Missing Value Ratio

Fitur yang terlalu banyak data kosong -> buang aja! Tidak informatif.

| Fitur | Missing % | Keputusan |
|-------|-----------|-----------|
| Age | 5% | KEEP |
| Income | 15% | KEEP |
| Phone | 72% | DROP |

### Variance Threshold

Fitur yang hampir tidak bervariasi = tidak berguna. Hitung variance, buang yang rendah.

Penting: normalize dulu! Baru bandingkan variance.

| Fitur | Variance | Keputusan |
|-------|----------|-----------|
| Gender | 0.48 | KEEP |
| Age | 0.35 | KEEP |
| Country | 0.02 | DROP |

### Correlation Coefficient

Cek 2 hal:
1. Korelasi fitur <-> target -- yang rendah bisa dibuang
2. Korelasi fitur <-> fitur -- yang tinggi, ambil salah satu saja

**Contoh Correlation Matrix:**

| | A | B | C |
|---|------|------|------|
| A | 1.00 | 0.92 | 0.12 |
| B | 0.92 | 1.00 | 0.08 |
| C | 0.12 | 0.08 | 1.00 |

- A <-> B = 0.92 -> terlalu mirip, buang salah satu!
- C <-> target rendah -> pertimbangkan buang.

### Chi-Square Test (chi^2)

Untuk fitur kategorikal. Bandingkan nilai observed vs expected. Semakin besar chi^2 -> semakin penting fitur tersebut.

```
chi^2 = Sum((O - E)^2 / E)
```

**Worked Example: Apakah Sex mempengaruhi Survived? (Titanic)**

| Kategori | Observed (O) | Expected (E) | chi^2 |
|----------|-------------|-------------|-------|
| Female Survived | 307 | 158.33 | 139.60 |
| Female Not Survived | 156 | 304.67 | 72.55 |
| Male Survived | 142 | 290.67 | 76.04 |
| Male Not Survived | 708 | 559.33 | 39.52 |

**Total chi^2 = 327.70**

Kesimpulan: Sangat tinggi -> H0 ditolak -> Sex PENTING untuk Survived

### Information Gain

Seberapa banyak ketidakpastian (entropy) berkurang jika kita split data berdasarkan fitur tertentu. Gain tinggi = fitur penting!

**Entropy:**
```
H(X) = -Sum(p(xi) * log2(p(xi)))
```

**Information Gain:**
```
Gain(S, A) = H(S) - Sum((|Sv|/|S|) * H(Sv))
```

#### Worked Example: Information Gain

Dataset: 14 records, 9 Yes, 5 No (target: Buy?)

**1. Parent Entropy H(S):**
```
H(S) = -Sum(p * log2(p))
p(Yes) = 9/14 = 0.6429
p(No) = 5/14 = 0.3571
H(S) = -(0.6429 * log2(0.6429)) - (0.3571 * log2(0.3571))
     = 0.94
```

**2. Child Group Entropies (split by "Age"):**

| Group | Yes | No | Total | Entropy H |
|-------|-----|-----|-------|-----------|
| <=30 | 2 | 3 | 5 | 0.971 |
| 31-40 | 4 | 0 | 4 | 0 (pure node) |
| >40 | 3 | 2 | 5 | 0.971 |

**3. Weighted Entropy:**
```
= (5/14) * 0.971 + (4/14) * 0 + (5/14) * 0.971
= 0.6935
```

**4. Information Gain:**
```
Gain = H(S) - Weighted Entropy
     = 0.94 - 0.6935 = 0.2465
```

---

## Wrapper Methods

Perlakukan feature selection sebagai masalah pencarian. Coba berbagai kombinasi fitur, latih model, evaluasi, ulangi. Lebih akurat tapi MAHAL!

### SFS (Sequential Forward Selection)

Mulai kosong -> tambah fitur terbaik satu per satu.

**Contoh dengan 4 fitur [f1, f2, f3, f4]:**

1. **Iterasi 1:** Tes f1, f2, f3, f4 masing-masing -> f2 menang
2. **Iterasi 2:** Tes f2+f1, f2+f3, f2+f4 -> f2+f3 menang
3. **Iterasi 3:** Tes f2+f3+f1, f2+f3+f4 -> f2+f3+f1 menang

### SBS (Sequential Backward Selection)

Mulai penuh -> buang fitur terburuk satu per satu.

**Contoh dengan 4 fitur [f1, f2, f3, f4]:**

1. **Iterasi 1:** Tes tanpa f1, tanpa f2, tanpa f3, tanpa f4 -> tanpa f1 terbaik (buang f1)
2. **Iterasi 2:** Tes tanpa f4, tanpa f2, tanpa f3 -> tanpa f4 terbaik (buang f4)

> Sequential = tidak bisa backtrack!

### SFFS (Sequential Forward Floating Selection)

Versi lebih pintar dari SFS -- bisa backtrack! "Plus l, take away r" method.

1. **Step 1: Inclusion** -- Tambah fitur paling signifikan ke set X
2. **Step 2: Conditional Exclusion** -- Cek fitur terlemah di X -- kalau bukan yang baru ditambah, buang!
3. **Step 3: Continue Exclusion** -- Terus cek & buang selama performa membaik

### Exhaustive Feature Selection

Coba SEMUA kombinasi fitur -- brute force. Paling optimal tapi paling lambat.

- Dengan 10 fitur: 2^10 = 1,024 kemungkinan kombinasi
- Dengan 50 fitur: 2^50 = 1 quadrillion+ kombinasi

---

## Embedded Methods

Feature selection built-in di dalam algoritma ML itu sendiri. Gabungan kelebihan filter (cepat) dan wrapper (akurat).

### Decision Tree -> Feature Importance

DT secara otomatis pilih fitur terpenting untuk split. Fitur yang tidak dipakai = tidak penting.

**Contoh:**

```
         Suka Soda?
        /          \
      Ya            Tidak
       |              |
   Umur <= 12.5?    Tidak Suka
    /        \
Tidak Suka   Suka!
```

"Suka Popcorn" TIDAK DIPAKAI -> berarti tidak penting menurut DT.

### Lasso Regression

Linear regression yang secara otomatis set weight ke 0 untuk fitur tidak penting.

```
y* = w1*x1 + w2*x2 + ... + wn*xn + d
```

| Fitur | Weight | Status |
|-------|--------|--------|
| x1 (Luas) | 0.85 | Penting |
| x2 (Kamar) | 0.62 | Penting |
| x3 (Warna Cat) | 0.00 | DROP (otomatis oleh Lasso) |
| x4 (Lokasi) | 0.73 | Penting |

Weight besar = fitur penting. Weight 0 = fitur di-drop otomatis oleh Lasso!

### Perbandingan 3 Metode

| Aspek | Filter | Wrapper | Embedded |
|-------|--------|---------|----------|
| Kecepatan | Cepat | Lambat | Sedang |
| Akurasi | Biasa | Tinggi | Tinggi |
| Komputasi | Murah | Mahal | Sedang |
| Interaksi Fitur | Tidak | Ya | Ya |
| Overfitting Risk | Rendah | Tinggi | Sedang |
| Contoh | chi^2, Info Gain | SFS, SBS | DT, Lasso |

---

Now I have all the content from all three files. Here is the extracted markdown:

# Reduksi Dimensi & PCA (Materi 06 -- KASDaD)

## Apa itu Dimensionality Reduction?

Data kamu bisa punya ratusan kolom (fitur), tapi **tidak semua relevan**. Dimensionality reduction = teknik mengurangi jumlah fitur sambil menjaga informasi penting.

- **Tujuan:** Cari representasi berdimensi lebih rendah
- **Metode:** PCA (Principal Component Analysis)
- **Kenapa?** Kurangi noise, hemat komputasi, hindari curse of dimensionality
- **Hubungan:** Fitur yang berkorelasi tinggi bisa digabung jadi 1

## Matriks Kovarian

**Kovarian** mengukur seberapa besar dua variabel berubah bersamaan. **Positif** = naik bareng, **Negatif** = berlawanan arah. **Korelasi** = kovarian yang dinormalisasi (range -1 sampai 1).

### Rumus Kovarian

```
cov(X,Y) = Sigma(xi - x_bar)(yi - y_bar) / N
```

- x_bar = rata-rata X, y_bar = rata-rata Y, N = jumlah data

### Matriks Kovarian Iris Dataset

|          | Sepal L | Sepal W | Petal L | Petal W |
|----------|---------|---------|---------|---------|
| Sepal L  | 0.686   | -0.039  | 1.274   | 0.517   |
| Sepal W  | -0.039  | 0.188   | -0.322  | -0.118  |
| Petal L  | 1.274   | -0.322  | 3.113   | 1.296   |
| Petal W  | 0.517   | -0.118  | 1.296   | 0.582   |

- Diagonal = variansi
- **Tertinggi:** cov(Petal L, Petal W) = 1.296
- **Terendah:** cov(Sepal W, Petal L) = -0.322

## Basis, Dimensi & Koordinat Relatif

- **Basis** = kumpulan vektor yang bebas linier dan merentang seluruh ruang vektor.
- **Dimensi** = jumlah vektor dalam basis = jumlah fitur/kolom pada data.
- Basis yang berbeda menghasilkan **koordinat relatif** yang berbeda untuk titik yang sama!

### Contoh Basis

| Basis       | v1     | v2      | Titik (2,2) dalam standard | Koordinat relatif |
|-------------|--------|---------|----------------------------|--------------------|
| B1 Standard | (1,0)  | (0,1)   | (2,2)                      | (2,2)              |
| B2          | (1,1)  | (1,-1)  | (2,2)                      | (2,0)              |
| B3          | (1,3)  | (2,1)   | (2,2)                      | (?,?)              |

Contoh: (2,2) = 2*(1,1) + 0*(1,-1) pada basis B2

## Transformasi Linier

Mengubah koordinat dari satu basis ke basis lain = **transformasi linier**. Bisa dinyatakan sebagai **perkalian matriks**: T(u) = [T] * u

### Contoh: Dari B1 standar ke B2 = {(1,1), (1,-1)}

```
[T] = | 0.5   0.5 |
      | 0.5  -0.5 |
```

**Cara cari [T]:** gabung vektor basis menjadi matriks, lalu **inverskan**.

## Nilai & Vektor Eigen

### Persamaan Fundamental

```
Av = lambda * v
```

- **v** = vektor eigen (arah yang **tidak berubah** setelah transformasi)
- **lambda** = nilai eigen (faktor penskalaan)

### Properti

1. Hanya untuk matriks persegi (n x n)
2. Maks punya n nilai eigen
3. Eigenvectors dari lambda berbeda selalu bebas linier
4. Jika A simetri, eigenvectors saling orthogonal

## Diagonalisasi Matriks

**Tujuan:** Ubah matriks kovarian menjadi matriks diagonal (kovarian antar-fitur = 0). Ini artinya fitur-fitur baru **tidak saling berkorelasi!**

### Persamaan Kunci

```
D = P^(-1) * C * P
```

- **C** = Matriks kovarian awal
- **P** = Matriks eigenvectors
- **D** = Matriks diagonal (eigenvalues)

### Visualisasi

**SEBELUM:** Matriks dengan var di diagonal dan cov di off-diagonal (ada korelasi)

**SESUDAH:** Matriks diagonal dengan lambda1, lambda2, lambda3 di diagonal dan 0 di off-diagonal (independen!)

## 5 Langkah PCA

### Step 1: Standarisasi
Kurangi setiap nilai dengan mean kolomnya sehingga mean jadi 0.
```
DataAdjust = Data - mean
```

### Step 2: Hitung Kovarian
Hitung matriks kovarian dari data yang sudah distandarisasi. Matriks berukuran n x n (n = jumlah fitur).

### Step 3: Cari Eigen
Hitung eigenvalue & eigenvector dari matriks kovarian. Eigenvectors = arah principal components.

### Step 4: Urutkan Eigen
Urutkan eigenvalue dari terbesar ke terkecil. Eigenvalue terbesar = PC paling penting.

### Step 5: Transformasi
Kalikan data dengan matriks transformasi [T].
```
x' = [T] * x  (fitur baru!)
```

### Worked Example

**Original data:**
```
(2.5, 2.4), (0.5, 0.7), (2.2, 2.9), (1.9, 2.2), (3.1, 3.0)
```

**Adjusted (mean-centered):**
```
(0.69, 0.49), (-1.31, -1.21), (0.39, 0.99), (0.09, 0.29), (1.29, 1.09)
```

**Transformed (after PCA):**
```
(-0.828, -0.175), (1.778, 0.143), (-0.992, 0.384), (-0.274, 0.130), (-1.676, -0.209)
```

Eigenvalues: PC1 lambda = 1.284, PC2 lambda = 0.049

## Explained Variance

**Berapa PC yang harus dipilih?** Lihat explained variance! Pilih sejumlah PC yang kumulatifnya mencapai ~90-95%.

### Formula

```
EV_k = lambda_k / (lambda_1 + lambda_2 + ... + lambda_n)
```

### Worked Example (2D data)

- lambda_1 = 1.284, lambda_2 = 0.049
- Total eigenvalue = 1.284 + 0.049 = 1.333
- EV_1 = 1.284 / 1.333 = **96.3%**
- EV_2 = 0.049 / 1.333 = **3.7%**

### Contoh dataset 8 dimensi

Eigenvalues: [4.2, 1.8, 0.6, 0.3, 0.15, 0.08, 0.05, 0.02]

| PC  | Individual % | Cumulative % |
|-----|-------------|--------------|
| PC1 | 58%         | 58%          |
| PC2 | 25%         | 83%          |
| PC3 | 8%          | 91%          |
| PC4 | 4%          | 95%          |
| PC5 | 2%          | 97%          |
| PC6 | 1%          | 98%          |
| PC7 | ~1%         | ~99%         |
| PC8 | ~0%         | 100%         |

Pilih 3 PC pertama sudah cukup! (91% variance explained, threshold 90%)

## Aplikasi: Face Recognition (Eigenfaces)

PCA dipakai untuk **eigenfaces** -- representasi wajah menggunakan komponen utama.

- Dataset LFW: gambar 50x37 pixel = **1850 dimensi per gambar!**
- Setelah PCA: **150 dimensi** (hanya 8.1%)
- **95.5% informasi tetap terjaga!**

### Cara kerja Eigenfaces

```
Wajah = c0*E0 + c1*E1 + ... + c149*E149
```

Setiap wajah = kombinasi linear dari 150 eigenfaces (basis baru).

### Insight Penting

Eigenface pertama menangkap fitur umum (pencahayaan, bentuk wajah). Eigenface terakhir menangkap noise/detail kecil. Dengan membuang eigenface terakhir, kita mengurangi noise sekaligus menghemat memori & komputasi.

## UTS Prep -- PCA Cheat Sheet

### Insight Penting dari Asistensi

**Shortcut:** Eigenvector matrix ortogonal maka **inverse = transpose!** Jadi kalau soal kasih eigenvectors, tinggal transpose aja buat matriks transformasi.

**Tapi:** Kalau soal kasih raw data (bukan eigenvalues), kamu harus hitung eigen dari awal: center data -> covariance matrix -> det(C - lambda*I) = 0 -> eigenvalues -> eigenvectors.

### Di UTS, soal PCA bisa 2 bentuk:

#### Case 1: Eigenvalues DIBERIKAN

Soal kasih eigenvalues langsung maka hitung EV + pilih PC.

```
EV_k = lambda_k / sum(lambda) x 100%
Kumulatif sampai >= target %
Pilih k PC pertama
```

**Worked Example:**
```
lambda = [4.5, 3.0, 2.5, 1.5, 1.0, 0.5]
Total = 13.0
EV1 = 4.5/13 = 34.6%
EV2 = 3.0/13 = 23.1%  -> kum: 57.7%
EV3 = 2.5/13 = 19.2%  -> kum: 76.9%
EV4 = 1.5/13 = 11.5%  -> kum: 88.5%
EV5 = 1.0/13 = 7.7%   -> kum: 96.2% (>= 90%)
```

**JEBAKAN:** Dimensi direduksi = 5/6 = 83%. 96.2% itu EXPLAINED VARIANCE, bukan % dimensi!

#### Case 2: Raw Data DIBERIKAN

Soal kasih data mentah maka full pipeline dari scratch:

1. Center data: x - mean
2. Covariance matrix (m x m)
3. det(C - lambda*I) = 0 -> cari eigenvalues
4. Eigenvectors dari tiap lambda
5. Sort descending, lambda terbesar dulu
6. Transform: T x data_centered

**Worked Example:**
```
Data: X1=[1,2,3], X2=[2,4,5]
Mean: mu1=2, mu2=3.67
Centered: X1'=[-1,0,1], X2'=[-1.67,0.33,1.33]

Cov = [Var(X1)    Cov(X1,X2)]  = [1.0   1.5 ]
      [Cov(X1,X2) Var(X2)    ]    [1.5   2.33]

det(C - lambda*I) = (1-lambda)(2.33-lambda) - 1.5^2 = 0
lambda^2 - 3.33*lambda + 2.33 - 2.25 = 0
lambda^2 - 3.33*lambda + 0.08 = 0
-> lambda_1 ~ 3.31, lambda_2 ~ 0.02

EV1 = 3.31/3.33 = 99.4%
1 PC cukup!

Shortcut: Eigenvector matrix ortogonal
-> inverse = TRANSPOSE
-> T = E^T (tidak perlu hitung inverse!)
```

### Quick Reference: Jebakan UTS

| Jebakan | Koreksi |
|---------|---------|
| EV 73% = dimensi berkurang 73% | SALAH! EV bukan % dimensi. 1 PC dari 4 = 25% dimensi, 73% info. |
| Yang didiagonalisasi = matriks input | SALAH! Yang didiagonalisasi = COVARIANCE MATRIX (m x m), bukan data (n x m). |
| PCA = feature selection | SALAH! PCA = feature EXTRACTION (buat fitur BARU), bukan pilih yang ada. |
| Inverse eigenvector matrix sulit | Eigenvectors ortogonal maka inverse = TRANSPOSE! Tinggal flip rows<->cols. |
| PC berkorelasi satu sama lain | SALAH! PC selalu ORTOGONAL (covariance = 0). Itu tujuan PCA. |

---

# CART -- Classification & Regression Tree (Materi 07 -- KASDaD)

## Overview: Apa itu CART?

**Classification & Regression Tree** -- Decision tree yang bisa digunakan untuk **classification** (output diskret) dan **regression** (output kontinu). Analoginya seperti program `if-then-else` yang besar.

### Supervised Learning

- **Input (X):** Fitur-fitur data
- **Output (Y):** Label/Nilai target
- **Training:** Belajar pola X -> Y
- **Prediksi:** Estimasi Y baru

## Learning Methods

| Metode | Deskripsi | Contoh | Flow | Key Point |
|--------|-----------|--------|------|-----------|
| Supervised | Belajar dari data yang sudah ada label/jawaban | Classification, Regression | Input + Label -> Model -> Prediksi | CART termasuk di sini! |
| Unsupervised | Belajar dari data TANPA label -- cari pola sendiri | Clustering, Dimensionality Reduction | Input (tanpa label) -> Model -> Pola/Grup | Hasil bisa berbeda-beda |
| Semi-supervised | Gabungan: sebagian data ada label, sebagian tidak | Label Propagation, Self-Training | Sedikit Label + Banyak Unlabeled -> Model | Hemat biaya labeling |
| Reinforcement | Belajar dari reward/punishment atas aksi yang dilakukan | Game AI, Robot Control | Aksi -> Reward/Punishment -> Perbaiki | Trial and error |

### Classification vs Regression

- **Classification:** Output Y = **diskret** (kategori). Contoh: Spam/Not Spam, Kucing/Anjing, Iya/Tidak
- **Regression:** Output Y = **kontinu** (angka). Contoh: Harga Rumah, Nilai Ujian, Temperatur

## Struktur CART (Anatomi Decision Tree)

- **Internal Node:** Tempat pengujian/pertanyaan terhadap suatu variabel input. Contoh: "Umur <= 12.5?"
- **Edge (Cabang):** Representasi nilai-nilai yang mungkin dari variabel input. Contoh: "Ya" / "Tidak", atau "<= t" / "> t"
- **Leaf Node:** Node akhir yang memberikan output/prediksi. Di classification = kelas, di regression = rata-rata nilai.

## Algoritma CART -- Step by Step

1. **Kumpulkan Data di Node:** Di node i, kumpulkan semua data (examples) yang "sampai" di node tersebut. Di root node, semua data training ada di sini. Formula: D_i = {(x_n, y_n) yang ada di N_i}

2. **Coba Semua Split:** Untuk SETIAP variabel input j dan SETIAP kemungkinan nilai t, coba bagi data jadi 2 kelompok. Formula: D_i^1(j,t) dan D_i^2(j,t)

3. **Hitung Cost Tiap Split:** Hitung cost (Gini/Entropy/MSE) untuk tiap kemungkinan split. Cost rendah = split bagus! Formula: (|D^1|/|D|) * cost(D^1) + (|D^2|/|D|) * cost(D^2)

4. **Pilih Split Terbaik:** Pilih pasangan (variabel j, threshold t) yang menghasilkan cost PALING KECIL. Formula: arg min cost(split)

5. **Buat Node Anak:** Split data jadi 2 node anak berdasarkan split terbaik. Ulangi dari langkah 1 untuk tiap anak! Formula: D_i1 = D^1, D_i2 = D^2

6. **Berhenti Ketika...** Node sudah pure (semua data sama labelnya), atau tidak ada variabel tersisa, atau hyperparameter tercapai. Formula: cost(D_i) = 0 maka menjadi leaf node

### Tipe Split

**Variabel Numerik:** Split berdasarkan threshold: `x_j <= t` vs `x_j > t`. Split point = midpoint antara nilai-nilai yang ada. Misal: 7, 12, 18 maka split points = {9.5, 15}

**Variabel Kategorikal:** Split berdasarkan nilai: `x_j = t` vs `x_j != t`. Jika k nilai berbeda maka k binary split berbeda, atau 1 multi-way split maka k cabang.

**PENTING: CART = GREEDY.** CART memilih split terbaik di SETIAP node secara lokal. Tidak melihat ke depan! Artinya hasilnya mungkin bukan global optimum, tapi prosesnya cepat.

## Cost Functions

### Gini Index

Mengukur seberapa "campur" sebuah node. Makin kecil = makin murni (bagus!)

```
G = 1 - sum(p_c^2)
```

dimana p_c = proporsi data kelas c di node tersebut.

| Kondisi | Distribusi | Gini |
|---------|-----------|------|
| Pure node | [4, 0] | G = 1 - 1^2 = **0** |
| Agak campur | [3, 1] | G = 1 - (3/4)^2 - (1/4)^2 = **0.375** |
| Sangat campur | [2, 2] | G = 1 - (1/2)^2 - (1/2)^2 = **0.5** |

**Cara hitung cost split:**
```
cost(split) = (n1/N) * G1 + (n2/N) * G2
```
n1, n2 = jumlah data di tiap anak, N = total data di parent

#### Worked Example: Gini

Node dengan 3 Iya + 1 Tidak (4 data):
```
Kelas "Iya": p1 = 3/4 = 0.75
Kelas "Tidak": p2 = 1/4 = 0.25
G = 1 - (p1^2 + p2^2)
  = 1 - (0.75^2 + 0.25^2)
  = 1 - (0.5625 + 0.0625)
  = 1 - 0.625 = 0.375
```

#### Worked Example: Cost Split (Gini)

Parent: 7 data. Split "Suka Soda":
```
Anak 1 (Iya): 4 data -> 3 Iya + 1 Tidak -> G1 = 0.375
Anak 2 (Tidak): 3 data -> 0 Iya + 3 Tidak -> G2 = 0
cost = (4/7) * 0.375 + (3/7) * 0
     = 0.571 * 0.375 + 0
     = 0.214
```

### Entropy (Deviance/Impurity)

Alternatif dari Gini. Mengukur "ketidakpastian" di sebuah node.

```
H = -sum(p_c * log(p_c))
```

- Entropy = 0 artinya node pure
- Makin besar = makin campur

| Kondisi | Distribusi | Entropy |
|---------|-----------|---------|
| Pure | [4, 0] | H = **0** |
| Max impure | [2, 2] | H = **1.0** (log base 2) |

**Gini vs Entropy:** Keduanya mengukur "kemurnian" node. Gini lebih cepat dihitung, Entropy lebih sensitif terhadap perubahan probabilitas. Dalam praktik, hasilnya sering mirip.

#### Worked Example: Entropy

Node dengan 2 Iya + 2 Tidak (4 data):
```
p1 = 2/4 = 0.5, p2 = 2/4 = 0.5
H = -(0.5 * log2(0.5)) - (0.5 * log2(0.5))
  = -(0.5 * -1) - (0.5 * -1)
  = 0.5 + 0.5 = 1.0 (max impurity)
```

Node dengan 3 Iya + 1 Tidak:
```
p1 = 3/4 = 0.75, p2 = 1/4 = 0.25
H = -(0.75 * log2(0.75)) - (0.25 * log2(0.25))
  = -(0.75 * -0.415) - (0.25 * -2.0)
  = 0.311 + 0.5 = 0.811
```

### Mean Squared Error (MSE) -- for Regression Tree

Mengukur seberapa jauh nilai-nilai dari rata-ratanya.

```
cost(D) = (1/|D|) * sum((y_n - y_bar)^2)
```

y_bar = rata-rata nilai output di node tersebut.

| Kondisi | Data | MSE |
|---------|------|-----|
| Nilai mirip | [74, 75, 73], y_bar=74 | **0.67** |
| Nilai bervariasi | [23, 42, 11], y_bar=25.3 | **161.6** |

**Leaf node value:** Di regression tree, leaf node mengembalikan **rata-rata** nilai output dari semua data di node tersebut.

## Classification Tree -- Full Walkthrough

### Data Training (7 data, prediksi siapa suka Ice Age)

| No | Popcorn | Soda | Umur | Ice Age |
|----|---------|------|------|---------|
| 1  | Iya     | Iya  | 7    | Tidak   |
| 2  | Iya     | Tidak| 12   | Tidak   |
| 3  | Tidak   | Iya  | 18   | Iya     |
| 4  | Tidak   | Iya  | 35   | Iya     |
| 5  | Iya     | Iya  | 38   | Iya     |
| 6  | Iya     | Tidak| 50   | Tidak   |
| 7  | Tidak   | Tidak| 83   | Tidak   |

### Step-by-Step Construction

**Step 1:** Data Training -- 7 data. 3 input: Suka Popcorn, Suka Soda, Umur. 1 output: Suka Ice Age (Iya/Tidak).

**Step 2:** Hitung Cost: Split "Suka Popcorn" -- Iya->{1,2,5,6}: 1 Iya + 3 Tidak. Tidak->{3,4,7}: 2 Iya + 1 Tidak. **Cost = 0.405**

**Step 3:** Hitung Cost: Split "Suka Soda" -- Iya->{1,3,4,5}: 3 Iya + 1 Tidak, G=0.375. Tidak->{2,6,7}: 0 Iya + 3 Tidak, G=0. Total = (4/7)(0.375) + (3/7)(0) = **0.214 (Terbaik!)**

**Step 4:** Hitung Cost: Split "Umur" (best = 15 atau 44) -- Dicoba semua midpoint: 9.5, 15, 26.5, 36.5, 44, 66.5. Cost terendah di t=15 atau t=44. **Cost = 0.343**

**Step 5:** Root Split -> Suka Soda! -- Minimum cost = 0.214. Cabang "Tidak" -> semua Tidak suka Ice Age -> LEAF. Cabang "Iya" masih campur -> lanjut split.

**Step 6:** Split Cabang "Iya" -> Umur <= 12.5 -- Data {1,3,4,5}. Coba Popcorn -> cost 0.25. Coba Umur t=12.5 -> cost 0. Pilih Umur! Semua node anak sudah pure -> jadi LEAF.

### Hasil Akhir: Classification Tree

```
           Suka Soda?
          /          \
        Iya         Tidak
         |            |
    Umur <= 12.5?   Tidak Suka
      /       \
    Ya        Tidak
     |          |
  Tidak Suka   Suka!
```

**Prediksi contoh:** Suka Popcorn=Iya, Suka Soda=Iya, Umur=31 -> Suka Soda? Iya -> Umur <= 12.5? 31 > 12.5 -> Tidak -> **Suka Ice Age!**

## Regression Tree -- Full Walkthrough

### Data: Prediksi Nilai Ujian

| # | Video Tutorial | Lab Lengkap? | Ujian |
|---|----------------|-------------|-------|
| 1 | Semua          | Iya         | 74    |
| 2 | Sebagian       | Tidak       | 23    |
| 3 | Semua          | Iya         | 61    |
| 4 | Semua          | Iya         | 74    |
| 5 | Sebagian       | Tidak       | 25    |
| 6 | Semua          | Iya         | 61    |
| 7 | Sebagian       | Iya         | 54    |
| 8 | Sebagian       | Tidak       | 42    |

### Split Comparison

**Split: Video Tutorial**
- Semua -> y_bar=69.67, MSE=37.89
- Sebagian -> y_bar=29.56, MSE=265.8
- **Cost = 174.6**

**Split: Lab Lengkap (Terbaik!)**
- Iya -> y_bar=65.88, MSE=71.61
- Tidak -> y_bar=22.43, MSE=113.1
- **Cost = 90.97**

### Hasil: Regression Tree

```
            Lab Lengkap?
           /            \
         Iya           Tidak
          |              |
   Video Tutorial?   Video Tutorial?
     /       \         /       \
  Semua  Sebagian   Semua  Sebagian
    |        |        |        |
  y=71.4  y=56.67   y=?    y=22.43
```

### Perbedaan dengan Classification

1. Cost function = **MSE** (bukan Gini/Entropy)
2. Leaf mengembalikan **rata-rata** nilai output (bukan kelas mayoritas)
3. Leaf kosong? -> gunakan rata-rata dari parent node

## Hyperparameters

### Parameter vs Hyperparameter

- **Parameter:** Dipelajari **SELAMA** training. Contoh: struktur tree, split points.
- **Hyperparameter:** Ditentukan **SEBELUM** training. Mengontrol proses learning.

### Daftar Hyperparameters

| Hyperparameter | Deskripsi | Risiko | Safe Default |
|---------------|-----------|--------|-------------|
| max_depth | Kedalaman maksimum tree. Makin dalam = makin detail tapi risiko overfit. | Terlalu dalam -> overfit | Mulai dari 3-5 |
| min_samples_split | Minimum data di node agar boleh di-split lagi. | Terlalu kecil -> overfit | Default: 2 |
| min_samples_leaf | Minimum data agar bisa jadi leaf node. | Terlalu kecil -> leaf terlalu spesifik | Default: 1 |
| max_features | Jumlah fitur yang dipertimbangkan saat split. | Terlalu sedikit -> miss pattern | None = semua |
| max_leaf_nodes | Batas maksimum jumlah leaf dalam tree. | Terlalu banyak -> overfit | None = unlimited |

## Pros & Cons

### Kelebihan

- Mudah diinterpretasi (bisa dibaca seperti if-then-else)
- Bisa handle mix data (diskret + kontinu sekaligus)
- Tidak perlu standardisasi (split berdasarkan ranking, bukan skala)
- Otomatis feature selection (fitur tidak relevan tidak dipilih)
- Robust terhadap outlier (split point = ranking, bukan nilai absolut)
- Cepat & scalable (training & prediksi sangat efisien)
- Handle missing values (bisa pakai surrogate splits)

### Kekurangan

- Akurasi lebih rendah (karena greedy, bukan globally optimal)
- Tidak stabil / high variance (perubahan kecil di data -> tree berubah banyak)
- Nonlinear model (sulit memisahkan data yang linearly separable)
- Risiko overfitting (tree bisa terlalu dalam, hafal data training)

### Isu Penting

- **Missing Values:** Solusi: **Imputation** saat preprocessing, atau pakai **surrogate splits** (split alternatif yang hasilnya mirip).
- **Data Fragmentation:** Multi-way split bisa menyebabkan sub-tree dengan **data terlalu sedikit** -> overfitting. Solusi: batasi dengan hyperparameters.

---

# Random Forests (Materi 08 -- KASDaD)

## CART Recap

### Apa itu CART? (Classification & Regression Trees)

Struktur decision tree:
- **Internal Node:** Pertanyaan/tes terhadap fitur input
- **Edge/Cabang:** Kemungkinan jawaban dari pertanyaan
- **Leaf Node:** Prediksi akhir (output)

### Kelemahan CART yang Harus Diatasi

- **High Variance:** Perubahan kecil di data -> tree bisa berubah total
- **Mudah Overfit:** Tree terlalu dalam -> hafal noise di training data
- **Greedy:** Tiap split ambil keputusan terbaik lokal, bukan global optimal

**Solusi: Gabungkan BANYAK tree -> Random Forest!**

## Ensemble Learning

### Ensemble = Kekuatan Gabungan

Bayangkan kamu tanya 100 orang soal jawaban kuis. Satu orang mungkin salah, tapi **mayoritas kemungkinan besar benar**. Itu prinsip ensemble!

- **Single Tree:** 1 prediksi -> bisa salah
- **Ensemble:** N prediksi -> ambil mayoritas

### Cara Menggabungkan Prediksi

#### Averaging (Regresi)

```
f(y|x) = (1/M) * sum(f_m(y|x))
```
M = jumlah base model, f_m = prediksi model ke-m. Hasil akhir = rata-rata semua prediksi.

#### Majority Vote (Klasifikasi)

```
y_hat = mode(y_hat_1, y_hat_2, ..., y_hat_M)
```
mode = nilai yang paling sering muncul. Pilih kelas yang diprediksi mayoritas tree.

#### Stacking (Weighted)

```
f(y|x) = sum(w_m * f_m(y|x))
```
w_m = bobot model ke-m. Model yang lebih akurat diberi bobot lebih tinggi.

### Bagging (Bootstrap Aggregating)

Metode ensemble sederhana: latih M model dengan **sampel data yang berbeda-beda** (via bootstrap sampling), lalu gabungkan hasilnya.

Sampling **dengan pengembalian** -- data bisa muncul lebih dari sekali! Rata-rata tiap sample melihat **~63%** data asli, sisanya **~37%** jadi out-of-bag.

#### Contoh Bootstrap

Original (N=4): [A, B, C, D]

| Sample | Data |
|--------|------|
| Sample #1 | [B, A, D, D] |
| Sample #2 | [C, C, A, B] |
| Sample #3 | [A, D, B, A] |

**Kelebihan Bagging:** Mencegah ketergantungan berlebihan pada satu data -> lebih robust & general

**Catatan:** Bagging tidak selalu meningkatkan kinerja -- tergantung base model & data

## Random Forest -- Bagaimana Cara Kerjanya?

Random Forest = **Bagging** + **Random Feature Selection**. Bukan cuma data yang diacak, tapi juga fitur yang dipakai tiap split!

### Pipeline

1. **Original Data:** Dataset asli (N baris, D fitur)
2. **Bootstrap Sampling:** Ambil N sampel acak (dengan pengembalian)
3. **Build Trees:** Bangun tree, tiap split pilih d fitur acak
4. **Aggregate:** Voting (klasifikasi) / Rata-rata (regresi)

### 3 Langkah Membangun Random Forest

#### Step 1: Bootstrap Sampling

Dari N data asli, ambil N data secara acak DENGAN pengembalian. Jadi data bisa duplikat! ~63% data terpakai, sisanya ~37% jadi out-of-bag (bisa dipakai sebagai test set).

#### Step 2: Random Feature Selection

Saat membangun tree, di setiap node/split, hanya d fitur acak yang dipertimbangkan (dari total D fitur).
- **Klasifikasi:** d = sqrt(D)
- **Regresi:** d = D/3

Setiap node di setiap tree hanya melihat **subset acak** dari fitur -- bukan semua!

#### Step 3: Voting / Averaging

- Untuk **klasifikasi:** ambil majority vote dari semua tree
- Untuk **regresi:** rata-ratakan prediksi semua tree

### Hyperparameters Random Forest

| Hyperparameter | Deskripsi | Importance |
|---------------|-----------|------------|
| n_estimators | Jumlah tree dalam forest | High |
| max_samples | Ukuran bootstrap sample per tree | Medium |
| max_features | Jumlah fitur acak per split (d) | High |
| max_depth | Kedalaman maksimum setiap tree | High |
| min_samples_split | Min data untuk bisa split node | Medium |
| min_samples_leaf | Min data di setiap leaf node | Medium |

## Performance

### Test Error vs Jumlah Tree

Semakin banyak tree, error cenderung menurun dan stabil (tapi butuh waktu lebih lama).

| Trees | Random Forest | Boosting | Bagging |
|-------|--------------|----------|---------|
| 10    | 0.0625       | 0.0615   | 0.058   |
| 50    | 0.057        | 0.057    | 0.054   |
| 100   | 0.050        | 0.047    | 0.054   |
| 200   | 0.049        | 0.047    | 0.056   |
| 300   | 0.050        | 0.046    | 0.055   |
| 400   | 0.048        | 0.045    | 0.055   |
| 500   | 0.047        | 0.045    | 0.057   |

### Mengapa Random Forest Bekerja?

> "Nobody knows everything, but everybody knows something."

- **Mayoritas Benar:** Walaupun ada tree yang salah, mayoritas tree biasanya memprediksi benar -> voting menghasilkan jawaban tepat
- **Error Tidak Sinkron:** Karena sampling & fitur acak, tree yang berbeda membuat error di tempat yang BERBEDA -> saling menutupi
- **Variance Berkurang:** Rata-rata dari banyak model high-variance -> model ensemble dengan variance lebih rendah (bias tetap sama)

### Decision Tree vs Random Forest

| Metric | Single Decision Tree | Random Forest |
|--------|---------------------|---------------|
| Interpretability | Tinggi | Rendah |
| Akurasi | Rendah | Tinggi |
| Overfitting Risk | Tinggi | Rendah |
| Variance | Tinggi | Rendah |
| Kecepatan | Cepat | Sedang |

### Kelebihan Random Forest

- Serbaguna (klasifikasi & regresi)
- Hyperparameter mudah dipahami
- Tidak overfit dengan cukup tree
- Robust terhadap outlier & noise

### Kekurangan Random Forest

- Lebih banyak tree = lebih lambat
- Sulit diinterpretasi (bukan 1 tree lagi)
- Tidak bisa jelaskan hubungan antar fitur
- Butuh lebih banyak memori & komputasi

### Poin Kritis untuk UTS

1. RF = Bagging + Random Feature Selection. Dua sumber randomness!
2. Bootstrap sampling = sampling DENGAN pengembalian, ~63% data terpakai
3. Out-of-bag (~37%) bisa digunakan sebagai validasi tanpa perlu split data terpisah
4. Untuk klasifikasi: majority vote. Untuk regresi: averaging
5. Bagging menurunkan VARIANCE, bukan bias. Bias tetap sama seperti base model
6. Base model boosting = high bias (weak learner). Base model bagging = high variance
7. Boosting TIDAK bisa diparalelkan (sequential). Bagging/RF BISA diparalelkan
8. Semakin random fitur yang dipilih -> tree semakin tidak berkorelasi -> ensemble semakin kuat

---

Now I have all the content. Here is the extracted markdown:

# K-Nearest Neighbor (KNN)

## Apa itu KNN?

### Lazy Learning vs Eager Learning

**Lazy Learning (KNN)**
- "Males belajar dulu, nanti aja kalau ditanya"
- KNN tidak membuat model saat training. Ia hanya menyimpan semua data.
- Proses prediksi baru terjadi saat ada data test masuk. Makanya disebut **instance-based learning**.

**Eager Learning (pembanding)**
- "Belajar dulu baru jawab soal"
- Decision Tree, Random Forest membangun model saat training.
- Training lambat, tapi prediksi cepat.
- Kebalikan dari KNN yang training cepat tapi prediksi lambat.

### Cara Kerja KNN -- Step by Step

1. **Simpan Data Training** -- KNN tidak "belajar" model. Semua data training disimpan apa adanya.
2. **Data Baru Masuk** -- Saat ada data baru yang perlu diprediksi, baru proses dimulai.
3. **Hitung Jarak** -- Hitung jarak data baru ke SEMUA data training.
4. **Pilih K Terdekat** -- Ambil K data training yang paling dekat (nearest neighbors).
5. **Voting / Rata-rata** -- Classification: mayoritas vote. Regression: rata-rata nilai.

## Distance Metrics

### Euclidean Distance

**Formula:** `D(p,q) = sqrt( sum(pk - qk)^2 )`

**Analogi:** Jarak garis lurus antara 2 titik. Bayangkan burung terbang langsung dari A ke B.

**Kapan pakai?** Fitur numerik kontinu, skala seragam.

**Contoh perhitungan:**
```
p(1,2,3), q(4,5,6)
D = sqrt((1-4)^2 + (2-5)^2 + (3-6)^2)
  = sqrt(9 + 9 + 9) = sqrt(27) ~ 5.196
```

### Manhattan Distance

**Formula:** `d(p,q) = sum|pi - qi|`

**Analogi:** Jarak "jalanan kota" -- hanya bisa jalan lurus horizontal/vertikal. Seperti navigasi di grid kota Manhattan, NY.

**Kapan pakai?** Data grid-like, fitur independen.

**Contoh perhitungan:**
```
p(1,2,3), q(4,5,6)
d = |1-4| + |2-5| + |3-6|
  = 3 + 3 + 3 = 9
```

### Cosine Similarity

**Formula:** `cos(p,q) = (p . q) / (||p|| x ||q||)`

**Analogi:** Mengukur sudut antara 2 vektor. Tidak peduli panjang vektor, hanya arahnya. Cocok untuk teks & dokumen.

**Kapan pakai?** Text similarity, dokumen, rekomendasi.

**Contoh perhitungan:**
```
p(1,2,3), q(4,5,6)
cos = (1x4 + 2x5 + 3x6) / (sqrt(14) x sqrt(77))
    = 32 / 32.83 ~ 0.975
```

### Jaccard Similarity

**Formula:** `J(p,q) = |p intersection q| / |p union q|`

**Analogi:** Persentase kecocokan antara 2 himpunan. "Berapa banyak yang sama dibanding total semua?"

**Kapan pakai?** Data biner (beli/tidak), set membership.

**Contoh perhitungan:**
```
C1 = {item2, item6, item9}
C3 = {item1, item2, item6}
J = |{item2,item6}| / |{item1,item2,item6,item9}|
  = 2/4 = 0.5
```

### Perbandingan Visual Jarak

Titik A (1,1) ke B (5,4):
- **Euclidean** = sqrt(16+9) ~ 5
- **Manhattan** = 4+3 = 7

## KNN Classification

Klasifikasi KNN menggunakan **majority voting** -- label yang paling banyak muncul di antara K tetangga terdekat menjadi prediksi.

### Worked Example: Salary Rank vs Spending Score

**Data training:**

| ID | SR | SS | Type |
|----|----|----|------|
| 1  | 4  | 10 | A    |
| 2  | 5  | 20 | A    |
| 3  | 5  | 12 | A    |
| 4  | 6  | 15 | B    |
| 5  | 6  | 17 | B    |
| 6  | 3  | 20 | C    |
| 7  | 4  | 14 | C    |
| 8  | 5  | 15 | C    |
| 9  | 6  | 16 | D    |
| 10 | 6  | 20 | D    |
| 11 | 5  | 10 | D    |
| 12 | 7  | 18 | D    |

**Test point:** (SR=5, SS=22), using Manhattan distance

Distances are computed as `|SR - 5| + |SS - 22|`, sorted, and the K nearest neighbors vote on the class label.

## KNN Regression

### Perbedaan dengan Classification

| | Classification | Regression |
|---|---|---|
| Output | Label/Kategori | Angka Kontinu |
| Metode | Majority Voting | Rata-rata Nilai |

### Rumus Prediksi Regresi

`y_hat = (1/k) x sum(yi)`

Prediksi = rata-rata nilai target dari K tetangga terdekat.

### Worked Example: Prediksi Harga Rumah (K=3, Euclidean)

**Data baru:** Luas 125m^2, 3 kamar, 4 bath, 15km dari pusat kota.

| ID | Luas | Kamar | Bath | Jarak | Harga (Jt) | Euclidean |
|----|------|-------|------|-------|-------------|-----------|
| 2  | 120  | 4     | 3    | 10    | 1700        | 7.21      |
| 5  | 150  | 3     | 2    | 15    | 1800        | 25.08     |
| 1  | 100  | 3     | 2    | 5     | 1500        | 27.00     |
| 6  | 90   | 2     | 1    | 12    | 1000        | 35.27     |
| 3  | 80   | 2     | 1    | 7     | 1200        | 45.81     |
| 4  | 200  | 5     | 4    | 3     | 3000        | 75.98     |

**Detail Perhitungan Euclidean Distance:**

```
d(query, ID2) = sqrt((125-120)^2 + (3-4)^2 + (4-3)^2 + (15-10)^2)
              = sqrt(25 + 1 + 1 + 25)
              = sqrt(52) = 7.21
```

**3 terdekat:** ID2 (1700), ID5 (1800), ID1 (1500)

**Prediksi:** (1700 + 1800 + 1500) / 3 = **1667 Juta IDR**

## Normalisasi Data

### Kenapa Normalisasi Penting?

**Tanpa Normalisasi:**
```
Feature 1: range 1-2, Feature 2: range 100-200
Data: [1, 150] -> A    [2, 110] -> B
Test: [1, 100] -> True class: A

D(test, A) = sqrt((1-1)^2 + (100-150)^2) = sqrt(0 + 2500) = 50
D(test, B) = sqrt((1-2)^2 + (100-110)^2) = sqrt(1 + 100) = 10.05

Prediksi: B -> SALAH!
```
Feature 2 (range besar) mendominasi perhitungan jarak. Feature 1 jadi tidak berpengaruh!

**Dengan Normalisasi:**
```
Semua feature di-scale ke range yang sama (misal /100)
Data: [1, 1.5] -> A    [2, 1.1] -> B
Test: [1, 1.0] -> True class: A

D(test, A) = sqrt((1-1)^2 + (1-1.5)^2) = sqrt(0 + 0.25) = 0.5
D(test, B) = sqrt((1-2)^2 + (1-1.1)^2) = sqrt(1 + 0.01) = 1.004

Prediksi: A -> BENAR!
```
Sekarang kedua feature punya pengaruh seimbang dalam menghitung jarak!

## Feature Encoding

### Label Encoding

Setiap kategori diberi angka urut. Simple, tapi bisa bermasalah karena model bisa "mengira" ada urutan/jarak antar kategori.

| Kategori | Nilai |
|----------|-------|
| Action   | 1     |
| Comedy   | 2     |
| Drama    | 3     |
| Horror   | 4     |

**Masalah:** Model bisa anggap Drama(3) - Action(1) = 2, tapi Comedy(2) - Action(1) = 1. Seolah-olah Comedy lebih "mirip" Action daripada Drama!

**Cocok untuk:** Data **ordinal** (ada urutan natural). Contoh: Poor -> Good -> Excellent (1, 2, 3)

### One-Hot Encoding

Setiap kategori jadi kolom baru dengan nilai 0 atau 1. Tidak ada asumsi urutan, tapi menambah dimensi data.

|         | Action | Comedy | Drama | Horror |
|---------|--------|--------|-------|--------|
| Action  | 1      | 0      | 0     | 0      |
| Comedy  | 0      | 1      | 0     | 0      |
| Drama   | 0      | 0      | 1     | 0      |
| Horror  | 0      | 0      | 0     | 1      |

**Cocok untuk:** Data **nominal** (tidak ada urutan). Contoh: warna, genre, negara.

**Peringatan:** Curse of dimensionality: jika ada 1000 kategori = 1000 kolom baru!

### Kapan Pakai Apa?

| Tipe | Kapan | Contoh |
|------|-------|--------|
| Label Encoding | Data ordinal (ada urutan) | Pendidikan: SMA=1, S1=2, S2=3, S3=4 |
| One-Hot Encoding | Data nominal (tanpa urutan) | Genre: Action, Comedy, Drama -> kolom terpisah |
| Binary (0/1) | Data boolean / ya-tidak | Menikah: Ya=1, Tidak=0 |

## Memilih K

### Efek Nilai K terhadap Decision Boundary

- **K = 1:** OVERFITTING -- Boundary sangat zigzag
- **K = 5:** JUST RIGHT -- Boundary smooth & akurat
- **K = 20:** UNDERFITTING -- Boundary terlalu simpel

### Hubungan K dan Bias-Variance

| K | Bias | Variance | Efek |
|---|------|----------|------|
| K kecil (1-3) | Low Bias | High Variance | Sensitif noise, overfitting |
| K sedang (5-15) | Balance | Balance | Sweet spot -- cari pakai cross-validation |
| K besar (20+) | High Bias | Low Variance | Terlalu general, underfitting |

### Tips Memilih K

1. Gunakan cross-validation untuk test berbagai K
2. K ganjil lebih baik untuk binary classification (hindari seri)
3. K = 1 hampir tidak pernah dipakai -- terlalu rentan noise
4. Rule of thumb: K ~ sqrt(n) (n = jumlah data training)
5. K terlalu besar = hilang aspek lokalitas

## Latihan Soal

### One-Hot Encoding -- TEST: Drama, Basic, 11hrs

Test point: Action=0, Comedy=0, Drama=1, Horror=0, Subscription=1 (Basic), Watch Time=11

| Act | Com | Dra | Hor | Sub | Time | Target      | Dist |
|-----|-----|-----|-----|-----|------|-------------|------|
| 1   | 0   | 0   | 0   | 2   | 15   | Frequent    | 7    |
| 0   | 1   | 0   | 0   | 1   | 5    | Casual      | 8    |
| 0   | 0   | 1   | 0   | 2   | 12   | Frequent    | 2    |
| 0   | 0   | 0   | 1   | 0   | 7    | Occasional  | 7    |
| 0   | 1   | 0   | 0   | 0   | 4    | Casual      | 10   |
| 1   | 0   | 0   | 0   | 1   | 10   | Occasional  | 3    |
| 0   | 0   | 1   | 0   | 2   | 14   | Frequent    | 4    |
| 0   | 0   | 0   | 1   | 2   | 6    | Casual      | 8    |
| 0   | 1   | 0   | 0   | 1   | 8    | Occasional  | 5    |
| 1   | 0   | 0   | 0   | 0   | 3    | Casual      | 11   |

- **K=3:** Frequent Viewer (Freq=2, Occ=1 -> Frequent menang)
- **K=5:** Frequent Viewer (Freq=3, Occ=2 -> Frequent menang)

### Label Encoding -- TEST: Genre=3, Sub=1, Time=11

Genre: Action=1, Comedy=2, Drama=3, Horror=4. Subscription: Free=0, Basic=1, Premium=2.

| Genre | Sub | Time | Target      | Manhattan | Euclidean |
|-------|-----|------|-------------|-----------|-----------|
| 1     | 2   | 15   | Frequent    | 7         | 4.58      |
| 2     | 1   | 5    | Casual      | 7         | 6.08      |
| 3     | 2   | 12   | Frequent    | 2         | 1.41      |
| 4     | 0   | 7    | Occasional  | 6         | 4.24      |
| 2     | 0   | 4    | Casual      | 9         | 7.14      |
| 1     | 1   | 10   | Occasional  | 3         | 2.24      |
| 3     | 2   | 14   | Frequent    | 4         | 3.16      |
| 4     | 2   | 6    | Casual      | 7         | 5.20      |
| 2     | 1   | 8    | Occasional  | 4         | 3.16      |
| 1     | 0   | 3    | Casual      | 11        | 8.31      |

- **K=3 (Manhattan):** Frequent Viewer -- d=2(Freq), d=3(Occ), d=4(Freq)
- **K=5 (Manhattan):** Occasional Viewer -- Freq=2, Occ=2, Casual=1 -> tie-break

**Peringatan:** Label Encoding menghasilkan prediksi **berbeda** dari One-Hot Encoding untuk K=5! Ini karena label encoding memberikan "jarak palsu" antar kategori nominal.

## Analisis KNN

### Kelebihan KNN

| Kelebihan | Penjelasan |
|-----------|------------|
| Simpel & Intuitif | Konsepnya sangat mudah dipahami -- cari tetangga terdekat, lalu vote/rata-rata |
| Non-parametric | Tidak perlu asumsi distribusi data. Bisa handle data yang tidak linear |
| Versatile | Bisa untuk classification DAN regression |
| No Training Time | Fase training = simpan data saja, O(1) |

### Kelemahan KNN

| Kelemahan | Penjelasan |
|-----------|------------|
| Prediksi Lambat | Harus hitung jarak ke SEMUA data training setiap prediksi. Kompleksitas O(knd) |
| Butuh Data Banyak | Performa buruk kalau data training sedikit |
| Sensitif Skala | WAJIB normalisasi! Feature dengan range besar mendominasi |
| Curse of Dimensionality | Performa menurun drastis jika dimensi (fitur) sangat banyak |

### Kompleksitas Komputasi

| Operasi | Kompleksitas | Keterangan |
|---------|-------------|------------|
| Hitung 1 jarak | O(d) | d = jumlah dimensi/fitur |
| 1 nearest neighbor | O(nd) | n = jumlah data training |
| K nearest neighbors | O(knd) | k = jumlah neighbors |
| Total prediksi | O(knd) | Mahal untuk data besar! |

### KNN vs Model Lain

| | KNN | Decision Tree | Random Forest |
|---|---|---|---|
| Tipe Learning | Lazy | Eager | Eager |
| Training | Cepat (simpan saja) | Lambat (build tree) | Lambat (build trees) |
| Prediksi | Lambat (hitung jarak) | Cepat (traverse tree) | Cepat (aggregate) |
| Normalisasi? | WAJIB | Tidak perlu | Tidak perlu |
| Encoding? | WAJIB | Tidak perlu | Tidak perlu |
| Interpretable? | Sedang | Tinggi | Rendah |
| Outlier? | Sensitif | Sensitif | Robust |

---

# Supervised Model Evaluation

## Overview

### Dua Masalah Utama

1. **Methodology** -- Bagaimana membagi dataset untuk training & testing? Pendekatan: Holdout, Cross-Validation (Random Subsampling, K-Fold, LOOCV)
2. **Quantification** -- Metrik apa yang tepat untuk evaluasi? Classification: Accuracy, Precision, Recall, F1, AUC. Regression: MAE, MSE, RMSE, R^2

### Testing NOs -- Jangan Dilakukan!

- Jangan pakai training set untuk testing -> overestimate performa (seperti ujian pakai soal latihan!)
- Jangan pakai testing set untuk tuning model -> data bocor, hasil bias
- Model yang baik = bisa prediksi data yang BELUM PERNAH dilihat sebelumnya!

### Pembagian Data

| Split | Proporsi | Fungsi |
|-------|----------|--------|
| Training | 50% | Bangun model |
| Validation | 25% | Tuning / selection |
| Testing | 25% | Evaluasi final |

Referensi lain: 80:20 (training : testing) tanpa validation terpisah.

## Metodologi Evaluasi

### Holdout

Bagi data jadi 2: training & testing. Simpel, tapi ada masalah -- kalau proporsi kelas tidak seimbang saat split, estimasi error bisa pessimistic.

### Cross-Validation

#### K-Fold CV
Data dibagi menjadi K bagian (fold). Setiap fold bergiliran menjadi test set, sisanya training. Error akhir = rata-rata error dari K eksperimen.

`E = (1/K) x sum(Ei)`

#### LOOCV (Leave-One-Out CV)
K = N (jumlah data). Setiap data bergiliran menjadi satu-satunya test point.

#### Random Subsampling
Data dibagi secara random berulang kali. Tidak ada jaminan semua data pernah jadi test.

### Nilai K dalam Cross-Validation -- Trade-off

| K Besar | K Kecil |
|---------|---------|
| Bias kecil (estimasi error akurat) | Komputasi cepat |
| Variance besar | Variance kecil |
| Komputasi lama | Bias besar |

**Umumnya K = 10** | Dataset besar -> K=3 cukup | Dataset kecil -> LOOCV

## Metrik Regresi

### Worked Example

Data points: A(0,0), B(1,3), C(5,2), D(7,7). Regression line: y* = (1/2)x + 1.

| Metrik | Formula | Deskripsi | Nilai |
|--------|---------|-----------|-------|
| MAE | 1/N x sum\|y - y*\| | Rata-rata jarak absolut | 1.750 |
| MSE | 1/N x sum(y - y*)^2 | Rata-rata kuadrat error | 4.188 |
| RMSE | sqrt(MSE) | Akar MSE, satuan sama dgn y | 2.046 |
| R^2 | 1 - SS_reg / SS_total | Persentase variasi y dijelaskan x | 0.438 |

### R^2 -- Koefisien Determinasi

`R^2 = 1 - SS_regression / SS_total`

- SS_regression = sum(y - y*)^2 -> error terhadap garis regresi
- SS_total = sum(y - y_bar)^2 -> error terhadap garis mean
- Rentang 0-1 (umumnya). R^2 = 0.55 artinya 55% variasi y bisa dijelaskan oleh x
- R^2 mendekati 1 TIDAK SELALU bagus! Cek residual plot -- kalau ada pola, model masih bisa diperbaiki

## Confusion Matrix

### Komponen

| | Pred + | Pred - |
|---|---|---|
| **Act +** | **TP** (True Positive) -- Benar positif | **FN** (False Negative) -- Positif lolos |
| **Act -** | **FP** (False Positive) -- Salah alarm | **TN** (True Negative) -- Benar negatif |

### Cara Baca (Analogi Medis)

- **TP:** Dibilang sakit, memang sakit
- **FP:** Dibilang sakit, padahal sehat (false alarm)
- **FN:** Dibilang sehat, padahal sakit (lolos!)
- **TN:** Dibilang sehat, memang sehat

### Metrik dari Confusion Matrix

| Metrik | Formula | Deskripsi |
|--------|---------|-----------|
| Accuracy | (TP+TN) / Total | Proporsi prediksi benar dari keseluruhan |
| Precision | TP / (TP+FP) | Dari semua yang diprediksi +, berapa yang benar? |
| Recall | TP / (TP+FN) | Dari semua yang MEMANG +, berapa yang ketangkap? |
| Specificity | TN / (TN+FP) | Dari semua yang MEMANG -, berapa yang benar diidentifikasi? |
| F1-Score | 2 x P x R / (P+R) | Harmonic Mean of Precision & Recall |
| G-Mean | sqrt(Recall x Specificity) | Geometric mean of Sensitivity & Specificity |

### Worked Example (default values)

TP=50, FN=10, FP=5, TN=35, Total=100

```
Accuracy    = (TP+TN)/Total = (50+35)/100 = 85/100 = 85.0%
Precision   = TP/(TP+FP) = 50/(50+5) = 50/55 = 90.9%
Recall      = TP/(TP+FN) = 50/(50+10) = 50/60 = 83.3%
Specificity = TN/(TN+FP) = 35/(35+5) = 35/40 = 87.5%
F1          = 2xPxR/(P+R) = 2x90.9x83.3/(90.9+83.3) = 87.0%
G-Mean      = sqrt(Recall x Specificity) = sqrt(83.3 x 87.5) = 85.4%
```

## Metrik Klasifikasi Biner

### Tiga Perspektif

**Precision:** TP / (TP + FP)
- Pertanyaan: Dari semua yang diprediksi +, berapa yang benar?
- Fokus: Kolom prediksi +
- Analogi: Alarm pemadam: kalau bunyi, apakah benar ada kebakaran?

**Recall / Sensitivity:** TP / (TP + FN)
- Pertanyaan: Dari semua yang MEMANG +, berapa yang ketangkap?
- Fokus: Baris aktual +
- Analogi: Detektor penyakit: berapa persen orang sakit yang terdeteksi?

**Specificity:** TN / (TN + FP)
- Pertanyaan: Dari semua yang MEMANG -, berapa yang benar diidentifikasi?
- Fokus: Baris aktual -
- Analogi: Berapa persen orang sehat yang benar-benar dibilang sehat?

### Jebakan Accuracy pada Imbalanced Class

Contoh: 1000 data (950 negatif, 50 positif). Model selalu prediksi "negatif" -> Accuracy = 95%! Tapi Recall = 0% -- tidak ada satupun kasus positif yang terdeteksi. **Accuracy bisa misleading!**

## F1-Score & F-Beta

### Kenapa F1, Bukan Simple Mean?

F1 menggunakan harmonic mean yang menghukum ketidakseimbangan. Jika ada gap besar antara precision & recall, F1 jatuh drastis dibanding simple mean.

### F-Beta Cheat Sheet

| Beta | Metrik | Fokus | Contoh |
|------|--------|-------|--------|
| beta < 1 | F0.5 | Precision lebih penting | Spam filter -- jangan hapus email penting! |
| beta = 1 | F1 | Seimbang | Default jika FP = FN sama-sama costly |
| beta > 1 | F2 | Recall lebih penting | Deteksi kanker -- jangan sampai lolos! |

**Formula F-Beta:**

`F_beta = (1+beta^2) x (prec x rec) / (beta^2 x prec + rec)`

## ROC Curve & AUC

### Konsep Threshold

Bayangkan alat tes COVID output angka 0-1. Threshold 0.8 -> ketat (FP rendah, FN tinggi). Threshold 0.4 -> longgar (FP tinggi, FN rendah). ROC plot TPR vs FPR di semua threshold.

- **Sumbu X:** False Positive Rate (1 - Specificity)
- **Sumbu Y:** True Positive Rate (Recall)
- AUC = luas di bawah ROC. Mendekati 1 = bagus. 0.5 = random. < 0.5 = lebih buruk dari random!
- AUC bersifat scale & threshold-invariant -- berbeda dari F1 yang tergantung satu threshold
- PR-AUC: Precision vs Recall curve -- gunakan jika kelas positif lebih penting

### Interpretasi AUC

| AUC | Kualitas |
|-----|----------|
| > 0.9 | Excellent |
| > 0.8 | Good classifier |
| > 0.7 | Fair |
| > 0.5 | Poor |
| <= 0.5 | Worse than random |

## Multiclass Classification

### Contoh: Confusion Matrix 3 Kelas (Cat, Fish, Hen)

|            | Pred Cat | Pred Fish | Pred Hen |
|------------|----------|-----------|----------|
| **Act Cat**  | 4        | 6         | 3        |
| **Act Fish** | 1        | 2         | 0        |
| **Act Hen**  | 1        | 2         | 6        |

### Per-Class Metrics (OvR -- One vs Rest)

Untuk setiap kelas, anggap hanya ada 2 kelas: kelas itu vs semua kelas lain.

**Cat:**
```
TP=4, FP=2, FN=9
Prec = 4/(4+2) = 4/6 = 66.7%
Rec  = 4/(4+9) = 4/13 = 30.8%
F1   = 2x0.667x0.308/(0.667+0.308) = 42.1%
```

**Fish:**
```
TP=2, FP=8, FN=1
Prec = 2/(2+8) = 2/10 = 20.0%
Rec  = 2/(2+1) = 2/3 = 66.7%
F1   = 2x0.200x0.667/(0.200+0.667) = 30.8%
```

**Hen:**
```
TP=6, FP=3, FN=3
Prec = 6/(6+3) = 6/9 = 66.7%
Rec  = 6/(6+3) = 6/9 = 66.7%
F1   = 2x0.667x0.667/(0.667+0.667) = 66.7%
```

### Macro-F1 vs Micro-F1

**Macro-F1:** Rata-rata F1 per kelas. Setiap kelas bobotnya sama -- sensitif terhadap kelas minoritas.

`Macro-F1 = (42.1% + 30.8% + 66.7%) / 3 = 46.5%`

**Micro-F1:** Hitung TP & FP global lalu F1. Kelas mayoritas mendominasi -- mirip accuracy.

`Micro-F1 = Total TP / (Total TP + Total FP) = 12/(12+13) = 48.0%`

## Pilih Metrik yang Tepat

Decision tree untuk memilih metrik evaluasi:

1. **Output model = Label Kelas, Kelas seimbang** -> **Accuracy** (reliable, mudah diinterpretasi)
2. **Output model = Label Kelas, Kelas imbalanced, Dua kelas penting** -> **G-Mean** (menyeimbangkan sensitivity & specificity)
3. **Output model = Label Kelas, Kelas imbalanced, Kelas positif penting, FP=FN** -> **F1-Score** (menyeimbangkan precision & recall)
4. **Output model = Label Kelas, Kelas imbalanced, Kelas positif penting, FP lebih mahal** -> **F0.5-Score** (prioritaskan Precision, e.g. spam detection)
5. **Output model = Label Kelas, Kelas imbalanced, Kelas positif penting, FN lebih mahal** -> **F2-Score** (prioritaskan Recall, e.g. deteksi penyakit)
6. **Output model = Probabilitas, Butuh probabilities** -> **Brier Score** (mengukur kalibrasi)
7. **Output model = Probabilitas, Butuh labels, Kelas positif penting** -> **PR-AUC** (threshold-invariant)
8. **Output model = Probabilitas, Butuh labels** -> **ROC-AUC** (evaluasi di berbagai threshold)

## Statistical Test (t-test)

### 5 Langkah t-test

1. **Buat Hipotesis:** H0: mu1 = mu2 (sama) | H1: mu1 < mu2 (model kita lebih baik)
2. **Tentukan Signifikansi:** alpha = 0.05 atau 0.1, cari t-critical dari tabel (df = n+m-2)
3. **Hitung Test Score:** `TS = (X_bar1 - X_bar2) / sqrt(Sp^2 x (1/n + 1/m))`
4. **Bandingkan:** Apakah TS masuk area reject H0 atau accept H0?
5. **Kesimpulan:** Reject H0 -> perbedaan signifikan. Accept H0 -> belum cukup bukti

### Pooled Estimator

`Sp^2 = ((n-1)S1^2 + (m-1)S2^2) / (n+m-2)`

Digunakan ketika variance populasi tidak diketahui tapi diasumsikan sama. n, m = jumlah data tiap grup. S1^2, S2^2 = variance sampel.

### Catatan Penting

- Kenapa perlu t-test? Karena accuracy 76% vs 74% belum tentu berarti model pertama lebih baik -- bisa jadi kebetulan!
- Jika TS masuk rejection area -> perbedaan SIGNIFIKAN (bukan kebetulan)
- Dalam ML: jalankan K-fold CV, dapatkan K nilai metrik, lalu t-test antara dua model

---

# Bias-Variance Tradeoff

## Overview

> "Model yang bagus bukan yang paling akurat di training data, tapi yang paling bisa generalisasi ke data baru."

Dalam supervised learning, kita punya training set berisi pasangan input-output. Tujuannya: cari fungsi h yang mendekati fungsi asli f yang tidak diketahui. Masalahnya -- kalau model terlalu simpel, dia ga bisa tangkap pola data. Kalau terlalu kompleks, dia malah hafal noise.

### Konteks: Supervised Learning

Diberikan training set: (x1, y1), (x2, y2), ..., (xn, yn) dimana yi dihasilkan dari fungsi y = f(x) yang tidak diketahui. Supervised learning = cari fungsi hipotesis h yang mengaproksimasi f. Hypothesis space bisa berupa polinomial, decision tree, dll. Kalau space terlalu kecil -> fungsi yang dicari ga ada. Kalau terlalu besar -> terlalu banyak pilihan yang konsisten.

### Training Error vs Generalization Error

**Training Error:** Rata-rata error model pada data yang dipakai untuk latihan. Bisa turun terus kalau model makin kompleks.

**Generalization Error:** Error pada data baru yang belum pernah dilihat model. Ini yang sebenarnya penting -- tujuan akhir kita.

## Curve Fitting

Tiga jenis fitting pada data:

### Linear (Terlalu Simpel)
- Garis lurus -- ga bisa tangkap pola melengkung dalam data.
- Training error tinggi.
- MSE Train > 0, MSE Test > 0, **High Bias**

### Squiggly (Terlalu Kompleks)
- Kurva berliku-liku melewati SEMUA titik.
- Training error = 0, tapi overfitting.
- MSE Train = 0, MSE Test >>> 0, **High Variance**

### Medium Polynomial (Pas)
- Kurva halus yang menangkap tren utama tanpa mengejar setiap noise. Sweet spot!
- MSE Train > 0, MSE Test rendah, **Balanced!**

### Occam's Razor
Pilih model yang paling simpel yang masih bisa menjelaskan data -- hindari kompleksitas yang tidak perlu!

## Bias & Variance

### Bias

Seberapa **jauh rata-rata prediksi model dari nilai sebenarnya**. Ibaratnya, kalau kamu nembak terus tapi selalu meleset ke kanan, itu bias tinggi.

**Formula:** `Bias = E[g(x_hat)] - f(x_hat)`

- Model terlalu simpel -> bias tinggi
- Gagal tangkap pola data -> simplifying assumptions
- Training error TINGGI, test error TINGGI
- Contoh: Linear Regression untuk data nonlinear

### Variance

Seberapa **berubah-ubahnya prediksi model** kalau training data-nya berbeda. Ibaratnya, setiap kali nembak hasilnya beda-beda jauh, itu variance tinggi.

**Formula:** `Var = E[(g(x_hat) - E[g(x_hat)])^2]`

- Model terlalu kompleks -> variance tinggi
- Terlalu sensitif terhadap training data tertentu
- Training error RENDAH, test error TINGGI
- Contoh: Polynomial derajat tinggi, deep tree

### Analogi: Game of Darts

Bullseye = nilai sebenarnya. Bias = seberapa jauh pusat tembakan dari bullseye. Variance = seberapa menyebar tembakannya.

| | Low Variance | High Variance |
|---|---|---|
| **Low Bias** | Tembakan mengumpul di bullseye | Tembakan menyebar tapi rata-ratanya di bullseye |
| **High Bias** | Tembakan mengumpul tapi jauh dari bullseye | Tembakan menyebar dan jauh dari bullseye |

## Overfitting vs Underfitting

### Underfitting

- Training error: TINGGI
- Test error: TINGGI (mirip train)
- Bias: TINGGI
- Variance: RENDAH
- Model terlalu simpel, ga bisa tangkap hubungan antar data.

### Just Right

- Training error: sedikit > 0
- Test error: sedikit > train
- Bias: BALANCED
- Variance: BALANCED
- Sweet spot! Tangkap pola tanpa hafal noise.

### Overfitting

- Training error: SANGAT RENDAH
- Test error: JAUH lebih tinggi
- Bias: RENDAH
- Variance: TINGGI
- Model belajar pola + noise sekaligus, ga bisa generalisasi.

## Error Decomposition

### Setup Dasar

**Data Model:** `y = f(x) + epsilon`
- y = output, f = model ideal, epsilon = noise (mean 0, variance sigma^2)

**Aproksimasi:** `y_hat = g(x_hat)`
- g = model yang kita latih dari training data (aproksimasi dari f)

### Derivasi MSE -> 3 Komponen

**Step 1: Mulai dari definisi MSE**

`MSE = E[(y - g(x_hat))^2]`

Expected squared difference antara nilai sebenarnya (y) dan prediksi model (g(x_hat))

**Step 2: Substitusi y = f(x_hat) + epsilon**

`= E[(f(x_hat) + epsilon - g(x_hat))^2]`

Karena epsilon independen terhadap f dan g, dan E[epsilon] = 0, kita bisa pisahkan:

`= E[(f(x_hat) - g(x_hat))^2] + E[epsilon^2]`

Cross-term 2 x E[(f-g) x epsilon] = 2 x E[(f-g)] x E[epsilon] = 0 karena E[epsilon]=0. Dan E[epsilon^2] = sigma^2 (variance noise)

**Step 3: Dekomposisi E[(f - g)^2] pakai trik "tambah-kurang E[g]"**

`E[(f(x_hat) - g(x_hat))^2] = (E[g(x_hat)] - f(x_hat))^2 + E[(g(x_hat) - E[g(x_hat)])^2]`

Ini mirip rumus Var(X) = E[X^2] - (E[X])^2. Kita pisahkan jadi dua:
- **(E[g(x_hat)] - f(x_hat))^2** = Bias^2 -- seberapa jauh rata-rata prediksi dari nilai benar
- **E[(g(x_hat) - E[g(x_hat)])^2]** = Variance -- seberapa berubah-ubah prediksi

### Hasil Akhir

**MSE = Bias^2 + Variance + sigma^2**

| Komponen | Keterangan |
|----------|------------|
| **Bias^2** | Reducible error -- bisa dikurangi dengan model lebih kompleks |
| **Variance** | Reducible error -- bisa dikurangi dengan model lebih simpel / lebih data |
| **sigma^2 (Noise)** | Irreducible error -- batas bawah error, ga bisa dihilangkan |

## The Tradeoff Graph

Saat model makin kompleks, **Bias^2 turun** karena model makin bisa tangkap pola. Tapi **Variance naik** karena model makin sensitif terhadap training data spesifik. **Total error** turun dulu (bias turun lebih cepat dari variance naik), sampai titik optimal, lalu naik lagi (variance dominan).

- **Overfitting Detected:** MSE training kecil, tapi MSE testing besar -> Model hafal training data termasuk noise-nya. Terlalu fleksibel!
- **Underfitting Detected:** MSE training besar DAN MSE testing besar -> Model terlalu simpel, ga bisa tangkap pola dasar sekalipun.

## Solusi: Mengurangi Error

### Regularization

Teknik untuk membatasi kompleksitas model supaya ga overfitting. Intinya: tambahkan "hukuman" (penalty) kalau model terlalu rumit.

**Contoh: Decision Tree Regularization**

- **Strategi 1: Early Stopping** -- Hentikan tree learning berdasarkan kriteria: min data per node, max leaf nodes, max depth.
- **Strategi 2: Pruning** -- Bangun tree full dulu, lalu potong (merge subtree ke parent) sampai memenuhi kriteria. Lebih lambat tapi lebih akurat.

**Efek pada Bias-Variance:** Regularization menaikkan bias sedikit tapi menurunkan variance banyak. Net effect: total error turun.

### Bagging (Bootstrap Aggregating)

Latih banyak model secara **paralel** pada subset data yang berbeda (random sampling with replacement), lalu gabungkan hasilnya.

**Flow:** Dataset Original -> Subset 1, 2, 3 (bootstrap) -> Model 1, 2, 3 -> Averaging / Majority Vote

**Variance Reduction Formula:**

`Var(rata-rata k prediksi i.i.d.) = sigma^2 / k`

Kalau variance 1 model = sigma^2, maka rata-rata dari k model independen variancenya turun jadi sigma^2/k. Makin banyak model, makin stabil!

**Contoh:** Random Forest = Bagging + Decision Trees. Bias tetap sama seperti base model, tapi Variance TURUN signifikan. Cocok untuk model yang high variance (deep trees).

### Boosting

Latih model secara **sekuensial** -- setiap model berikutnya fokus memperbaiki kesalahan model sebelumnya. Tujuan utama: **mengurangi bias**.

**Flow:** Model 1 -> Model 2 (fix error 1) -> Model 3 (fix error 2) -> Model 4 (fix error 3) -> Sum Weighted

**AdaBoost:** Update bobot data -- data yang salah diprediksi dapat bobot lebih besar di iterasi berikutnya. Tiap base learner juga dapat bobot sesuai performanya.

**Gradient Boosting:** Setiap model baru dilatih pada residual (selisih prediksi-aktual) dari model sebelumnya. Minimisasi loss function secara bertahap.

### More Training Data

Cara paling "brute force" untuk mengurangi variance: tambah data training. Semakin banyak data, semakin stabil model.

**Learning Curves:**

| Tipe | Deskripsi |
|------|-----------|
| Realizable | f(x) bisa dinyatakan oleh model -> accuracy bisa -> 100% |
| Redundant | Banyak fitur noise -> bisa menyesatkan, accuracy terbatas |
| Non-realizable | f(x) ga bisa dinyatakan (kurang fitur) -> accuracy terbatas |

## Impact Table

| Technique | Bias | Variance |
|-----------|------|----------|
| Simple Models | Tinggi -- oversimplifikasi | Rendah -- ga overfit |
| Complex Models | Rendah -- boundary kompleks | Tinggi -- sensitif terhadap data |
| Shallow Decision Tree | Tinggi -- abaikan split penting | Rendah -- top split stabil |
| Deep Decision Tree | Rendah -- boundary detail | Tinggi -- overfit di level bawah |
| Linear Models | Tinggi -- bisa jadi non-linear | Rendah -- robust |
| Kernel SVM | Lebih rendah dari linear SVM | Lebih tinggi dari linear SVM |
| k-NN (k kecil) | Rendah | Tinggi -- local discriminant |
| k-NN (k besar) | Tinggi | Rendah |
| Naive Bayes | Tinggi -- asumsi independence | Rendah estimasi parameter |
| Regularization | Naik sedikit | Turun signifikan |

### Key Takeaway

Tidak ada satu model yang terbaik untuk semua kasus (*No Free Lunch Theorem*). Kuncinya: pahami data kamu, mulai dari model simpel, evaluasi dengan test set, dan tingkatkan kompleksitas secara bertahap. Bagging turunkan variance, Boosting turunkan bias, Regularization cegah overfitting. Tujuan akhir: **Low Bias + Low Variance** = generalisasi terbaik!

---

Now I have all the content from both files. Here is the extracted markdown:

# Imbalanced Classification

## Apa itu Imbalanced Classification?

**Imbalanced Classification** = masalah klasifikasi ketika distribusi kelas TIDAK seimbang dalam dataset training.

Contoh domain: Fraud Detection, Spam Detection, Disease Diagnosis, Churn Prediction

Nama lain: **Rare Event Prediction**, Extreme Event Prediction, Severe Class Imbalance

## Seberapa Parah?

| Tingkat | Rasio | Deskripsi |
|---------|-------|-----------|
| **Slight** | 4:6 | Sedikit tidak seimbang. Bisa ditangani seperti klasifikasi biasa — tidak perlu teknik khusus. |
| **Moderate** | 1:100 | Cukup parah. Model standar mulai gagal — perlu teknik khusus. |
| **Severe** | 1:5000 | Sangat parah. Real-life: fraud detection, penyakit langka — wajib teknik khusus. |

## Masalah Utama

Algoritma ML standar **bias ke majority class** karena mereka berusaha memaksimalkan akurasi secara keseluruhan. Hasilnya? Model hanya prediksi "Normal" terus dan tetap dapat akurasi 99% — tapi GAGAL TOTAL mendeteksi minority class yang justru paling penting!

## Penyebab

1. **Biased Sampling** — Data dikumpulkan secara random tapi kelas langka tidak cukup muncul. Contoh: Mengambil data buah di supermarket pagi hari — buah busuk sudah dibuang semalam.

2. **Measurement Errors** — Kesalahan labeling atau alat yang rusak. Contoh: Pisang busuk dilabel 'normal' karena busuknya di dalam, tidak terlihat luar.

3. **Preprocessing Bias** — Saat pembersihan data, data minority dihapus. Contoh: Data minority dianggap outlier/noise lalu diremove.

4. **Sifat Domain** — Kejadiannya memang jarang terjadi di dunia nyata. Contoh: Hanya 20 dari 10.000 orang yang punya penyakit tertentu.

## Tantangan

### Dataset Size
Dataset kecil + imbalanced = model tidak punya cukup contoh minority untuk belajar. Dengan n=100 dan rasio 1:100, hanya ada 1 minority sample!

### Label Noise
Class noise (label salah) lebih berbahaya daripada feature noise. Bayangkan label minority di-flip ke majority — minority makin sedikit!

### Data Overlap
Feature value antara kelas saling tumpang tindih. Model kesulitan membuat decision boundary yang jelas.

### Accuracy Paradox — Mengapa Akurasi Menyesatkan

Pada dataset 99:1, model yang **selalu prediksi "Normal"** tanpa belajar apapun sudah mendapat akurasi **99%**! Padahal model tersebut gagal mendeteksi SEMUA kasus penting (fraud, penyakit, dll). Inilah mengapa akurasi **TIDAK COCOK** untuk imbalanced dataset.

Gunakan: **F1, ROC-AUC, Precision, Recall**

## Evaluasi: Stratified K-Fold Cross Validation

Masalah: K-Fold CV biasa split data **random** — bisa saja satu fold tidak punya minority class sama sekali!

Solusi: **Stratified K-Fold** memastikan setiap fold memiliki **proporsi kelas yang sama** dengan dataset asli.

| | K-Fold Biasa | Stratified K-Fold |
|---|---|---|
| Fold 1 | Train: 0=791, 1=9 \| Test: 0=199, 1=1 | Train: 0=792, 1=8 \| Test: 0=198, 1=2 |
| Fold 2 | Train: 0=793, 1=7 \| Test: 0=197, 1=3 | Train: 0=792, 1=8 \| Test: 0=198, 1=2 |
| Fold 3 | Train: 0=794, 1=6 \| Test: 0=196, 1=4 | Train: 0=792, 1=8 \| Test: 0=198, 1=2 |
| Fold 4 | Train: 0=790, 1=10 \| Test: 0=200, 1=0 | Train: 0=792, 1=8 \| Test: 0=198, 1=2 |
| Masalah? | Fold 4 tidak ada minority di test! | Semua fold punya proporsi SAMA |

Python:
```python
from sklearn.model_selection import StratifiedKFold
kfold = StratifiedKFold(n_splits=5)

# Stratified train/test split
train_test_split(X, y, stratify=y)
```

## Cost-Sensitive Learning

Biasanya ML minimize **error**. Dengan cost-sensitive learning, kita kasih **hukuman (penalty) berbeda** untuk jenis kesalahan berbeda. False Negative (gagal deteksi penyakit) jauh lebih mahal daripada False Positive (false alarm)!

### Cost Matrix (Rasio 1:100)

|  | Prediksi + | Prediksi - |
|---|---|---|
| **Aktual +** | 0 | 100 (FN — BAHAYA!) |
| **Aktual -** | 1 (FP — toleransi) | 0 |

### Contoh Dunia Nyata

- **Diagnosis Kanker**: FP = tes tambahan (biaya kecil), FN = pasien sakit tidak terdeteksi (NYAWA!)
- **Klaim Asuransi**: FP = biaya investigasi lanjut, FN = biaya klaim yang harus dibayar

### Rumus: compute_class_weight

```
weight(class) = n_samples / (n_classes x n_samples_with_class)
```

n_samples = total data, n_classes = jumlah kelas, n_samples_with_class = jumlah data di kelas tersebut

**Contoh Hitung:** 10.000 data, 9.900 kelas 0, 100 kelas 1

- Kelas 0 (majority): = 10000 / (2 x 9900) = 10000 / 19800 = **0.505**
- Kelas 1 (minority): = 10000 / (2 x 100) = 10000 / 200 = **50.0**

Artinya: kesalahan pada kelas 1 dihitung **~100x lebih berat** daripada kesalahan pada kelas 0. Model akan "berusaha lebih keras" mengenali minority.

### Weighted Logistic Regression

**Loss biasa:**
```
Loss = Sigma -(log(y_hat_i) * y_i + log(1 - y_hat_i) * (1 - y_i))
```
Semua error dianggap sama bobotnya.

**Loss weighted:**
```
Loss = Sigma -(w1 * log(y_hat_i) * y_i + w0 * log(1 - y_hat_i) * (1 - y_i))
```
w1 = bobot minority (BESAR), w0 = bobot majority (KECIL). Error di minority class jadi lebih 'mahal' sehingga model lebih fokus ke minority.

Python:
```python
LogisticRegression(class_weight='balanced')
# atau
LogisticRegression(class_weight={0: 0.01, 1: 1.0})
```

## Oversampling

> Sampling hanya dilakukan pada **TRAINING data**, TIDAK pada test/validation data! Tujuannya agar model belajar tanpa bias, tapi tetap dievaluasi pada data asli yang realistis.

### Random Oversampling

Cara paling simpel: **duplikat** data minority secara random sampai seimbang. Misal: 9900 majority + 100 minority menjadi duplikasi minority jadi 9900 juga.

- **Kelebihan**: Simpel, cepat, cocok untuk dataset besar, bisa membantu model iteratif (SGD, Decision Tree)
- **Kekurangan**: Bisa menyebabkan OVERFITTING karena model hanya belajar dari data yang sama berulang-ulang. Tidak ada informasi baru!

Python: `RandomOverSampler(sampling_strategy='minority')`

### SMOTE — Synthetic Minority Oversampling Technique

Bukan duplikasi! SMOTE **membuat data BARU (sintetis)** dengan interpolasi antara data minority yang sudah ada.

**Langkah-langkah:**
1. Pilih satu data minority (X1) secara random
2. Cari k tetangga terdekat (KNN) dari kelas minority
3. Pilih satu tetangga (X11) secara random
4. Buat garis antara X1 dan X11
5. Buat data baru di SEPANJANG garis itu

**Rumus:**
```
data_baru = X1 + gap x (X11 - X1)
```
gap = angka random antara 0 dan 1. Ini yang menentukan posisi data baru di garis antara X1 dan X11. Jika gap=0 maka tepat di X1, gap=1 maka tepat di X11.

- **Kelebihan**: Data baru beragam (bukan duplikat), dekat dengan existing data sehingga lebih realistis
- **Kekurangan**: Tidak mempertimbangkan majority class sehingga bisa buat data sintetis di area overlap/ambigu

### Borderline-SMOTE & SVM-SMOTE

Perbaikan dari SMOTE: hanya buat data sintetis di **daerah perbatasan (borderline)** — tempat yang paling sulit diklasifikasi model.

| Kategori | Kondisi (k tetangga) | Aksi |
|---|---|---|
| Safe | Mayoritas tetangga = minority (#maj < k/2) | Tidak di-oversample (sudah aman) |
| Borderline | Setengah+ tetangga = majority (k/2 <= #maj < k) | DI-OVERSAMPLE! (fokus di sini) |
| Noise | Semua tetangga = majority (#maj = k) | Diabaikan (kemungkinan outlier) |

- **Borderline-SMOTE**: Pakai KNN untuk identifikasi borderline instances. `BorderlineSMOTE()`
- **SVM-SMOTE**: Pakai SVM untuk cari decision boundary, oversample dekat support vectors. `SVMSMOTE()`

### ADASYN — Adaptive Synthetic Sampling

ADASYN **adaptif**: membuat LEBIH BANYAK data sintetis untuk minority yang **sulit dipelajari** (dekat majority) dan lebih sedikit untuk yang mudah.

**Bedanya dengan Borderline-SMOTE:**
- Borderline: oversample **hanya di borderline**
- ADASYN: oversample **proporsional** — makin banyak majority di sekitarnya, makin banyak data sintetis dibuat

**Rumus:**
```
weight proportional to #(majority neighbors) / #(minority neighbors)
```
Semakin banyak tetangga majority di sekitar satu minority point, semakin banyak data sintetis dibuat di area itu.

> Hati-hati: Jika area yang padat majority ternyata adalah outlier, ADASYN bisa terlalu fokus di situ sehingga performance malah turun. Tip: hapus outlier sebelum ADASYN!

## Undersampling

Undersampling = **menghapus data dari majority class** untuk menyeimbangkan distribusi. Ada 2 pendekatan:

| Pendekatan | Metode | Cara Kerja |
|---|---|---|
| Pilih data yang DIPERTAHANKAN | NearMiss, Condensed NN | Pilih subset majority yang paling informatif/berguna |
| Pilih data yang DIHAPUS | Tomek Links, ENN | Hapus data majority yang noisy/ambigu/redundan |
| Kombinasi keduanya | OSS, NCR | Gabung metode keep + delete untuk hasil optimal |

> Risiko utama undersampling: menghapus data majority yang penting/berguna sehingga decision boundary jadi kurang robust.

### NearMiss Undersampling

Pilih data majority berdasarkan **jaraknya ke minority class**. Ada 3 versi:

- **NearMiss-1**: Majority dengan rata-rata jarak MINIMUM ke 3 minority TERDEKAT. Mengambil yang dekat minority.
- **NearMiss-2**: Majority dengan rata-rata jarak MINIMUM ke 3 minority TERJAUH. Mengambil yang dekat semua minority.
- **NearMiss-3**: Majority dengan jarak MINIMUM ke SETIAP minority. Shortlist per minority point.

### Tomek Links

Dua data (a, b) dari **kelas berbeda** disebut Tomek Link jika mereka saling menjadi **nearest neighbor satu sama lain**. Tomek Links = data borderline/noisy.

**Syarat Tomek Link (a & b):**
1. a dan b dari kelas BERBEDA
2. Nearest neighbor dari a adalah b
3. Nearest neighbor dari b adalah a

**Aksi:** Hapus data **majority** yang ada di Tomek Link sehingga membersihkan boundary antara kelas.

### Edited Nearest Neighbors (ENN)

Untuk setiap data, cek 3 nearest neighbors-nya. Jika data **salah diklasifikasi** oleh neighbors-nya, hapus!

- **Kasus 1**: Data majority yang misklasifikasi oleh 3 NN-nya — Hapus data majority tersebut
- **Kasus 2**: Data minority yang misklasifikasi oleh 3 NN-nya — Hapus majority neighbors yang menyebabkan error

### Condensed Nearest Neighbor (CNN)

Cari **subset terkecil (minimal consistent set)** dari majority yang bisa menghasilkan performa KNN yang sama dengan dataset lengkap. Intinya: buang yang redundan, simpan yang esensial.

Contoh: dari 9900 majority, mungkin hanya 500 yang benar-benar dibutuhkan untuk mempertahankan akurasi KNN.

## Kombinasi Oversampling + Undersampling

Teknik terbaik sering menggabungkan oversampling + undersampling dalam satu **Pipeline**:

**Pipeline Pattern:** Data Asli -> Oversampling -> Undersampling -> Model -> Evaluasi

### Metode Kombinasi

| Metode | Deskripsi | Kode | Hasil |
|---|---|---|---|
| **SMOTE + Random Under** | SMOTE oversample minority, lalu random undersample majority. Paling sederhana. | `SMOTE() -> RandomUnderSampler()` | ROC AUC baseline |
| **SMOTE + Tomek Links** | SMOTE buat data sintetis, Tomek Links bersihkan noise di boundary setelahnya. | `SMOTETomek()` | AUC: 0.815 |
| **SMOTE + ENN** | SMOTE buat data sintetis, ENN hapus data ambigu yang misklasifikasi. Paling bersih! | `SMOTEENN()` | AUC: 0.856 |

## Ringkasan Semua Metode

| Level | Metode | Ide Utama | Kapan Pakai |
|---|---|---|---|
| Evaluasi | Stratified CV | Pertahankan proporsi kelas di setiap fold | Selalu gunakan untuk imbalanced data! |
| Algoritma | Cost-Sensitive | Beri penalty berbeda per kelas | Saat cost FN != cost FP jelas |
| Data (up) | Random Oversample | Duplikasi minority | Baseline, dataset besar |
| Data (up) | SMOTE | Buat data sintetis (interpolasi) | Default oversampling |
| Data (up) | Borderline-SMOTE | SMOTE hanya di borderline | Overlap tinggi |
| Data (up) | ADASYN | SMOTE adaptif (proporsional) | Distribusi tidak merata |
| Data (down) | Random Undersample | Hapus majority random | Minority cukup banyak |
| Data (down) | Tomek Links | Hapus boundary/noisy majority | Pembersihan data |
| Data (down) | ENN | Hapus misklasifikasi majority | Pembersihan data |
| Data (down) | NearMiss | Pilih majority dekat minority | Eksperimen |
| Data (combined) | SMOTE + Tomek/ENN | Oversample lalu bersihkan | Best practice |

---

# Probability & Naive Bayes

## Probabilitas

### Apa itu Probabilitas?

Angka antara **0** (mustahil) dan **1** (pasti).

### Contoh: Cuaca Januari (31 hari)

Hari-hari: mendung, mendung, mendung, cerah, hujan, cerah, mendung, cerah, mendung, cerah, cerah, mendung, hujan, mendung, hujan, hujan, hujan, hujan, mendung, cerah, hujan, mendung, cerah, cerah, mendung, cerah, mendung, cerah, cerah, mendung, hujan

- P(Rainy) = 8 / 31
- P(Cloudy) = 12 / 31
- P(Sunny) = 11 / 31

### Himpunan & Event

**Sample Space (Omega)** = semua kemungkinan. **Event** = sebagian dari Omega.

Diagram Venn: Event A, Event B, dan irisan A interseksi B.
- Event A: Hujan besok
- Event B: Mendung besok
- A interseksi B: Hujan DAN mendung

### Tiga Pendekatan Probabilitas

| Pendekatan | Deskripsi | Rumus | Contoh |
|---|---|---|---|
| **Klasik** | Semua outcome sama mungkin | P(E) = \|E\| / \|Omega\| | Dadu fair -> 1/6 |
| **Frekuensi Relatif** | Dari data historis | P(E) = #kejadian / #total | 9 hujan dari 31 -> 9/31 |
| **Subjektif** | Penilaian ahli | P(E) = expert judgment | Dokter: 70% sembuh |

### Aksioma & Aturan Probabilitas

| Aturan | Rumus | Deskripsi |
|---|---|---|
| Non-negatif | P(A) >= 0 | Probabilitas selalu positif |
| Normalisasi | P(Omega) = 1 | Total semua = 1 |
| Union (OR) | P(A union B) = P(A) + P(B) - P(A interseksi B) | A atau B terjadi |
| Joint (AND) | P(A interseksi B) = P(A,B) | A dan B bersamaan |
| Komplemen | P(A^c) = 1 - P(A) | A TIDAK terjadi |
| Bounds | 0 <= P(A) <= 1 | Selalu 0 sampai 1 |

## Conditional Probability

P(A) **JIKA DIKETAHUI** B sudah terjadi.

```
P(A|B) = P(A,B) / P(B)
```

P(besok hujan | hari ini mendung) != P(besok hujan). Informasi baru mengubah probabilitas!

### Product Rule

```
P(A,B) = P(A|B) x P(B) = P(B|A) x P(A)
```

Kedua bentuk hasilnya SAMA = P(A,B). Ini fondasi Bayes Theorem!

### Law of Total Probability

```
P(A) = Sigma P(A|Ci) x P(Ci)
```

**Contoh: Peluang mahasiswa dapat A?**

- P(A|kacamata) = 0.4
- P(A|tidak kacamata) = 0.2
- P(kacamata) = 0.3

```
P(A) = 0.4 x 0.3 + 0.2 x 0.7 = 0.26
```

### Independence

```
P(A|B) = P(A)
```

Tahu B tidak mengubah peluang A. Maka P(A,B) = P(A) x P(B).

### Conditional Independence

```
P(A|B,C) = P(A|C)
```

Begitu C diketahui, B tidak relevan untuk A. **Ini yang dipakai Naive Bayes!**

## Bayes Theorem

Cara "membalik" conditional probability.

**Alur:** Prior P(C) -> Likelihood P(X|C) -> Posterior P(C|X)

```
P(C|X) = P(X|C) x P(C) / P(X)
```

| Simbol | Nama | Deskripsi |
|---|---|---|
| P(C\|X) | Posterior | Yang dicari |
| P(X\|C) | Likelihood | Data cocok? |
| P(C) | Prior | Keyakinan awal |
| P(X) | Evidence | Normalizer |

### Contoh: Prediksi Hujan

Hitung: **P(hujan | langit tidak mendung)**

Diketahui:
- P(R=1) = 0.3 (Peluang hujan)
- P(C=1|R=1) = 0.8 (Mendung saat hujan)
- P(C=1|R=0) = 0.3 (Mendung saat cerah)

**Step 1: Komplemen**
```
P(C=0|R=1) = 1 - 0.8 = 0.2
P(C=0|R=0) = 1 - 0.3 = 0.7
```

**Step 2: Law of Total Probability**
```
P(C=0) = 0.2 x 0.3 + 0.7 x 0.7 = 0.06 + 0.49 = 0.55
```

**Step 3: Bayes!**
```
P(R=1|C=0) = 0.2 x 0.3 / 0.55 = 0.06 / 0.55 = 0.109 (sekitar 10.9%)
```

## Likelihood

Seberapa masuk akal parameter theta **given data**.

```
L(theta|X) = P(X|theta)
```

Contoh: Koin dilempar 5x menghasilkan 4H 1T. Kalau p=0.5, L=0.031. Kalau p=0.8, L=0.41. **p=0.8 lebih masuk akal!**

### Kurva Likelihood

Data: 4H 1T -> L(p) = 5p^4(1-p) -> maximum di p=0.8 (MLE)

### I.I.D. Likelihood

Data independen & identik, maka likelihood = perkalian:

```
L(theta) = Product P(xi|theta)
```

### Log-Likelihood

Perkalian angka kecil menghasilkan 0! Pakai log supaya jadi penjumlahan:

```
LL(theta) = Sigma log P(xi|theta)
```

## Naive Bayes Classifier

**Generative classifier** yang menggunakan Bayes Theorem.

### Asumsi "Naive" (Independence)

Fitur independen given kelas:

```
P(X|Y=c) = P(X1|c) x P(X2|c) x P(X3|c)
```

### Rumus Inti

```
P(y=c|x) proportional to P(y=c) x Product P(xi|c)
```

**Prediksi (argmax):**
```
y_hat = argmax_c [ P(c) x Product P(xi|c) ]
```

P(x) sama untuk semua kelas, maka cukup bandingkan P(c) x P(x|c)!

### Discriminative vs Generative

| Tipe | Deskripsi | Contoh |
|---|---|---|
| **Discriminative** | Langsung model P(y\|x) | KNN, Decision Tree |
| **Generative (NB!)** | Model P(x\|y) lalu balik pakai Bayes menjadi P(y\|x). Perlu prior + likelihood | Naive Bayes |

## NB Training Phase: Estimasi theta

NB cuma hitung **frekuensi** dari data training.

### Step 1: Prior

```
theta_c = Nc / N
```

14 data, 9 ya, 5 tidak:
- P(ya) = **9/14**
- P(tidak) = **5/14**

### Step 2a: Fitur Kategorikal -> Frekuensi

| Organisasi | ya (/ 9) | tidak (/ 5) |
|---|---|---|
| sosial | 2/9 | 3/5 |
| keilmuan | 4/9 | 0/5 (PERHATIAN!) |
| olahraga | 3/9 | 2/5 |

### Step 2b: Fitur Numerik -> Mean & Variance (Gaussian)

| Parameter | ya | tidak |
|---|---|---|
| mu ujian tulis | 73 | 74.6 |
| sigma^2 ujian tulis | 38 | 62.30 |
| mu wawancara | 79.11 | 86.2 |
| sigma^2 wawancara | 104.4 | 94.70 |

### Cara hitung Gaussian density

**Rumus:**
```
f(x) = (1 / sqrt(2 * pi * sigma^2)) x exp(-(x - mu)^2 / (2 * sigma^2))
```

**Worked example:** P(tulis=60|ya): mu=73, sigma^2=38
```
= (1 / sqrt(2 * 3.14159 * 38)) x exp(-(60-73)^2 / (2 x 38))
= 0.0647 x 0.108
= 0.007
```

## NB Testing Phase: Prediksi!

### Data masuk

```
X = (olahraga, tulis=60, waw=62, komunikasi=tinggi)
```

### Step 1: Hitung Likelihood per kelas

|  | Organisasi | Tulis | Wawancara | Komunikasi | P(X\|c) |
|---|---|---|---|---|---|
| **ya** | 3/9 | 0.007 | 0.01 | 6/9 | 1.55e-05 |
| **tidak** | 2/5 | 0.009 | 0.002 | 2/5 | 2.88e-06 |

### Step 2: Hitung Posterior (proportional)

- P(ya|X) proportional to 9/14 x 1.55e-05 = **1.0e-05**
- P(tidak|X) proportional to 5/14 x 2.88e-06 = **1.03e-06**

### Step 3: Prediksi

**Prediksi: Exchange = YA**

1.0e-05 > 1.03e-06

## Masalah Naive Bayes

### Zero-Frequency Problem

P(keilmuan|tidak) = **0/5 = 0** sehingga seluruh posterior = 0!

**Tanpa Laplace:**
```
P(keilmuan|tidak) = 0/5 = 0
P(tidak|X) = ... x 0 x ... = 0
```

**Dengan Laplace Smoothing (+1):**
```
P(keilmuan|tidak) = (1 + 0) / (3 + 5) = 1/8
P(sosial|tidak)    = (1 + 3) / (3 + 5) = 4/8
P(olahraga|tidak)  = (1 + 2) / (3 + 5) = 3/8
```

**Rumus Laplace Smoothing:**
```
theta = (1 + Na) / (K + Ni)
```
K = jumlah kategori

### Missing Values

Fitur hilang? **Skip aja!** Karena asumsi independen, kita marginalize out fitur missing.

```
Data: (?, tulis=60, waw=62, tinggi)
-> P(ya|X) proportional to P(ya) x P(tulis=60|ya) x P(waw=62|ya) x P(tinggi|ya)
```

### Variasi Naive Bayes

| Varian | Deskripsi |
|---|---|
| **Gaussian NB** | Fitur kontinu mengikuti distribusi normal |
| **Multinomial NB** | Fitur = count (Bag of Words) |
| **Bernoulli NB** | Fitur = binary (0/1) |
| **Categorical NB** | Fitur = kategori |

## Latihan (Quiz)

1. **P(A union B) = P(A) + P(B) - P(A interseksi B). Ini disebut?** Jawaban: Union rule. Peluang A ATAU B.

2. **Jika P(A|B) = P(A), maka A dan B...?** Jawaban: Independent. Tahu B tidak mengubah P(A) sehingga independen.

3. **P(C|X) proportional to P(X|C) x P(C). P(X|C) disebut?** Jawaban: Likelihood. Likelihood = seberapa cocok data X kalau C benar.

4. **Naive Bayes 'naive' karena...?** Jawaban: Asumsi fitur independen given kelas. Asumsi: P(X|c) = Product P(xi|c).

5. **P(keilmuan|tidak)=0. Laplace menambahkan...?** Jawaban: 1 ke setiap count. Laplace: +1 ke numerator, +K ke denominator.

6. **Fitur numerik di NB diasumsikan distribusi...?** Jawaban: Gaussian. Gaussian NB: density normal dengan mu dan sigma^2 per kelas.

---

Now I have all the content. Let me compile the complete markdown output.

# KASDAD UTS Study Guide - Kecerdasan Artifisial & Sains Data Dasar (Genap 2025/2026)

---

## TOPIC OVERVIEW & WEIGHTS

| Week | Topic | Weight | Frequency | Sub-topics |
|------|-------|--------|-----------|------------|
| 1 | Kecerdasan Artifisial | ~8% | ALWAYS | 8 |
| 1 | Search Algorithms | ~5% | RARE | 10 |
| 2 | Data Science & Metodologi | ~8% | ALWAYS | 8 |
| 3 | EDA & Statistik | ~10% | ALWAYS | 8 |
| 3 | Data Preparation | ~12% | ALWAYS | 9 |
| 4 | Feature Engineering | ~5% | OFTEN | 3 |
| 4 | PCA | ~10% | ALWAYS | 4 |
| 5 | CART (Decision Tree) | ~12% | ALWAYS | 4 |
| 5 | Random Forest & Ensemble | ~10% | ALWAYS | 4 |
| 6 | Model Evaluation | ~12% | ALWAYS | 5 |
| 6 | Bias-Variance Tradeoff | ~8% | ALWAYS | 4 |
| 6 | K-Nearest Neighbors | ~10% | ALWAYS | 4 |
| 7 | Imbalanced Classification | ~5% | OFTEN | 3 |
| 8 | Naive Bayes | ~10% | ALWAYS | 5 |

**Format UTS:** 60 poin (PG+Isian) & 40 poin (4 Essay x 10). ~150 menit. Open notes 8 hal A4.

---

## TOPIC 1: KECERDASAN ARTIFISIAL (Week 1, ~8%)

### 4 Perspektif Definisi AI
- **Thinking Humanly** (cognitive modeling) -- emulasi cara berpikir manusia via introspeksi, psikologi eksperimen, brain imaging
- **Thinking Rationally** (laws of thought) -- penalaran tak terbantahkan via logika formal, TAPI tidak scalable & manusia tidak selalu rasional
- **Acting Humanly** (Turing Test) -- mesin lolos jika penguji tidak bisa bedakan dgn manusia, butuh NLP, knowledge representation, reasoning, ML; KRITIK: pesawat terbang tidak meniru burung
- **Acting Rationally** (rational agent) -- 'do the right thing', pendekatan DOMINAN & STANDAR KA modern, bisa dimodelkan secara matematis, mencakup thinking rationally + perilaku tanpa penalaran seperti refleks

### Intelligent Agents & PEAS
Agen = entitas yang mempersepsi lingkungan via SENSOR dan bertindak via ACTUATOR. Fungsi agen: f: P* -> A (memetakan percept sequence ke action). PEAS framework: Performance (ukuran kinerja, diukur pada LINGKUNGAN bukan internal state), Environment (dunia luar tempat agen beroperasi), Actuators (alat bertindak), Sensors (alat observasi).

### Contoh PEAS
- **Taksi Otonom:** P=aman+cepat+hemat, E=jalan+rambu+kendaraan+pejalan kaki, A=kemudi+gas+rem+klakson, S=kamera+sonar+GPS+speedometer
- **Asisten Virtual Ponsel:** P=akurasi respon+kepuasan user, E=user+internet+apps, A=layar+speaker, S=microphone+touchscreen+kamera
- **Robot Vacuum:** P=kebersihan lantai, E=ruangan+furnitur+debu, A=roda+brush+suction, S=infrared+bumper sensor

### Task Environment Properties (7 Sifat)
1. **Fully Observable vs Partially Observable** -- sensor akses seluruh lingkungan? Catur=fully, Taksi=partially
2. **Single-agent vs Multi-agent** -- sendiri atau ada agen lain? Bisa kompetitif/kooperatif
3. **Deterministic vs Nondeterministic/Stochastic** -- next state ditentukan penuh oleh current state+action? Catur=deterministic, Taksi=stochastic
4. **Episodic vs Sequential** -- keputusan satu episode pengaruhi episode lain? Spam filter=episodic, Catur=sequential
5. **Static vs Dynamic vs Semi-dynamic** -- lingkungan berubah saat agen berpikir? Catur dgn clock=semi-dynamic, Crossword=static
6. **Discrete vs Continuous** -- state/action terbatas? Catur=discrete, Taksi=continuous
7. **Known vs Unknown** -- agen tahu hukum fisik lingkungan? Known != fully observable! Solitaire=known+partially observable

### Contoh Analisis Environment
- **Catur dengan clock:** Fully obs, Multi-agent, Deterministic, Sequential, Semi-dynamic, Discrete, Known
- **Catur tanpa clock:** Fully obs, Multi-agent, Deterministic, Sequential, Static, Discrete, Known
- **Taksi:** Partially obs, Multi-agent, Stochastic, Sequential, Dynamic, Continuous, Unknown
- **Tic-tac-toe:** Fully obs, Multi-agent, Deterministic, Sequential, Static, Discrete, Known
- **Spam filter:** Partially obs, Single, Stochastic, Episodic, Static, Discrete
- **Dunia nyata:** Partially obs, Multi-agent, Nondeterministic, Sequential, Dynamic, Continuous, Unknown

### 5 Tipe Program Agen
1. **Simple Reflex Agent** -- condition->action rules, HANYA cocok jika fully observable
2. **Model-based Reflex Agent** -- punya internal state yang merekam keadaan lingkungan, bisa handle partially observable
3. **Goal-based Agent** -- model + informasi GOAL, pemilihan action mempertimbangkan masa depan
4. **Utility-based Agent** -- pilih cara capai goal yang paling disukai (lebih cepat/aman/murah)
5. **Learning Agent** -- komponen: Performance element + Learning element + Problem generator

### Taksonomi AI
- **Narrow/Weak AI:** 1 tugas spesifik (SEMUA AI saat ini)
- **AGI/Strong AI:** setara kecerdasan manusia (BELUM ADA)
- Hierarchy: AI > Machine Learning > Neural Networks > Deep Learning

### Konsep Dasar Machine Learning
- Traditional Programming: Input + Rules -> Output
- Machine Learning: Input + Output -> Rules/Model
- **Supervised:** classification (output diskret), regression (output kontinu) -- ada labeled data
- **Unsupervised:** clustering -- TIDAK ada label
- **Reinforcement:** reward/punishment
- 3 Elemen ML: Representation, Evaluation, Optimization

### Formulas
- `f: P* -> A` (agent function)
- `PEAS = Performance + Environment + Actuators + Sensors`

### Jebakan Soal
- Sensor != Environment! Microphone = SENSOR. Voice command dari user = bagian ENVIRONMENT.
- Performance measure diukur pada ENVIRONMENT, BUKAN pada internal state agen!
- Jika kinerja robot vacuum diukur HANYA dari 'jumlah debu yang disedot dalam 8 jam' -> robot bisa sengaja tabur debu lalu sedot!
- Acting rationally != selalu benar. Rational = memilih tindakan TERBAIK dengan informasi yang ADA.
- Tic-tac-toe: DETERMINISTIC -- hasil setiap langkah PASTI, tidak ada unsur acak.
- Spam filter: EPISODIC, STATIC, DISCRETE.
- Known != Fully Observable! Solitaire = known (tahu aturan) tapi partially observable (kartu tertutup).
- Video game baru = fully observable (layar tampilkan semua) tapi UNKNOWN (belum tahu efek tombol).
- Mematikan AC saat suhu mencapai x°C = BUKAN acting rationally (hanya rule sederhana).
- Semua AI yang ada SAAT INI = Narrow/Weak AI. AGI/Strong AI BELUM ADA.
- Clustering != Classification! Clustering = unsupervised, Classification = supervised.

---

## TOPIC 2: SEARCH ALGORITHMS (Week 1, ~5%)

### Problem-Solving Agent
Goal-based agent yang memformulasikan masalah sebagai STATE SPACE REPRESENTATION lalu menjalankan search algorithm. Asumsi: environment fully observable, deterministic, static, discrete.

### State Space Representation
Komponen: States, Initial State, PosAct(s), NextState(s,a), ActCost(s,a,s'), Goal Test. Optimal solution = path dengan PathCost minimum.

### Search Algorithms

| Algorithm | Frontier | Complete | Optimal | Time | Space |
|-----------|----------|----------|---------|------|-------|
| BFS | Queue (FIFO) | Yes (if b bounded) | Yes (if equal step cost) | O(b^d) | O(b^d) |
| DFS | Stack (LIFO) | No (infinite loop) | No | O(b^m) | O(bm) |
| UCS | Priority Queue (g(n)) | Yes (if cost > 0) | Yes | O(b^(1+C*/e)) | O(b^(1+C*/e)) |
| IDS | DFS repeated | Yes | Yes | Like BFS | O(bd) |
| Greedy Best-First | Priority Queue (h(n)) | No | No | - | - |
| A* | Priority Queue (f(n)=g(n)+h(n)) | Yes | Yes (if admissible/consistent) | - | - |

### Heuristic Properties
- **Admissible:** h(n) <= h*(n) -- TIDAK PERNAH overestimate
- **Consistent:** h(n) <= c(n,a,n') + h(n') -- triangle inequality
- Consistent -> Admissible, tapi Admissible does NOT imply Consistent

### Formulas
- `f(n) = g(n) + h(n)` [A*]
- `h(n) <= h*(n)` [admissible]
- `h(n) <= c(n,a,n') + h(n')` [consistent]

### Jebakan Soal
- A* optimal HANYA jika heuristic admissible (tree) atau consistent (graph)!
- UCS = A* dengan h(n) = 0
- BFS optimal HANYA jika semua step cost SAMA
- DFS TIDAK complete pada graph infinite -- bisa infinite loop!
- Space complexity BFS = O(b^d) -- SANGAT besar! DFS hanya O(bm)
- h(n) = 0 untuk semua n -> A* menjadi UCS

---

## TOPIC 3: DATA SCIENCE & METODOLOGI (Week 2, ~8%)

### 4 Tipe Analytics (SANGAT PENTING!)
1. **DESCRIPTIVE:** "Apa yang TERJADI?" -- data historis/lampau. Contoh: "Berapa total kasus COVID selama PSBB Jakarta?"
2. **DIAGNOSTIC:** "MENGAPA terjadi?" -- cari penyebab. Contoh: "Mengapa churn rate naik?"
3. **PREDICTIVE:** "Apa yang AKAN terjadi?" -- prediksi masa depan. Contoh: "Berapa suhu Malang minggu depan?"
4. **PRESCRIPTIVE:** "Apa yang HARUS DILAKUKAN?" -- rekomendasi aksi. Contoh: "Berapa harga optimal untuk produk baru?"

### CRISP-DM: 6 Fase (WAJIB HAFAL)
1. **Business Understanding:** definisikan problem bisnis -> pendekatan analitik -> tujuan spesifik
2. **Data Understanding:** kumpulkan data -> pahami data dgn EDA & statistik -> iterasi jika perlu
3. **Data Preparation:** cleaning -> integration -> transformation -> selection -> reduction. PALING LAMA: 70-90% waktu!
4. **Modeling:** kembangkan model, iteratif
5. **Evaluation:** ukur kualitas model dgn metrik
6. **Deployment:** deploy ke produksi -> evaluasi berkelanjutan

CRISP-DM ITERATIF -- bisa kembali ke fase sebelumnya kapan saja, bukan waterfall!

### ML Tasks
- **Classification** (supervised, output diskret): spam/not spam -> DT, RF, KNN, NB
- **Regression** (supervised, output kontinu): harga rumah -> KNN Regression, Regression Tree
- **Clustering** (unsupervised, tanpa label): segmentasi customer -> K-Means

### Formulas
- `CRISP-DM: BU -> DU -> DP -> M -> E -> D (iteratif)`

### Jebakan Soal
- Download/kumpulkan data = Data UNDERSTANDING, BUKAN Data Preparation!
- Evaluasi model = tahap EVALUATION, bukan Modeling!
- "Berapa harga optimal produk baru?" = PRESCRIPTIVE, bukan Predictive!
- "Bagaimana penjualan produk X paruh kedua 2025?" = PREDICTIVE, bukan Descriptive!
- "Analisis kasus COVID selama PSBB" = DESCRIPTIVE
- "Mengapa churn naik?" = DIAGNOSTIC, bukan Descriptive!
- Estimasi shelf-life/masa pakai = REGRESSION, bukan classification!

---

## TOPIC 4: EDA & STATISTIK (Week 3, ~10%)

### Tipe Data
- **NOMINAL:** kategori TANPA urutan -- warna, kode pos (12345!), gender
- **ORDINAL:** kategori DENGAN urutan -- pendidikan, kepuasan
- **INTERVAL:** numerik, jarak bermakna, 0 arbitrary -- suhu C, tahun
- **RASIO:** numerik, 0 absolut -- berat, gaji, umur

### Central Tendency
- **MEAN:** sensitif OUTLIER
- **MEDIAN:** ROBUST terhadap outlier
- **MODE:** satu-satunya ukuran untuk KATEGORIKAL
- mean > median -> RIGHT-skewed. mean < median -> LEFT-skewed. mean ~= median -> simetris.

### Variabilitas
- RANGE = max - min (sensitif outlier)
- IQR = Q3 - Q1 (hanya SATU nilai per dataset!)
- VARIANCE = sum(xi - mu)^2 / n
- STD DEV = sqrt(Variance)

### Outlier Detection (IQR Method)
- Lower Bound = Q1 - 1.5 x IQR
- Upper Bound = Q3 + 1.5 x IQR
- Data di luar [LB, UB] = OUTLIER

### Skewness & Kurtosis
- **Right-skewed:** positif, ekor kanan, mean > median
- **Left-skewed:** negatif, ekor kiri, mean < median
- **Mesokurtic:** kurtosis=3, normal
- **Leptokurtic:** >3, ekor tebal, banyak outlier
- **Platykurtic:** <3, ekor tipis

### Korelasi
- **Pearson r:** hubungan LINEAR saja. r=0 TIDAK berarti tidak ada hubungan (bisa nonlinear kuat!)
- **Spearman:** hubungan MONOTONIC. Pakai jika data ordinal, nonlinear, atau outlier
- |r| > 0.7 = kuat. r = -0.89 = kuat NEGATIF

### Visualisasi
- HISTOGRAM: distribusi 1 var numerik
- BAR CHART: perbandingan kategori
- SCATTER: hubungan 2 var numerik
- BOXPLOT: distribusi+outlier+median+IQR
- HEATMAP: korelasi matrix
- BUBBLE: 4 variabel (x, y, size, color)
- Histogram != Bar chart!

### Formulas
- `IQR = Q3 - Q1`
- `Outlier: x < Q1 - 1.5*IQR or x > Q3 + 1.5*IQR`
- `Pearson r = sum((xi-xbar)(yi-ybar)) / sqrt(sum((xi-xbar)^2) * sum((yi-ybar)^2))`
- `Variance = sum((xi-mu)^2) / n`
- `Std Dev = sqrt(Variance)`

### Jebakan Soal
- Mean > Median -> RIGHT-skewed. Bukan left-skewed!
- Pearson r = 0.02 TIDAK berarti tidak ada hubungan! Bisa ada hubungan NONLINEAR kuat
- IQR per dataset = SATU nilai
- Mean A > mean B -> TIDAK bisa pastikan median A > median B!
- Colored bubble plot BISA visualisasi 4 variabel

---

## TOPIC 5: DATA PREPARATION (Week 3, ~12%)

### Missing Values
1. Tanya pengumpul data
2. Drop (baris atau kolom -- jika sedikit)
3. Imputasi Mean (JANGAN jika ada outlier!)
4. Imputasi Median (ROBUST terhadap outlier -- pilihan AMAN)
5. Imputasi Mode (untuk KATEGORIKAL)
6. Nearest Neighbor imputation
7. Domain knowledge

### Transformation: Normalisasi/Scaling
- **MIN-MAX:** (x-min)/(max-min) -> [0,1]. TIDAK hilangkan outlier.
- **Z-SCORE:** (x-mu)/sigma -> mean=0, std=1. Di bawah mean -> negatif.
- KAPAN perlu? KNN=WAJIB, DT=TIDAK PERLU, RF=TIDAK PERLU, NB=tergantung.

### Transformation: Encoding
- **ONE-HOT ENCODING (OHE):** untuk NOMINAL -- buat kolom baru per kategori (0/1). Tambah jumlah kolom!
- **LABEL ENCODING:** untuk ORDINAL -- map ke angka berurutan
- **TARGET/MEAN ENCODING:** map kategori ke mean target -- risiko overfitting
- **FREQUENCY ENCODING:** map ke frekuensi

### Data Balancing
- Imbalanced: satu kelas sangat dominan
- Solusi: Oversampling (SMOTE), Undersampling, Class weights
- HANYA untuk CLASSIFICATION, bukan regression!

### Formulas
- `Min-Max = (x - min) / (max - min)`
- `Z-Score = (x - mu) / sigma`

### Jebakan Soal
- Kode Pos (12345) = NOMINAL, meskipun angka! TIDAK boleh di-scale/normalize!
- Ordinal (Rendah/Sedang/Tinggi) -> LABEL Encoding. JANGAN di-OHE!
- Mean imputasi + banyak outlier = BURUK -> pakai MEDIAN
- KNN WAJIB normalisasi, Decision Tree TIDAK PERLU
- Regresi TIDAK perlu handle imbalanced data
- Min-Max scaling TIDAK menghilangkan outlier
- Z-score: di bawah mean -> NEGATIF, di atas mean -> POSITIF
- OHE MENAMBAH jumlah kolom dataset
- Normalisasi dilakukan pada DATA TRAIN, lalu APPLY ke data test dgn parameter yang SAMA!

---

## TOPIC 6: FEATURE ENGINEERING (Week 4, ~5%)

### Feature Engineering
Membuat fitur baru: binning, interaction features, polynomial features, log transform, datetime decomposition

### Feature Selection
- Filter (korelasi, chi-square)
- Wrapper (forward/backward elimination)
- Embedded (DT feature importance, Lasso)

### Jebakan Soal
- Feature extraction (PCA) != Feature selection (pilih subset). Keduanya MENGURANGI kolom!
- Decision Tree melakukan IMPLICIT feature selection
- Target encoding bisa overfit jika kategori punya sedikit observasi

---

## TOPIC 7: PCA (Week 4, ~10%)

### Tujuan
Reduksi dimensi + hapus redundansi. PCA = feature EXTRACTION (kombinasi linear), BUKAN feature selection.

### Langkah PCA
1. Center data (kurangi mean)
2. Hitung Covariance Matrix (m x m)
3. Cari Eigenvalues & Eigenvectors
4. Sort eigenvalues descending
5. Pilih top-k PC
6. Transform data

### Explained Variance
- EV_i = lambda_i / sum(semua lambda)
- Cumulative EV = sum(lambda_1..lambda_k) / sum(semua lambda)
- Pilih k PC sehingga cumulative EV >= threshold (misal 95%)

### Formulas
- `EV_i = lambda_i / sum(semua lambda)`
- `Cum. EV = sum(lambda_1..lambda_k) / sum(semua lambda)`
- `Cov(m x m) -> eigendecomposition`

### Jebakan Soal
- Matriks yang didiagonalisasi = Covariance (m x m), BUKAN matriks data (n x m)!
- PC pertama = explained variance TERBESAR = bersesuaian eigenvalue TERBESAR
- "PC dgn EV terbesar ADALAH eigenvalue tertinggi" = SALAH! PC BERSESUAIAN dgn eigenvalue tertinggi
- Diagonalisasi -> fitur TIDAK berkorelasi (orthogonal)
- Jika ambil 1 dari 4 PC -> dimensi jadi 25% (1/4), BUKAN 73% meski EV=73%

---

## TOPIC 8: CART / DECISION TREE (Week 5, ~12%)

### Classification Tree
- Splitting criteria: **Gini Index** = 1 - sum(pi^2), atau **Information Gain** (Entropy = -sum(pi * log2(pi)))
- Pilih split dengan Gini TERKECIL atau IG TERBESAR

### Regression Tree
- Splitting criteria: Variance Reduction / MSE
- Prediksi leaf = MEAN dari target. BUKAN Gini!

### Properties
- Tidak perlu normalisasi/scaling
- Bisa handle categorical tanpa encoding
- Implicit feature selection
- Interpretable (white-box)
- SENSITIF terhadap noise/outlier

### Formulas
- `Gini = 1 - sum(pi^2)`
- `Entropy = -sum(pi * log2(pi))`
- `IG = Entropy(parent) - sum(wj * Entropy(childj))`

### Jebakan Soal
- Gini Index HANYA untuk classification! Regression tree pakai MSE!
- DT TIDAK perlu normalisasi dan TIDAK wajib encoding
- "Semua leaf harus pure" = SALAH! Pruning bisa buat leaf tidak pure
- Menambah kedalaman tree -> LEBIH overfit (bukan fix overfitting!)

---

## TOPIC 9: RANDOM FOREST & ENSEMBLE (Week 5, ~10%)

### Bagging
Bootstrap Aggregating: sampling DENGAN pengembalian -> bisa ada duplikat data. Setiap base model dilatih independen (PARALEL). Base model: high variance (deep DT).

### Random Forest
Bagging + Random Feature Subset pada setiap split.
- Classification: Majority Vote
- Regression: Average semua tree

### Boosting
Sequential training -- setiap model belajar dari ERROR model sebelumnya. Base model: high bias (shallow DT). TIDAK bisa paralel!

### Formulas
- `RF regression = mean(tree1, tree2, ..., treeN)`
- `RF classification = majority_vote(predictions)`

### Jebakan Soal
- Bootstrap = sampling DENGAN pengembalian (bisa duplikat!) bukan TANPA
- Boosting = SEQUENTIAL, TIDAK bisa diparalelkan!
- RF TIDAK perlu normalisasi/scaling
- RF dipilih untuk MENURUNKAN VARIANCE (bukan training error)
- RF random feature selection pada setiap SPLIT, bukan setiap tree
- RF prediksi regresi = RATA-RATA, bukan median

---

## TOPIC 10: MODEL EVALUATION (Week 6, ~12%)

### Confusion Matrix
- **TP** (benar positif), **TN** (benar negatif), **FP** (false alarm / Type I), **FN** (miss / Type II)

### Classification Metrics
- Accuracy = (TP+TN)/Total
- Precision = TP/(TP+FP)
- Recall/Sensitivity = TP/(TP+FN)
- Specificity = TN/(TN+FP)
- F1 = 2*P*R/(P+R)

### Regression Metrics
- MAE = mean(|yi - yi_hat|)
- MSE = mean((yi - yi_hat)^2). MSE lebih sensitif outlier (kuadrat)
- R^2 = 1 - SS_res/SS_tot. R^2 bisa negatif!

### Evaluation Methods
- Hold-out (paling tidak akurat)
- K-Fold CV (setiap data validasi tepat 1x)
- Stratified K-Fold (pertahankan proporsi kelas)
- LOOCV (K=N, mahal)
- Monte Carlo CV (random split, data mungkin tidak pernah jadi validation)

### ROC & AUC
- ROC: plot TPR (Recall) vs FPR (1-Specificity)
- Threshold optimal = titik paling dekat ke (0,1)
- AUC: 0.5 = random, 1 = perfect

### Formulas
- `Precision = TP/(TP+FP)`
- `Recall = TP/(TP+FN)`
- `Specificity = TN/(TN+FP)`
- `F1 = 2*P*R/(P+R)`
- `Accuracy = (TP+TN)/N`
- `MSE = sum((yi-yi_hat)^2)/n`
- `R^2 = 1 - SS_res/SS_tot`

### Jebakan Soal
- F1 tinggi != specificity pasti tinggi! F1 hanya melibatkan precision & recall
- Accuracy menyesatkan pada imbalanced data
- Hold-out = paling TIDAK AKURAT
- MAE dari M = a TIDAK berarti semua error <= a
- R^2 negatif = model LEBIH BURUK dari sekedar prediksi mean
- Micro-precision = Micro-F1 pada multiclass (sama!)

---

## TOPIC 11: BIAS-VARIANCE TRADEOFF (Week 6, ~8%)

### Decomposition
Expected Error = Bias^2 + Variance + Irreducible Error (epsilon)

### Underfitting vs Overfitting
- **High Bias** = underfitting (model terlalu sederhana, training & test RENDAH)
- **High Variance** = overfitting (model terlalu kompleks, training TINGGI, test RENDAH)

### Remedies
- Fix overfitting: pruning, regularisasi, tambah data, kurangi fitur, simpler model, bagging
- Fix underfitting: model lebih kompleks, tambah fitur, kurangi regularisasi, boosting

### Formula
- `E[Error] = Bias^2 + Variance + epsilon`

### Jebakan Soal
- Training 98%, Testing 72% -> OVERFITTING (high variance)
- Training 60%, Testing 55% -> UNDERFITTING (high bias)
- Bagging (RF) -> kurangi VARIANCE | Boosting -> kurangi BIAS
- Menambah depth DT -> MEMPERBURUK overfitting!

---

## TOPIC 12: K-NEAREST NEIGHBORS (Week 6, ~10%)

### Mekanisme
Lazy learner (tidak ada training phase). Hitung jarak ke SEMUA training data -> ambil K terdekat -> classification: majority vote, regression: average.

### Distance Metrics
- Euclidean: sqrt(sum((xi-yi)^2))
- Manhattan: sum(|xi-yi|)
- Cosine Similarity: (A*B)/(|A||B|) -- fokus arah, bukan magnitude

### Preprocessing WAJIB
HARUS normalisasi, HARUS encode categorical, handle outlier.

### Efek K
- K=1: paling overfit (high variance, low bias)
- K=N: paling underfit (high bias, low variance)
- Pilih K optimal via cross-validation

### Formulas
- `Euclidean = sqrt(sum((xi-yi)^2))`
- `Manhattan = sum(|xi-yi|)`
- `Cosine = (A*B)/(||A||*||B||)`

### Jebakan Soal
- KNN BUKAN centroid-based (itu K-Means)! KNN hitung jarak ke SEMUA data
- KNN WAJIB normalisasi!
- K kecil -> overfit, K besar -> underfit (kebalikan dari DT depth!)
- Testing time KNN LAMBAT, DT CEPAT
- KNN TIDAK melakukan implicit feature selection

---

## TOPIC 13: IMBALANCED CLASSIFICATION (Week 7, ~5%)

### Problem
Accuracy menyesatkan: model predict semua majority class -> accuracy tinggi tapi TIDAK BERGUNA. Contoh: 98% negatif, 2% positif -> accuracy 98% tanpa prediksi positif apapun.

### Solutions
- Oversampling (SMOTE: buat data sintetis minoritas)
- Undersampling (kurangi mayoritas)
- Class weights, Threshold tuning

### Metric Choice
- Penyakit fatal -> RECALL paling penting (jangan miss pasien sakit)
- Spam filter -> PRECISION penting (jangan buang email penting)

### Jebakan Soal
- Imbalanced handling HANYA untuk classification, BUKAN regression!
- SMOTE = synthetic oversampling, bukan duplicate

---

## TOPIC 14: NAIVE BAYES (Week 8, ~10%)

### Bayes Theorem
P(C|X) = P(X|C) * P(C) / P(X). Untuk membandingkan kelas, cukup hitung P(X|C)*P(C) per kelas (P(X) sama untuk semua kelas).

### Naive Assumption
Semua fitur INDEPENDEN satu sama lain given class: P(X|C) = P(x1|C) * P(x2|C) * ... * P(xn|C)

### Fitur Kategorikal
P(xi|C) = count(xi in class C) / count(class C)

### Fitur Numerik (Gaussian)
P(x|C) = (1/sqrt(2*pi*sigma^2)) * exp(-(x-mu)^2 / (2*sigma^2))

### Kontribusi Fitur
- Fitur dgn distribusi overlap antar kelas -> kontribusi RENDAH
- Fitur dgn distribusi berbeda signifikan -> kontribusi TINGGI

### Formulas
- `P(C|X) proportional to P(X|C) * P(C)`
- `P(X|C) = product(P(xi|C))`
- `Gaussian: (1/sqrt(2*pi*sigma^2)) * e^(-(x-mu)^2 / (2*sigma^2))`

### Jebakan Soal
- P(X) tidak perlu dihitung jika hanya membandingkan kelas
- Fitur TIDAK disebutkan di query -> JANGAN masukkan ke perhitungan!
- Fitur age overlap -> KURANG diskriminatif, smoker beda signifikan -> SANGAT diskriminatif
- P(C) = prior probability dari training data

---

## FORMULA SHEET (CONSOLIDATED)

### Preprocessing
- `Min-Max = (x - min) / (max - min)`
- `Z-Score = (x - mu) / sigma`
- `IQR = Q3 - Q1`
- `Outlier: < Q1 - 1.5*IQR or > Q3 + 1.5*IQR`

### PCA
- `EV_i = lambda_i / sum(lambda)`
- `CumEV = sum(lambda_1..lambda_k) / sum(lambda)`
- `CovMatrix = m x m`

### Decision Tree
- `Gini = 1 - sum(pi^2)`
- `Entropy = -sum(pi * log2(pi))`
- `IG = H(parent) - sum(wj * H(childj))`

### Distance
- `Euclidean = sqrt(sum((xi-yi)^2))`
- `Manhattan = sum(|xi-yi|)`
- `Cosine = A*B / (||A|| * ||B||)`

### Classification Metrics
- `Prec = TP/(TP+FP)`
- `Rec = TP/(TP+FN)`
- `Spec = TN/(TN+FP)`
- `F1 = 2*P*R / (P+R)`
- `Acc = (TP+TN) / N`

### Regression Metrics
- `MAE = sum(|yi-yi_hat|) / n`
- `MSE = sum((yi-yi_hat)^2) / n`
- `R^2 = 1 - SS_res / SS_tot`

### Ensemble & Naive Bayes
- `RF_reg = mean(trees)`
- `RF_cls = vote(trees)`
- `P(C|X) proportional to P(X|C) * P(C)`
- `Gauss: (1/sqrt(2*pi*sigma^2)) * e^(-(x-mu)^2 / (2*sigma^2))`

### Bias-Variance
- `Error = Bias^2 + Var + epsilon`
- `Bagging -> lower Variance`
- `Boosting -> lower Bias`

---

## MODEL COMPARISON TABLE

| Property | DT | RF | KNN | NB |
|----------|----|----|-----|----|
| Normalize | No | No | YES | No |
| Encode | No | No | YES | ~ |
| Outlier | Warning | OK | Warning | OK |
| Overfit | Warning | OK | K small = Warning | OK |
| Interpret | YES | No | ~ | ~ |
| Feat Sel | YES (implicit) | YES | No | No |

---

## PRACTICE QUESTIONS (UTSGuide.jsx -- 25 Soal Latihan)

### Q1 [AI, PG, Difficulty 1]
**Asisten virtual di ponsel adalah agen cerdas. Pernyataan PEAS yang TEPAT?**
- A. Microphone = sensor, layar = actuator **<-- CORRECT**
- B. Voice command = environment, layar = actuator
- C. Microphone = actuator, voice command = environment
- D. Microphone & voice command = environment

**Pembahasan:** Microphone = SENSOR (alat observasi). Layar ponsel = ACTUATOR (alat bertindak/output). Voice command = bagian dari environment. Jangan tertukar!

---

### Q2 [AI, PG, Difficulty 1]
**Sifat task environment agen tic-tac-toe yang TIDAK BENAR adalah...**
- A. Fully observable
- B. Sequential
- C. Nondeterministik **<-- CORRECT**
- D. Diskret

**Pembahasan:** Tic-tac-toe DETERMINISTIK karena hasil setiap langkah pasti (tidak ada unsur acak). Fully observable (bisa lihat seluruh papan), sequential (langkah sekarang mempengaruhi masa depan), discrete (gerakan terbatas).

---

### Q3 [DS, PG, Difficulty 1]
**Dalam CRISP-DM, mengunduh data dari berbagai sumber termasuk tahap:**
- A. Business Understanding
- B. Data Understanding **<-- CORRECT**
- C. Data Preparation
- D. Modeling

**Pembahasan:** MENGUMPULKAN/MENGUNDUH data = Data Understanding. Data Preparation = cleaning, transformation. Ini SERING jadi jebakan!

---

### Q4 [DS, Match, Difficulty 2]
**Cocokkan: (1) Berapa harga optimal produk baru A? (2) Mengapa churn rate naik? (3) Analisis COVID PSBB Jakarta (4) Prediksi suhu Malang minggu depan**
- A. (1)Prescriptive (2)Diagnostic (3)Descriptive (4)Predictive -- semua cocok **<-- CORRECT**
- B. (1)Predictive (2)Diagnostic (3)Descriptive (4)Predictive
- C. (1)Prescriptive (2)Descriptive (3)Descriptive (4)Predictive
- D. (1)Diagnostic (2)Diagnostic (3)Predictive (4)Prescriptive

**Pembahasan:** Prescriptive = merekomendasikan TINDAKAN (harga optimal). Diagnostic = menjelaskan MENGAPA (churn naik). Descriptive = menjelaskan APA yang terjadi (historis COVID). Predictive = memprediksi MASA DEPAN.

---

### Q5 [EDA, PG, Difficulty 1]
**Kolom Umur: median=28, mean=35, std=5. Distribusi paling mungkin:**
- A. Simetris
- B. Left-skewed
- C. Uniform
- D. Right-skewed **<-- CORRECT**

**Pembahasan:** Mean (35) > Median (28) -> distribusi RIGHT-SKEWED (ekor kanan panjang, ada outlier nilai tinggi).

---

### Q6 [EDA, PG, Difficulty 2]
**Korelasi Pearson antara 2 fitur = 0.02. Pernyataan yang BENAR:**
- A. Kedua fitur pasti tidak berhubungan
- B. Mungkin ada hubungan nonlinear kuat **<-- CORRECT**
- C. Salah satu fitur harus dihapus
- D. Tidak perlu analisis lebih lanjut

**Pembahasan:** Pearson HANYA mengukur hubungan LINEAR. r ~= 0 TIDAK berarti tidak ada hubungan! Bisa saja ada hubungan NONLINEAR yang kuat. Perlu cek dengan Spearman atau visualisasi scatter.

---

### Q7 [Prep, PG, Difficulty 2]
**Fitur 'kode_pos' (12350, 12345) dan 'tingkat_resiko' (Rendah/Sedang/Tinggi). Preprocessing yang BENAR:**
- A. Kode pos: Min-Max, tingkat resiko: OHE
- B. Kode pos: OHE, tingkat resiko: Label Encoding **<-- CORRECT**
- C. Kode pos: Label Encoding, tingkat resiko: OHE
- D. Kode pos: Z-Score, tingkat resiko: Label Encoding

**Pembahasan:** Kode pos = NOMINAL (meski angka, tidak ada urutan) -> OHE. Tingkat resiko = ORDINAL (ada urutan Rendah<Sedang<Tinggi) -> Label Encoding. JANGAN terbalik!

---

### Q8 [Prep, Hitung, Difficulty 2]
**Data Gaji 5 pegawai: [3M, 5M, 7M, 9M, 11M]. Min-Max scaling untuk gaji 3M dan Z-score untuk gaji 11M (mu=7M, sigma=sqrt(8)M). Hitung keduanya!**
- A. Min-Max 3M = 0, Z-score 11M ~= 1.41 **<-- CORRECT**
- B. Min-Max 3M = 0.25, Z-score 11M = 2
- C. Min-Max 3M = 0, Z-score 11M = 0.5
- D. Min-Max 3M = 1, Z-score 11M = 1.41

**Pembahasan:** Min-Max: (3-3)/(11-3) = 0/8 = 0. Z-Score: (11-7)/sqrt(8) = 4/2.83 ~= 1.41. Nilai minimum selalu 0 di Min-Max, nilai di atas mean selalu POSITIF di Z-Score.

---

### Q9 [Prep, PG, Difficulty 2]
**Mean imputasi pada suatu fitur menyebabkan masalah JIKA:**
- A. Fitur bertipe interval
- B. Fitur memiliki banyak outlier **<-- CORRECT**
- C. Nilai null < 5%
- D. Fitur terdistribusi normal

**Pembahasan:** Outlier menarik mean jauh dari pusat data. Imputasi dengan mean yang terdistorsi -> memberikan nilai imputasi yang tidak representatif. Solusi: pakai MEDIAN.

---

### Q10 [PCA, Hitung, Difficulty 3]
**Eigenvalues: [6.50, 3.85, 2.90, 2.10, 1.75, 1.40, 1.10, 0.85, 0.55, 0.40]. Hitung: (a) EV PC ke-5, (b) Min PC untuk 95%**
- A. (a) 8.18%, (b) 8 PC dengan 95.56% **<-- CORRECT**
- B. (a) 17.5%, (b) 5 PC
- C. (a) 8.18%, (b) 7 PC dengan 93.15%
- D. (a) 8.18%, (b) 9 PC

**Pembahasan:** Total = 21.40. EV5 = 1.75/21.40 = 8.18%. Cumulative: PC1-7 = 19.60/21.40 = 91.59%. PC1-8 = 20.45/21.40 = 95.56% >= 95%. Jadi min 8 PC.

---

### Q11 [PCA, PG, Difficulty 2]
**Pernyataan yang SALAH mengenai principal component pada PCA:**
- A. Komponen yang dipilih adalah kombinasi linier fitur asli
- B. Komponen dgn EV terkecil bersesuaian eigenvalue terkecil
- C. Komponen dgn EV terbesar ADALAH nilai eigen tertinggi **<-- CORRECT**
- D. PC pertama menjabarkan EV terbanyak

**Pembahasan:** PC dgn EV terbesar BERSESUAIAN dengan eigenvalue tertinggi, bukan 'ADALAH' eigenvalue tertinggi. PC adalah VEKTOR eigen, bukan skalar eigenvalue. Perbedaan halus tapi penting!

---

### Q12 [CART, PG, Difficulty 2]
**Pernyataan BENAR mengenai Decision Tree:**
- A. Gini bisa untuk regression tree
- B. DT perlu normalisasi fitur numerik
- C. DT implisit melakukan feature selection **<-- CORRECT**
- D. Semua leaf node harus pure

**Pembahasan:** DT memilih fitur terbaik di setiap split -> fitur yang tidak berguna tidak dipilih -> IMPLICIT feature selection. Gini HANYA classification. DT TIDAK perlu normalisasi. Leaf TIDAK harus pure (pruning).

---

### Q13 [CART, PG, Difficulty 2]
**DT klasifikasi email spam: training accuracy 98%, testing 72%. Tindakan yang TIDAK TEPAT:**
- A. Ganti ke random forest
- B. Terapkan pruning
- C. Tingkatkan kedalaman tree **<-- CORRECT**
- D. Tambah data training

**Pembahasan:** Gap besar training-testing = OVERFITTING. Menambah depth = MEMPERBURUK overfitting! Yang benar: pruning (kurangi kompleksitas), RF (kurangi variance), tambah data.

---

### Q14 [RF, PG, Difficulty 2]
**Bootstrap sampling melakukan sampling dengan cara:**
- A. Mengambil data acak TANPA pengembalian
- B. Mengambil data acak DENGAN pengembalian **<-- CORRECT**
- C. Mengambil seluruh data tanpa duplikasi
- D. Memilih subset fitur secara acak

**Pembahasan:** Bootstrap = sampling DENGAN PENGEMBALIAN -> data bisa terpilih lebih dari sekali (duplikat). Ini yang membuat setiap tree punya training set berbeda.

---

### Q15 [RF, Hitung, Difficulty 2]
**RF 4 tree untuk regresi. Prediksi: 11.5, 10, 11, 8. Prediksi akhir?**
- A. 11.5
- B. 10.125 **<-- CORRECT**
- C. 10
- D. 10.5

**Pembahasan:** RF regresi = RATA-RATA semua tree = (11.5+10+11+8)/4 = 40.5/4 = 10.125

---

### Q16 [RF, PG, Difficulty 2]
**Pernyataan PALING TIDAK TEPAT tentang ensemble learning:**
- A. RF adalah contoh bagging
- B. Bagging base model: high variance
- C. Boosting base model: high bias
- D. Boosting base model bisa dilatih paralel **<-- CORRECT**

**Pembahasan:** Boosting bersifat SEQUENTIAL -- setiap model belajar dari error model sebelumnya. TIDAK bisa paralel! Ini perbedaan fundamental dengan bagging.

---

### Q17 [Eval, PG, Difficulty 2]
**Model: specificity 0.90, sensitivity/recall 0.50. Interpretasi yang SESUAI:**
- A. Akurasi pasti rendah
- B. Model sering keliru prediksi sampel positif **<-- CORRECT**
- C. Model terlalu banyak false positive
- D. F1-score tinggi

**Pembahasan:** Recall/Sensitivity = 0.50 -> 50% data positif salah diprediksi (FN tinggi). Model SERING KELIRU pada kelas positif. Specificity 0.90 -> baik mengenali negatif.

---

### Q18 [Eval, Hitung, Difficulty 3]
**Evaluasi 2000 records (2% penyakit): Sakit->sakit=30, Sehat->sehat=1900. Hitung Recall!**
- A. 75% **<-- CORRECT**
- B. 93.75%
- C. 96.77%
- D. 95%

**Pembahasan:** Total sakit = 2% x 2000 = 40. TP=30, FN=40-30=10. Total sehat=1960. TN=1900, FP=1960-1900=60. Recall = TP/(TP+FN) = 30/(30+10) = 30/40 = 75%.

---

### Q19 [BV, PG, Difficulty 2]
**Jika bias & variance mendekati nol, ekspektasi generalization error mendekati:**
- A. Nol
- B. Training error
- C. Irreducible error **<-- CORRECT**
- D. Infinity

**Pembahasan:** E[Error] = Bias^2 + Variance + epsilon. Jika Bias ~= 0 dan Var ~= 0, maka Error ~= epsilon (irreducible error). Ini batas bawah yang TIDAK bisa dikurangi.

---

### Q20 [BV, PG, Difficulty 2]
**Metode yang umumnya digunakan untuk mengurangi BIAS model:**
- A. Bagging
- B. Boosting **<-- CORRECT**
- C. Dropout
- D. Menambah data

**Pembahasan:** Boosting = fokus pada data yang salah diprediksi (iteratif) -> mengurangi BIAS. Bagging -> mengurangi VARIANCE. Menambah data -> mengurangi overfitting (variance).

---

### Q21 [KNN, PG, Difficulty 2]
**Jika K semakin BESAR pada KNN:**
- A. Bias turun, variance naik
- B. Bias naik, variance turun **<-- CORRECT**
- C. Keduanya turun
- D. Model makin overfit

**Pembahasan:** K besar -> decision boundary makin smooth -> model makin sederhana -> HIGH BIAS, LOW VARIANCE. K=1 paling complex (overfit), K=N paling simple (underfit).

---

### Q22 [KNN, PG, Difficulty 2]
**Preprocessing yang WAJIB untuk KNN tapi TIDAK wajib untuk DT:**
- A. Handle missing values
- B. Feature scaling/normalisasi **<-- CORRECT**
- C. Encoding fitur kategorikal
- D. Semua di atas

**Pembahasan:** KNN berbasis JARAK -> fitur dengan range besar mendominasi -> WAJIB normalisasi. DT berbasis splitting point -> TIDAK terpengaruh skala fitur.

---

### Q23 [NB, Essay, Difficulty 3]
**P(disease=yes)=0.4, P(no)=0.6. P(smoker=yes|yes)=0.7, P(smoker=yes|no)=0.2. P(exercise=low|yes)=0.5, P(exercise=low|no)=0.3. Prediksi: smoker=yes, exercise=low.**
- A. Disease = YES, P(yes|X) ~= 79.5% **<-- CORRECT**
- B. Disease = NO, P(no|X) ~= 79.5%
- C. Disease = YES, P(yes|X) ~= 50%
- D. Tidak bisa ditentukan

**Pembahasan:** P(yes|X) proportional to 0.7 x 0.5 x 0.4 = 0.14. P(no|X) proportional to 0.2 x 0.3 x 0.6 = 0.036. Total = 0.176. P(yes|X) = 0.14/0.176 = 79.5%. Prediksi: YES.

---

### Q24 [NB, PG, Difficulty 2]
**Fitur age: distribusi overlap antar kelas. Fitur smoker: distribusi berbeda signifikan. Pengaruhnya:**
- A. Age kontribusi tinggi, smoker rendah
- B. Keduanya kontribusi sama
- C. Age kontribusi rendah, smoker tinggi **<-- CORRECT**
- D. Tidak ada pengaruh

**Pembahasan:** Fitur yang distribusinya OVERLAP -> likelihood mirip antar kelas -> kontribusi RENDAH. Fitur distribusi BERBEDA SIGNIFIKAN -> likelihood beda jauh -> kontribusi TINGGI dalam membedakan kelas.

---

### Q25 [Eval, PG, Difficulty 2]
**Pernyataan BENAR tentang evaluasi model:**
- A. Hold-out paling akurat estimasi generalization error
- B. K-Fold: setiap data validasi tepat 1 kali **<-- CORRECT**
- C. Monte Carlo: setiap data pasti pernah validasi
- D. Training error rendah -> testing error rendah

**Pembahasan:** K-Fold: data dibagi K fold, setiap fold jadi validation tepat 1x. Hold-out PALING TIDAK akurat. Monte Carlo: random split, data MUNGKIN tidak pernah jadi validation. Low training error BUKAN jaminan low test error (overfitting).

---

## FULL EXAM SIMULATOR QUESTIONS (UTSPractice.jsx -- 30 Soal)

### Soal 1 [AI & Agents, PG, Difficulty 1, 2pts]
**Sebuah robot pembersih lantai otomatis beroperasi di sebuah kantor. Manakah yang PALING TEPAT mengenai PEAS dari agen tersebut?**
- A. Sensor infrared adalah aktuator dan debu di lantai adalah environment
- B. Sensor infrared adalah sensor, roda penggerak adalah aktuator, dan lantai kantor adalah environment **<-- CORRECT**
- C. Roda penggerak adalah sensor dan kebersihan lantai adalah performance measure
- D. Debu di lantai adalah sensor dan peta ruangan adalah aktuator

**Pembahasan:** PEAS = Performance measure, Environment, Actuators, Sensors. Sensor infrared MENDETEKSI (sensor), roda BERTINDAK (aktuator), lantai kantor adalah LINGKUNGAN tempat agen beroperasi.

---

### Soal 2 [AI & Agents, PG, Difficulty 2, 2pts]
**Anda merancang agen cerdas untuk sistem rekomendasi film di platform streaming. Sifat lingkungan agen yang PALING TEPAT adalah...**
- A. Fully observable, static, discrete, episodic
- B. Partially observable, dynamic, discrete, sequential **<-- CORRECT**
- C. Fully observable, static, continuous, episodic
- D. Partially observable, dynamic, continuous, sequential

**Pembahasan:** Partially observable: agen tak bisa lihat semua preferensi user. Dynamic: preferensi berubah. Discrete: pilihan film terbatas. Sequential: rekomendasi sebelumnya mempengaruhi berikutnya (user behavior berubah).

---

### Soal 3 [AI & Agents, PG, Difficulty 1, 2pts]
**Manakah yang TIDAK menunjukkan sifat cerdas pada mesin?**
- A. Perspektif thinking humanly: mesin mengemulasi proses berpikir mahasiswa memilih antara belajar atau bermain
- B. Perspektif acting rationally: mesin mematikan AC ketika suhu ruangan sudah 20C **<-- CORRECT**
- C. Perspektif thinking rationally: mesin menentukan hujan dari sinyal audio di genting
- D. Perspektif acting humanly: mesin berkomunikasi dengan bahasa manusia

**Pembahasan:** Acting rationally = agen mengambil tindakan TERBAIK untuk mencapai tujuan. Mematikan AC di 20C adalah aturan sederhana (thermostat), BUKAN tindakan rasional yang mempertimbangkan goal secara cerdas -- ini hanya rule-based tanpa reasoning.

---

### Soal 4 [Data Science, Matching, Difficulty 1, 3pts]
**Pasangkan task sains data berikut dengan tipenya!**
- "Berapa harga optimal untuk produk baru?" -> **Prescriptive**
- "Mengapa penjualan turun di Q3?" -> **Diagnostic**
- "Berapa pendapatan tahun depan?" -> **Predictive**
- "Berapa total penjualan bulan lalu?" -> **Descriptive**

**Pembahasan:** 4 tipe analytics: Descriptive = APA yang terjadi? (masa lalu). Diagnostic = MENGAPA terjadi? Predictive = APA yang AKAN terjadi? (masa depan). Prescriptive = APA yang HARUS dilakukan? (rekomendasi aksi).

---

### Soal 5 [Data Science, PG, Difficulty 1, 2pts]
**Manakah pernyataan yang BENAR terkait tahap CRISP-DM?**
- A. Mengunduh data dari berbagai sumber adalah tahap Data Preparation
- B. Perumusan ruang lingkup bersama stakeholder adalah Business Understanding **<-- CORRECT**
- C. Pengukuran hasil regresi adalah tahap Modelling
- D. Implementasi KNN adalah tahap Data Understanding

**Pembahasan:** CRISP-DM: Business Understanding -> Data Understanding -> Data Preparation -> Modeling -> Evaluation -> Deployment. JEBAKAN: Download data = Data UNDERSTANDING (bukan Preparation). Pengukuran hasil = EVALUATION (bukan Modeling).

---

### Soal 6 [Data Science, PG, Difficulty 1, 2pts]
**Pasangkan masalah ML berikut: 'Estimasi masa pakai bohlam baru' adalah problem...**
- A. Classification
- B. Regression **<-- CORRECT**
- C. Clustering
- D. Association

**Pembahasan:** Masa pakai = nilai KONTINU (jam/hari) -> Regression. Jika outputnya kategori (rusak/tidak) -> Classification. Jika mengelompokkan tanpa label -> Clustering.

---

### Soal 7 [EDA & Statistik, PG, Difficulty 2, 2pts]
**Dataset memiliki kolom 'Umur' dengan median=28, mean=35, std=5. Distribusi yang paling mungkin adalah:**
- A. Simetris
- B. Left-skewed
- C. Uniform
- D. Right-skewed **<-- CORRECT**

**Pembahasan:** Mean > Median -> ekor distribusi lebih panjang ke KANAN -> Right-skewed. Ingat: Right-skewed: Mean > Median > Mode. Left-skewed: Mean < Median < Mode. Simetris: Mean ~= Median ~= Mode.

---

### Soal 8 [EDA & Statistik, Hitungan, Difficulty 2, 2pts]
**Data: [5, 6, 3, 1, 4, 2]. Berapakah nilai IQR?**
- A. 2
- B. 3 **<-- CORRECT**
- C. 5
- D. -2

**Pembahasan:** 1. Urutkan: [1, 2, 3, 4, 5, 6]. 2. Q1 = median bawah [1,2,3] = 2. 3. Q3 = median atas [4,5,6] = 5. 4. IQR = Q3 - Q1 = 5 - 2 = 3.

---

### Soal 9 [EDA & Statistik, PG, Difficulty 2, 2pts]
**Korelasi Pearson antara dua fitur adalah 0.02. Pernyataan mana yang BENAR?**
- A. Kedua fitur pasti tidak berhubungan sama sekali
- B. Mungkin saja kedua fitur memiliki hubungan nonlinear yang kuat **<-- CORRECT**
- C. Kedua fitur harus dihapus dari dataset
- D. Perlu dilakukan normalisasi ulang

**Pembahasan:** Pearson mengukur hubungan LINEAR saja! Korelasi rendah TIDAK berarti tidak ada hubungan -- bisa jadi hubungannya NONLINEAR (kurva, parabola, dll). Contoh: x^2 memiliki Pearson ~= 0 dengan x, tapi jelas berhubungan!

---

### Soal 10 [Preprocessing, PG, Difficulty 2, 2pts]
**Menggunakan nilai mean untuk imputasi pada suatu fitur dapat menyebabkan masalah jika...**
- A. Fitur bertipe interval
- B. Fitur memiliki banyak outlier **<-- CORRECT**
- C. Nilai null kurang dari 5%
- D. Fitur terdistribusi normal

**Pembahasan:** Mean SENSITIF terhadap outlier! Jika banyak outlier, mean akan 'tertarik' ke arah outlier -> imputasi jadi tidak representatif. Solusi: gunakan MEDIAN (robust terhadap outlier) atau mode.

---

### Soal 11 [Preprocessing, PG, Difficulty 2, 2pts]
**Fitur kode pos (12350, 12345) bertipe nominal. Pernyataan mana yang BENAR?**
- A. Bisa langsung digunakan sebagai input numerik
- B. Harus ditransformasi dengan Min-Max Scaling
- C. Tidak boleh ditransformasi dengan Min-Max Scaling karena bertipe nominal **<-- CORRECT**
- D. Harus di-log transform dulu

**Pembahasan:** Kode pos TERLIHAT numerik tapi sebenarnya NOMINAL (kategorikal)! 12350 tidak 'lebih besar' dari 12345 secara makna. Scaling pada nominal = SALAH karena mengimplikasikan urutan/jarak. Solusi: One-hot encoding.

---

### Soal 12 [Preprocessing, Hitungan, Difficulty 2, 2pts]
**Dataset:**

| Baris | X1 | X2 | X3 |
|-------|----|----|-----|
| A | 20 | 30 | 5 |
| B | 40 | 10 | 7 |
| C | 30 | 20 | 6 |
| D | 20 | 30 | 2 |
| E | 50 | 10 | NaN |

**Imputasi NaN di baris E dengan KNN (K=1) + Manhattan Distance. Hasilnya?**
- A. 5
- B. 7 **<-- CORRECT**
- C. 6
- D. 2

**Pembahasan:** Hitung jarak E ke semua baris (hanya fitur X1, X2): d(E,A) = |50-20| + |10-30| = 50. d(E,B) = |50-40| + |10-10| = 10 <-- TERDEKAT! d(E,C) = |50-30| + |10-20| = 30. d(E,D) = |50-20| + |10-30| = 50. Tetangga terdekat = B -> X3 = 7.

---

### Soal 13 [PCA, Hitungan, Difficulty 2, 8pts]
**PCA pada data 10 fitur menghasilkan eigenvalues: [6.50, 3.85, 2.90, 2.10, 1.75, 1.40, 1.10, 0.85, 0.55, 0.40]. Total = 21.40.**
**a) Explained variance PC ke-5?**
**b) Minimal berapa PC untuk 95% variance?**

**Answer:** a) 1.75/21.40 = 8.18%. b) 8 PC -> (6.50+3.85+2.90+2.10+1.75+1.40+1.10+0.85)/21.40 = 20.45/21.40 = 95.56%

**Pembahasan:** Explained Variance tiap PC = eigenvalue_i / total_eigenvalues x 100%. Cumulative: PC1: 30.37% | PC2: 48.36% | PC3: 61.92% | PC4: 71.73% | PC5: 79.91% | PC6: 86.45% | PC7: 91.59% | PC8: 95.56%. JEBAKAN: Reduksi dimensi dari 10->1 PC = dimensi jadi 10% (bukan 73%!). Explained variance != persentase dimensi!

---

### Soal 14 [PCA, PG, Difficulty 1, 1pt]
**Manakah pernyataan yang SALAH mengenai PCA?**
- A. Komponen dipilih dari kombinasi linear fitur asli
- B. PC dengan explained variance terkecil berkaitan dengan eigenvalue terkecil
- C. PC dengan explained variance terbesar ADALAH eigenvalue tertinggi **<-- CORRECT**
- D. PC pertama menjabarkan explained variance terbanyak

**Pembahasan:** C SALAH! PC dengan explained variance terbesar BERKAITAN DENGAN eigenvalue tertinggi, bukan IS eigenvalue tertinggi. PC adalah EIGENVECTOR, bukan eigenvalue. PC = eigenvector (arah), eigenvalue = magnitude variance.

---

### Soal 15 [CART, PG, Difficulty 2, 2pts]
**Pernyataan yang PALING TEPAT mengenai decision tree adalah...**
- A. Saat training, setiap leaf node harus pure
- B. Decision tree secara implisit melakukan seleksi fitur **<-- CORRECT**
- C. Merupakan model linear
- D. Semua fitur kategorikal harus di-encode dan dinormalisasi

**Pembahasan:** DT memilih fitur terbaik untuk split di setiap node -> fitur yang tidak pernah dipilih = tidak digunakan = implicit feature selection! A salah: leaf tidak harus pure (bisa di-prune). C salah: DT non-linear. D salah: DT bisa handle kategorikal langsung.

---

### Soal 16 [Random Forest, PG, Difficulty 1, 1pt]
**Random forest biasanya dipilih daripada decision tree karena...**
- A. Cenderung memiliki variance lebih rendah **<-- CORRECT**
- B. Training error selalu lebih rendah
- C. Menghindari underfitting pada decision tree
- D. Lebih mudah diinterpretasi

**Pembahasan:** RF = ensemble dari banyak DT -> rata-rata prediksi -> MENGURANGI VARIANCE (overfitting). DT tunggal = high variance, low bias. RF = lower variance, similar bias.

---

### Soal 17 [Random Forest, Hitungan, Difficulty 1, 2pts]
**Random forest dengan 4 DT untuk REGRESI. Prediksi masing-masing: 11.5, 10, 11, 8. Prediksi akhir?**

**Answer:** (11.5 + 10 + 11 + 8) / 4 = 10.125

**Pembahasan:** RF Regresi -> RATA-RATA prediksi semua tree. RF Klasifikasi -> MAJORITY VOTE. = (11.5 + 10 + 11 + 8) / 4 = 40.5 / 4 = 10.125.

---

### Soal 18 [Evaluasi Model, Hitungan, Difficulty 3, 8pts]
**Confusion Matrix:**

|  | Pred Neg | Pred Pos |
|--|---------|---------|
| Actual Neg | 50 | 10 |
| Actual Pos | 5 | 100 |

**Hitung: Accuracy, Precision, Recall, F1-Score, Specificity**

**Answer:** Acc=90.9%, Prec=90.9%, Rec=95.2%, F1=93.0%, Spec=83.3%

**Pembahasan:** TN=50, FP=10, FN=5, TP=100. Accuracy = (TP+TN)/(Total) = 150/165 = 90.9%. Precision = TP/(TP+FP) = 100/110 = 90.9%. Recall = TP/(TP+FN) = 100/105 = 95.2%. F1 = 2xPxR/(P+R) = 2x0.909x0.952/(0.909+0.952) = 93.0%. Specificity = TN/(TN+FP) = 50/60 = 83.3%.

---

### Soal 19 [Evaluasi Model, PG, Difficulty 2, 2pts]
**Model klasifikasi memiliki specificity=0.90 dan sensitivity=0.50. Interpretasi yang sesuai:**
- A. Akurasi model pasti rendah
- B. Model sering keliru memprediksi sampel positif **<-- CORRECT**
- C. Model terlalu banyak false positive
- D. Model memiliki F1-score tinggi

**Pembahasan:** Sensitivity = Recall = TP/(TP+FN) = 0.50 -> hanya 50% sampel positif terdeteksi benar -> SERING KELIRU pada positif! Specificity = TN/(TN+FP) = 0.90 -> baik dalam mendeteksi negatif. A salah: akurasi bisa tinggi jika data imbalanced.

---

### Soal 20 [Evaluasi Model, PG, Difficulty 2, 2pts]
**Pernyataan mana yang BENAR tentang evaluasi model regresi?**
- A. R^2 negatif menunjukkan kesalahan perhitungan
- B. R^2=0.6 artinya 60% variansi target tidak bisa dijelaskan
- C. MSE lebih sensitif terhadap outlier dibanding MAE **<-- CORRECT**
- D. MAE=2 artinya semua error pasti <= 2

**Pembahasan:** MSE = mean(error^2) -> mengkuadratkan error -> outlier dengan error besar akan ter-AMPLIFIKASI. MAE = mean(|error|) -> hanya absolute -> tidak amplifikasi. A salah: R^2 negatif BISA terjadi (model lebih buruk dari mean). B salah: 60% BISA dijelaskan.

---

### Soal 21 [Bias-Variance, PG, Difficulty 2, 2pts]
**Model A: Train acc 78%, Test acc 76%. Model B: Train acc 99%, Test acc 68%. Pernyataan yang TEPAT:**
- A. Model A overfitting, Model B underfitting
- B. Model A high bias low variance, Model B low bias high variance **<-- CORRECT**
- C. Model A low bias high variance, Model B high bias low variance
- D. Kedua model seimbang

**Pembahasan:** Model A: train ~= test -> gap kecil -> low variance. Tapi akurasi keduanya sedang -> high bias (underfitting sedikit). Model B: train >> test -> gap besar -> HIGH VARIANCE (overfitting). Train sangat tinggi -> low bias.

---

### Soal 22 [Bias-Variance, PG, Difficulty 1, 2pts]
**Jika bias dan variance mendekati nol, generalization error mendekati...**
- A. Nol
- B. Irreducible error **<-- CORRECT**
- C. Training error
- D. Infinity

**Pembahasan:** Generalization Error = Bias^2 + Variance + Irreducible Error. Jika Bias->0, Variance->0, maka Error->Irreducible Error (noise bawaan data yang TIDAK BISA dihilangkan oleh model apapun).

---

### Soal 23 [KNN, Hitungan, Difficulty 3, 5pts]
**Training set untuk KNN (k=3) dengan Manhattan distance:**
X=5,Y=8 -> B | X=2,Y=6 -> A | X=2,Y=1 -> A | X=8,Y=8 -> B | X=3,Y=5 -> A | X=6,Y=7 -> B
**Prediksi data (5,7)?**

**Answer:** Kelas B

**Pembahasan:** Hitung Manhattan distance ke (5,7): (5,8): |5-5|+|7-8| = 1 -> B. (2,6): |5-2|+|7-6| = 4 -> A. (2,1): |5-2|+|7-1| = 9 -> A. (8,8): |5-8|+|7-8| = 4 -> B. (3,5): |5-3|+|7-5| = 4 -> A. (6,7): |5-6|+|7-7| = 1 -> B. 3 terdekat: (5,8)->B, (6,7)->B, (2,6)->A. Majority vote: B wins! (2 vs 1)

---

### Soal 24 [KNN, PG, Difficulty 2, 1pt]
**Preprocessing yang HARUS dilakukan untuk KNN tapi TIDAK harus untuk Decision Tree:**
- A. Menangani missing values
- B. Normalisasi fitur numerik dengan range berbeda **<-- CORRECT**
- C. Encoding fitur kategorikal
- D. Membuang duplikasi data

**Pembahasan:** KNN berbasis JARAK -> fitur dengan range besar akan MENDOMINASI perhitungan jarak -> WAJIB normalisasi! DT berbasis split/threshold -> tidak terpengaruh scale -> normalisasi TIDAK diperlukan.

---

### Soal 25 [Naive Bayes, PG, Difficulty 2, 2pts]
**Asumsi utama pada Naive Bayes classifier adalah...**
- A. Semua fitur harus numerik
- B. Setiap fitur independen satu sama lain given kelas **<-- CORRECT**
- C. Distribusi data harus normal
- D. Jumlah kelas harus seimbang

**Pembahasan:** NAIVE = asumsi bahwa fitur-fitur CONDITIONALLY INDEPENDENT given kelas. P(X1,X2|C) = P(X1|C) x P(X2|C). Asumsi ini 'naif' karena jarang benar di dunia nyata, tapi model tetap sering bekerja dengan baik!

---

### Soal 26 [Visualisasi, PG, Difficulty 1, 2pts]
**Pernyataan mana yang TIDAK BENAR terkait visualisasi data?**
- A. Colored bubble plot tidak dapat memvisualisasi 4 variabel **<-- CORRECT**
- B. Heatmap untuk menampilkan korelasi antar fitur numerik
- C. Horizontal bar chart bisa menggantikan pie chart
- D. Line plot cocok untuk time series

**Pembahasan:** Colored bubble plot BISA visualisasi 4 variabel: X-axis = var 1, Y-axis = var 2, Ukuran bubble = var 3, Warna bubble = var 4.

---

### Soal 27 [CART Essay, Difficulty 3, 10pts]
**Diberikan data Titanic:**

| No | Class | Gender | Origin | Survival |
|----|-------|--------|--------|----------|
| 1 | 1 | Female | Cherbourg | Survived |
| 2 | 1 | Male | Southampton | Not Survived |
| 3 | 2 | Male | Southampton | Survived |
| 4 | 1 | Male | Cherbourg | Not Survived |
| 5 | 1 | Female | Cherbourg | Survived |
| 6 | 2 | Female | Southampton | Survived |
| 7 | 1 | Male | Southampton | Not Survived |
| 8 | 2 | Female | Southampton | Survived |
| 9 | 2 | Female | Southampton | Survived |
| 10 | 2 | Female | Southampton | Survived |

**A. Bangun decision tree! (5p)**
**B. Perlu encoding? Fitur pertama? Kedalaman? (3p)**
**C. Perbedaan regression tree vs classification tree? (2p)**

**SOLUSI LENGKAP:**

A. Hitung Gini Index untuk setiap fitur:
- Gini(S) = 1 - (7/10)^2 - (3/10)^2 = 0.42
- Gender split: Female: 6 Survived, 0 Not = Gini=0. Male: 1 Survived, 3 Not = Gini=0.375. Weighted: 6/10 x 0 + 4/10 x 0.375 = 0.15 <-- TERBAIK!
- Root = Gender. Female -> Survived (pure). Male perlu split lagi.

B.
- Encoding: TIDAK perlu (CART bisa handle kategorikal langsung)
- Fitur pertama: Gender (Gini terkecil)
- Kedalaman: 2 (root -> leaf)

C. Perbedaan:
1. Classification tree: Gini/Entropy untuk split, majority vote di leaf
2. Regression tree: MSE/variance reduction untuk split, MEAN di leaf

---

### Soal 28 [KNN Essay, Difficulty 3, 10pts]
**Training set KNN (k=3):**

| No | Kulit Hijau | Kaki | Tinggi | Bau | Spesies |
|----|------------|------|--------|-----|---------|
| 1 | Tidak | 3 | Tidak | Iya | Alien |
| 2 | Iya | 2 | Iya | Tidak | Alien |
| 3 | Tidak | 2 | Iya | Tidak | Manusia |
| 4 | Iya | 2 | Tidak | Tidak | Manusia |
| 5 | Iya | 3 | Iya | Tidak | Alien |
| 6 | Tidak | 2 | Tidak | Iya | Alien |
| 7 | Iya | 3 | Iya | Tidak | Alien |
| 8 | Tidak | 2 | Iya | Iya | Manusia |
| 9 | Tidak | 2 | Tidak | Tidak | Manusia |
| 10 | Tidak | 2 | Iya | Iya | ? |

**[2p] Preprocessing apa yang perlu?**
**[5p] Prediksi data ke-10!**
**[3p] Pengaruh nilai k terhadap bias-variance?**

**SOLUSI:**

**[Preprocessing]**
- Encoding kategorikal -> numerik (Tidak=0, Iya=1)
- Normalisasi fitur 'Kaki' (range 2-3) agar setara fitur lain (range 0-1)
- Distance metric: Manhattan/Euclidean

**[Prediksi data 10: (0,2,1,1)]**
Setelah encoding: 1:(0,3,0,1) 2:(1,2,1,0) 3:(0,2,1,0) 4:(1,2,0,0) 5:(1,3,1,0) 6:(0,2,0,1) 7:(1,3,1,0) 8:(0,2,1,1) 9:(0,2,0,0)

Data 10: (0,2,1,1). Manhattan distances (tanpa normalisasi):
- d(10,1)=|0|+|1|+|1|+|0|=2
- d(10,2)=|1|+|0|+|0|+|1|=2
- d(10,3)=|0|+|0|+|0|+|1|=1 <-- terdekat!
- d(10,4)=|1|+|0|+|1|+|1|=3
- d(10,5)=|1|+|1|+|0|+|1|=3
- d(10,6)=|0|+|0|+|1|+|0|=1 <-- terdekat!
- d(10,7)=|1|+|1|+|0|+|1|=3
- d(10,8)=|0|+|0|+|0|+|0|=0 <-- terdekat!
- d(10,9)=|0|+|0|+|1|+|1|=2

3 terdekat: 8(Manusia), 3(Manusia), 6(Alien). Majority: **MANUSIA** (2 vs 1)

**[Pengaruh k]**
- k kecil (1) -> low bias, HIGH variance (sensitif noise)
- k besar (9) -> HIGH bias, low variance (terlalu general)
- Pilih k optimal: cross-validation, k ganjil untuk hindari tie

---

### Soal 29 [Evaluasi Essay, Difficulty 3, 10pts]
**Model fraud detection: f(x) output probabilitas 0-1.**

Data uji 12 transaksi (4 fraud, 8 legal):
x1:0.9->fraud | x2:0.8->fraud | x3:0.4->fraud | x4:0.4->fraud
x5:0.6->legal | x6:0.6->legal | x7:0.6->legal | x8-x12: 0.2->legal

**a) tau=0.5: hitung accuracy, precision, recall, F1**
**b) Hitung FPR dan TPR untuk tau in {0.85, 0.7, 0.5, 0.3}**
**c) Gambar kurva ROC**

**SOLUSI:**

a) tau=0.5 -> prediksi fraud jika f(x)>0.5:
Pred fraud: x1,x2,x5,x6,x7 | Pred legal: x3,x4,x8-x12

TP=2(x1,x2) FP=3(x5,x6,x7) FN=2(x3,x4) TN=5(x8-12)

- Accuracy = 7/12 = 58.3%
- Precision = 2/5 = 40%
- Recall = 2/4 = 50%
- F1 = 2 x 0.4 x 0.5 / 0.9 = 44.4%

b) TPR=TP/4, FPR=FP/8:
- tau=0.85: TP=1,FP=0 -> TPR=0.25, FPR=0
- tau=0.7: TP=2,FP=0 -> TPR=0.5, FPR=0
- tau=0.5: TP=2,FP=3 -> TPR=0.5, FPR=0.375
- tau=0.3: TP=4,FP=3 -> TPR=1.0, FPR=0.375

c) Plot (FPR,TPR): (0,0)->(0,0.25)->(0,0.5)->(0.375,0.5)->(0.375,1)->(1,1). AUC = area di bawah kurva.

---

### Soal 30 [Naive Bayes Essay, Difficulty 3, 10pts]
**Naive Bayes untuk prediksi penyakit kronis:**

| age | smoker | exercise | diet | disease |
|-----|--------|----------|------|---------|
| 25 | yes | low | poor | yes |
| 35 | no | low | average | yes |
| 28 | yes | low | poor | yes |
| 32 | yes | low | poor | yes |
| 45 | no | moderate | average | no |
| 50 | no | high | good | no |
| 36 | yes | moderate | average | no |
| 42 | no | moderate | good | no |

**Prediksi pasien: age=33, smoker=no, exercise=moderate**

Hint: Gaussian density untuk age=33: mean=30,std=3.8 -> density=0.07688; mean=30,std=5.07 -> density=0.06605; mean=43.25,std=3.8 -> density=0.00276; mean=43.25,std=5.07 -> density=0.01019

**SOLUSI:**

P(yes)=4/8=0.5, P(no)=4/8=0.5

Untuk disease=yes:
- P(smoker=no|yes) = 1/4 = 0.25
- P(exercise=moderate|yes) = 0/4 = 0
- P(age=33|yes) -> Gaussian(mean=30, std=4.76) ~= 0.07

Untuk disease=no:
- P(smoker=no|no) = 2/4 = 0.50
- P(exercise=moderate|no) = 2/4 = 0.50
- P(age=33|no) -> Gaussian(mean=43.25, std=6.55) ~= 0.03

P(yes|X) proportional to 0.5 x 0.25 x 0 x 0.07 = **0**
P(no|X) proportional to 0.5 x 0.50 x 0.50 x 0.03 = 0.00375

**Prediksi: NO** (karena P(yes)=0 karena zero frequency!)

ZERO FREQUENCY PROBLEM: P(moderate|yes)=0 membuat seluruh probabilitas = 0. Solusi: Laplace smoothing!

---

## BANK SOAL (Past Exam Questions)

### G25-1 [Statistik, Gasal 25/26] -- PENTING
**Diberikan data: [22, 25, 28, 30, 32, 35, 38, 40, 42, 51]. Q1 = 28, Q3 = 40. Tentukan IQR dan outlier yang harus dihapus.**
- A. IQR=8, Batas Atas=50, outlier: 51 **<-- CORRECT**
- B. IQR=8, Batas Atas=42, outlier: 51
- C. IQR=12, hapus semua >40
- D. IQR=8, tidak ada outlier

**Pembahasan:** Menggunakan Q1=30, Q3=38: IQR = Q3 - Q1 = 38 - 30 = 8. Batas Atas = Q3 + 1.5 x IQR = 38 + 12 = 50. Batas Bawah = Q1 - 1.5 x IQR = 30 - 12 = 18. Nilai 51 > 50 -> OUTLIER.

---

### G25-2 [Encoding, Gasal 25/26] -- PENTING
**Dataset dgn fitur kategorikal nominal (warna) untuk KNN. Encoding paling tepat?**
- A. One-Hot Encoding **<-- CORRECT**
- B. Frequency Encoding
- C. Target Encoding
- D. Label Encoding

**Pembahasan:** OHE: biner (1,0,0). Jarak netral. Label Encoding -> urutan palsu. KNN berbasis jarak -> OHE.

---

### G25-3 [PCA, Gasal 25/26] -- PENTING
**PCA 6 fitur. Eigenvalues: [4.5, 3.0, 2.5, 1.5, 1.0, 0.5]. Total=13.0. Minimal PC untuk >=90% variance?**
- A. 3 PC (76.9%)
- B. 4 PC (88.5%)
- C. 5 PC (96.2%) **<-- CORRECT**
- D. 6 PC (100%)

**Pembahasan:** PC4: 88.5% <-- belum 90%. PC5: 96.2% >=90%.

---

### G25-4 [PCA, Gasal 25/26]
**X1 dan X2 berkorelasi positif -> PCA akan?**
- A. Sumbu jadi ortogonal (tidak berkorelasi) **<-- CORRECT**
- B. Tetap berkorelasi positif
- C. Menukar posisi fitur
- D. Mengurangi variansi

**Pembahasan:** PCA -> fitur baru TIDAK BERKORELASI. PC selalu ortogonal.

---

### E25-1 [Normalisasi, Genap 24/25] -- PENTING
**Gaji: [4.5,6,8,12,15]M. MinMax Gaji=4.5? Tanda z-score jika mean=9.1?**
- A. MinMax=0, Z negatif **<-- CORRECT**
- B. MinMax=0.14, Z negatif
- C. MinMax=0, Z positif
- D. MinMax=0.14, Z nol

**Pembahasan:** MinMax = (4.5-4.5)/(15-4.5) = 0. Z = (4.5-9.1)/sigma -> negatif (data < mean).

---

### E25-2 [Preprocessing, Genap 24/25] -- PENTING
**Tentang Random Forest preprocessing. Yang SALAH:**
- A. Split dulu baru preprocess
- B. RF handle kategorikal langsung
- C. RF punya Feature Importance
- D. RF butuh feature scaling **<-- CORRECT**

**Pembahasan:** RF threshold-based -> scaling tidak mengubah urutan. BUTUH scaling: KNN, SVM. TIDAK: DT, RF, NB.

---

### E25-5 [PCA Hitungan, Genap 24/25] -- PENTING
**10 fitur, eigenvalues: [6.50,3.85,2.90,2.10,1.75,1.40,1.10,0.85,0.55,0.40]. Total=21.40. EV PC5? EV PC9? Min PC untuk 95%?**
- A. EV5=8.18%, EV9=2.57%, 8 PC **<-- CORRECT**
- B. EV5=1.75%, EV9=0.55%, 7 PC
- C. EV5=8.18%, EV9=2.57%, 7 PC
- D. EV5=8.18%, EV9=2.57%, 9 PC

**Pembahasan:** EV5=1.75/21.40=8.18%. EV9=0.55/21.40=2.57%. PC8 kumulatif=95.56%.

---

### E25-6 [Bias-Variance, Genap 24/25] -- PENTING
**Bias & variance diminimalkan -> sisa error? Metode turunkan masing-masing?**
- A. Irreducible error; Boosting lowers bias, Bagging lowers variance **<-- CORRECT**
- B. Training error; Boosting lowers variance, Bagging lowers bias
- C. Validation error; keduanya turunkan bias
- D. Model error; tidak bisa dikurangi

**Pembahasan:** epsilon = irreducible error. BIAS -> Boosting. VARIANCE -> Bagging.

---

### 21-1 [Cross-Val, Ganjil 21/22]
**10-fold CV, 200 data. K, M, N?**
- A. K=10, M=180, N=20 **<-- CORRECT**
- B. K=10, M=200, N=20
- C. K=1, M=180, N=20
- D. K=10, M=190, N=10

**Pembahasan:** K=10, N=200/10=20, M=200-20=180.

---

### 21-5 [Statistik, Ganjil 21/22]
**X=[2,2,2,2,2], Y=[0,1,2,3,4]. Mean & std?**
- A. Sama semua
- B. Mean sama, std berbeda **<-- CORRECT**
- C. Mean berbeda, std sama
- D. Mean berbeda, std berbeda

**Pembahasan:** Mean=2 sama. Std X=0, Std Y=sqrt(2) ~= 1.41 -> berbeda.

---

### 21-6 [Normalisasi, Ganjil 21/22] -- PENTING
**Raw MSE=1150, setelah z-score MSE=0.9. Kedua lebih baik?**
- A. True
- B. False **<-- CORRECT**

**Pembahasan:** FALSE! MSE tidak bisa dibandingkan jika skala berbeda!

---

### 21-7 [Decision Tree, Ganjil 21/22] -- PENTING
**DT standarisasi vs tanpa -> prediksi berbeda?**
- A. True
- B. False **<-- CORRECT**

**Pembahasan:** FALSE! DT threshold-based. Standarisasi tidak ubah urutan -> split SAMA.

---

### 21-8 [Z-Score, Ganjil 21/22]
**Tes A: 95, mu=90, sigma=10. Tes B: 70, mu=60, sigma=2. Mana benar?**
- A. Z_B=7.0
- B. Z_A=1.5
- C. Z_A=Z_B
- D. Z_B=0.5
- E. Tidak ada tepat **<-- CORRECT**

**Pembahasan:** Z_A=0.5, Z_B=5.0. Semua pilihan salah -> E.

---

### 21-9 [Metrics, Ganjil 21/22] -- PENTING
**Diagnosa siswa berkebutuhan khusus. Minimisir pendamping tidak perlu. Metrik?**
- A. Precision **<-- CORRECT**
- B. Brier Score
- C. Accuracy
- D. Recall

**Pembahasan:** Minimisir FP -> Precision.

---

### 22-1 [Statistik, Gasal 22/23]
**[5,6,3,1,4,2]. IQR?**
- A. 2
- B. 3 **<-- CORRECT**
- C. 5
- D. -2

**Pembahasan:** Urutkan -> [1,2,3,4,5,6]. Q1=2, Q3=5. IQR=3.

---

### 22-2 [PCA, Gasal 22/23] -- PENTING
**Pernyataan TIDAK TEPAT tentang PCA:**
- A. PC saling ortogonal
- B. Didiagonalisasi = matriks input n x m **<-- CORRECT**
- C. PC1 = eigenvalue terbesar
- D. PCA = transformasi basis

**Pembahasan:** Yang didiagonalisasi = COVARIANCE MATRIX (m x m), bukan input (n x m).

---

### 22-4 [KNN, Gasal 22/23] -- PENTING
**KNN klasifikasi dgn jarak ke centroid kelas?**
- A. Benar
- B. Salah **<-- CORRECT**

**Pembahasan:** SALAH! KNN -> jarak ke SEMUA data. Yang pakai centroid = K-MEANS.

---

### 23-1 [PCA, Gasal 23/24] -- PENTING
**EV=[0.73,0.21,0.04,0.01]. Ambil 1 PC -> dimensi jadi?**
- A. 27%
- B. 25% **<-- CORRECT**
- C. Tidak ditentukan
- D. 73%

**Pembahasan:** JEBAKAN! Dimensi=1/4=25%. 73% itu EV, bukan % dimensi! 60%+ salah menjawab 73%.

---

### 23-2 [Decision Tree, Gasal 23/24] -- PENTING
**Pernyataan PALING TEPAT tentang DT:**
- A. Leaf harus pure
- B. DT implicit feature selection **<-- CORRECT**
- C. Model linier
- D. Harus encode+normalisasi

**Pembahasan:** DT memilih fitur terbaik -> implicit feature selection.

---

### 23-3 [CART, Gasal 23/24] -- PENTING
**Gini Index untuk regression tree?**
- A. True
- B. False **<-- CORRECT**

**Pembahasan:** FALSE! Gini = classification. Regression -> MSE.

---

### 23-4 [Evaluasi, Gasal 23/24] -- PENTING
**F1 >90% -> specificity juga tinggi?**
- A. Benar
- B. Salah **<-- CORRECT**

**Pembahasan:** SALAH! F1 hanya Precision+Recall. Specificity=TN/(TN+FP) terpisah. 70%+ salah di 2023!

---

### 23-5 [Preprocessing, Gasal 23/24] -- PENTING
**Preprocessing WAJIB KNN tapi tidak DT:**
- A. Handle outlier
- B. Cek format
- C. Buang fitur low corr
- D. Normalisasi **<-- CORRECT**

**Pembahasan:** KNN=distance -> scaling wajib. DT=threshold -> tidak perlu.

---

### NB-1 [Naive Bayes, Genap 23/24] -- PENTING
**Asumsi utama Naive Bayes:**
- A. Fitur harus numerik
- B. Conditional independent given class **<-- CORRECT**
- C. Distribusi normal
- D. Kelas seimbang

**Pembahasan:** P(X1,X2|C)=P(X1|C) x P(X2|C). Fitur independen given kelas.

---

### NB-2 [Naive Bayes, Genap 23/24] -- PENTING
**P(fitur|class)=0 -> dampak?**
- A. Normal
- B. Seluruh posterior=0 **<-- CORRECT**
- C. Crash
- D. Ganti model

**Pembahasan:** Zero frequency! Satu 0 -> semua 0. Solusi: Laplace (+1).

---

### IM-1 [Imbalanced, Gasal 24/25] -- PENTING
**SMOTE sebelum train-test split. Kesalahan?**
- A. Tidak ada
- B. SMOTE hanya pada training SETELAH split **<-- CORRECT**
- C. SMOTE setelah evaluasi
- D. SMOTE tidak boleh

**Pembahasan:** DATA LEAKAGE! SMOTE hanya di training data setelah split.

---

## PREDIKSI ESSAY (4 Soal x 10 poin)

### Essay 1: CART -- Bangun Decision Tree (Prob: 95%)
Diberikan dataset ~10-15 baris. Bangun classification tree manual. Hitung Gini/Entropy. Tentukan split. Gambar tree.

**Strategi:**
1. Hitung Gini setiap fitur untuk SETIAP kemungkinan split
2. Pilih split dengan Gini TERKECIL -> Information Gain TERBESAR
3. Ulangi rekursif sampai leaf pure atau stopping criterion
4. DT TIDAK perlu encoding (bisa handle categorical langsung)
5. Jelaskan perbedaan classification tree vs regression tree: (1) Gini->MSE, (2) majority class->mean value
6. Jelaskan depth tree: hitung level dari root ke leaf terdalam

### Essay 2: Metodologi & Evaluation Metrics (Prob: 90%)
Skenario dunia nyata (misal deteksi penyakit langka). Rancang percobaan, pilih metrik, hitung dari confusion matrix, gambar ROC.

**Strategi:**
1. Rancangan: K-Fold CV (K=5/10) + Stratified (pertahankan proporsi kelas)
2. Metric: Penyakit fatal -> RECALL (minimisir FN, jangan miss pasien sakit)
3. Hitung TP/TN/FP/FN dari narasi
4. ROC: hitung TPR & FPR per threshold, plot, threshold optimal = closest to (0,1)
5. Jelaskan ALASAN pemilihan metrik: FN = pasien sakit tidak terdeteksi -> FATAL
6. Hati-hati menghitung: total positif = 2% x total records

### Essay 3: KNN -- Prediksi Step-by-Step (Prob: 90%)
Training set + data baru. Lakukan preprocessing, hitung jarak, prediksi. Diskusikan efek K terhadap bias-variance.

**Strategi:**
1. Step 1: Normalisasi (Min-Max/Z-Score) semua fitur numerik
2. Step 2: Encode fitur kategorikal jika ada
3. Step 3: Hitung jarak (Euclidean/Manhattan) dari query ke SEMUA training data
4. Step 4: Sort jarak, ambil K terdekat
5. Step 5: Majority vote (classification) / Average (regression)
6. Diskusi K: K=1 high variance, K=9 high bias -> pilih K optimal via CV

### Essay 4: Naive Bayes -- Prediksi + Analisis (Prob: 85%)
Hitung prediksi NB dari dataset. Fitur numerik (Gaussian) & kategorikal. Analisis kontribusi fitur.

**Strategi:**
1. Hitung P(C) = prior dari training data
2. Fitur kategorikal: P(xi|C) = count(xi & C) / count(C)
3. Fitur numerik: hitung mu dan sigma per kelas, masukkan ke rumus Gaussian
4. Kalikan SEMUA likelihood x prior: P(C|X) proportional to product(P(xi|C)) x P(C)
5. Jika fitur TIDAK disebutkan di query -> JANGAN masukkan!
6. Bandingkan antar kelas, pilih yang lebih besar
7. Fitur overlap = kontribusi rendah, fitur berbeda signifikan = kontribusi tinggi

---

# EXAM INTEL — Prediksi & Strategi UTS

> Berdasarkan analisis 5 tahun UTS + Asistensi PDF + Tips Asdos

## FORMAT UTS

| Item | Detail |
|------|--------|
| Format | 60 pts (PG+Isian) + 40 pts (4-5 Essay) |
| Waktu | 150 menit (2.5 jam) |
| Notes | 8 halaman A4, open notes |
| Kalkulator | Boleh (scientific) |

## TOPIC WEIGHT (dari analisis 5 tahun UTS)

| Topik | Weight | Essay? | PG? |
|-------|--------|--------|-----|
| Evaluasi & Metrics | 17% | ✅ | ✅ |
| CART / Decision Tree | 14% | ✅ | ✅ |
| Preprocessing | 12% | ❌ | ✅ |
| KNN | 11% | ✅ | ✅ |
| PCA | 10% | ✅ | ✅ |
| EDA & Statistik | 9% | ❌ | ✅ |
| Bias-Variance | 7% | ❌ | ✅ |
| Random Forest & Ensemble | 7% | ❌ | ✅ |
| Naive Bayes | 5% | ✅ | ✅ |
| AI & Agents | 5% | ❌ | ✅ |
| Search Algorithms | 4% | ❌ | ✅ |
| Imbalanced Classification | 3% | ❌ | ✅ |

## TIME STRATEGY

| Waktu | Tugas | Tips |
|-------|-------|------|
| 0–50' | 30 PG/BS | Yang yakin dulu. Flag ragu. Skip >2min/soal. |
| 50–70' | Review PG | Kembali ke flagged. Cek hitungan. |
| 70–130' | 4–5 Essay | Tulis RUMUS dulu, baru hitung. Tunjukkan SEMUA langkah. |
| 130–150' | Final | Semua sub-soal terjawab? Nama+NPM? |

## PREDIKSI ESSAY

### 1. Bangun Decision Tree (CART) — 98% chance
**Kenapa:** Asdos bilang "Sering muncul sebagai esai UTS, biasanya sampai pembentukan Root." Muncul di SETIAP UTS sejak 2021.

**Steps:**
1. Hitung Gini(S) keseluruhan: `Gini = 1 − Σpᵢ²`
2. Siapkan kandidat split per fitur (kategorik: setiap nilai unik, numerik: midpoint)
3. Hitung weighted Gini: `Gini_split = Σ(|Sⱼ|/|S|) × Gini(Sⱼ)`
4. Pilih split dengan weighted Gini TERKECIL → jadi root
5. Ulangi rekursif sampai pure/stopping
6. DT TIDAK perlu encoding
7. Regression tree: ganti Gini dengan MSE, leaf = MEAN

**History:** 2021: 8 baris. 2022: Titanic. 2023: Alien/Manusia. Gasal 24/25: classification + regression.

### 2. KNN: Preprocessing + Prediksi — 92% chance
**Kenapa:** Setiap tahun muncul. Full pipeline selalu ditanyakan.

**Steps:**
1. Encode: Nominal→OHE, Ordinal→Label, Binary→0/1
2. Normalisasi: MinMax atau Z-score
3. Hitung jarak ke SEMUA training (⚠️ target jangan masuk distance!)
4. Sort, ambil K terdekat
5. Classification→vote, Regression→average, Imputation→nearest value
6. Diskusikan K: K=1 high var, K=N high bias

### 3. Naive Bayes Classification — 85% chance
**Kenapa:** BARU semester ini. Heavy asistensi emphasis.

**Steps:**
1. Prior: P(C) = count(C) / total
2. Kategorikal: P(xᵢ|C) = count(xᵢ AND C) / count(C)
3. Numerik: `P(x|C) = (1/σ√2π) × e^(−(x−μ)²/2σ²)`, hitung μ,σ per kelas
4. Kalikan: `P(C|X) ∝ P(C) × ΠP(xᵢ|C)`
5. Bandingkan kelas → pilih terbesar
6. ⚠️ Zero frequency: Laplace `(count+1)/(N+|V|)`
7. Fitur tak disebut → jangan masukkan

### 4. Confusion Matrix + ROC — 75% chance
**Steps:**
1. Tentukan kelas positif
2. Isi TP, TN, FP, FN
3. Hitung: Acc, Prec, Rec, Spec, F1
4. ROC: per threshold hitung TPR & FPR
5. Plot, hitung AUC
6. Threshold optimal = closest to (0,1)

### 5. PCA Computation — 65% chance
**Steps:**
- Case 1 (eigenvalues given): EV = λᵢ/Σλ, kumulatif, pilih k PC
- Case 2 (raw data): center → cov(m×m) → det(C−λI)=0 → eigenvalues → eigenvectors → sort → T=transpose(eigvecs) → project
- Shortcut: inverse eigenvector = TRANSPOSE (ortogonal)

## JEBAKAN UTS (TRAPS)

| Jebakan | Koreksi | Salah Rate |
|---------|---------|------------|
| EV ≠ Dimensi Reduksi | 1 PC dari 4 = 25% dimensi, bukan 73%! | 60%+ |
| F1 tinggi ≠ Spec tinggi | F1 hanya P & R. Spec terpisah. | 70%+ |
| MSE beda skala | TIDAK bisa dibandingkan | 55%+ |
| DT + standarisasi | Split SAMA (threshold-based) | 55%+ |
| KNN ≠ centroid | KNN = semua data. Centroid = K-Means | Klasik |
| Gini = classification only | Regression = MSE | Klasik |
| Cov matrix = m×m | Bukan n×m (data) | 40%+ |
| SMOTE sebelum split | DATA LEAKAGE! Hanya di training | Penting |
| NB: P(x|C)=0 | Semua posterior = 0. Laplace! | Baru |
| KNN imputation target | Target JANGAN masuk distance | Penting |
| Bootstrap = WITH replacement | Bisa duplikat. Boosting ≠ paralel | Klasik |
| Pearson r≈0 | Bisa nonlinear kuat (hanya LINEAR) | 40%+ |

## QUICK DECISION TABLE

| Situasi | Jawaban | Jangan Terjebak |
|---------|---------|-----------------|
| Prediksi harga rumah | Regression | Bukan classification |
| EV=73%, 1/4 PC | Dimensi = 25% | Bukan 73% |
| DT perlu normalisasi? | TIDAK | Threshold-based |
| KNN perlu normalisasi? | YA, WAJIB | Distance-based |
| RF perlu normalisasi? | TIDAK | Threshold-based |
| Gini untuk regression? | TIDAK | Gini = classification |
| F1 tinggi → spec tinggi? | TIDAK pasti | F1 hanya P & R |
| Cov matrix PCA? | m × m (fitur) | Bukan n × m |
| SMOTE kapan? | Setelah split, train only | Sebelum = leakage |
| NB: P(x|C)=0? | Posterior = 0 | Laplace smoothing |
| PCA inverse eigvec? | TRANSPOSE | Karena ortogonal |
| Boosting vs Bagging? | Boost↓bias, Bag↓var | Jangan terbalik! |

## SEMUA RUMUS

### Statistik
- `IQR = Q3−Q1`
- `Outlier: <Q1−1.5·IQR or >Q3+1.5·IQR`
- `Right-skew: Mean > Median`
- `Var = Σ(xᵢ−μ)²/n`
- `Std = √Var`

### Scaling
- `MinMax = (x−min)/(max−min)`
- `Z-score = (x−μ)/σ`
- Below mean → Z negatif

### Distance
- `Manhattan = Σ|xᵢ−yᵢ|`
- `Euclidean = √Σ(xᵢ−yᵢ)²`
- `Cosine = A·B/(‖A‖·‖B‖)`
- `Jaccard = |A∩B|/|A∪B|`

### CART
- `Gini = 1−Σpᵢ²` (classification)
- `Entropy = −Σpᵢ·log₂pᵢ`
- `IG = H(parent)−Σwⱼ·H(childⱼ)`
- Regression: MSE split

### Classification Metrics
- `Precision = TP/(TP+FP)`
- `Recall = TP/(TP+FN)`
- `Specificity = TN/(TN+FP)`
- `F1 = 2PR/(P+R)`
- `Accuracy = (TP+TN)/N`
- `FPR = FP/(FP+TN) = 1−Spec`

### Regression Metrics
- `MAE = Σ|yᵢ−ŷᵢ|/n`
- `MSE = Σ(yᵢ−ŷᵢ)²/n`
- `R² = 1−SS_res/SS_tot`

### PCA
- `EV = λᵢ/Σλ`
- `CumEV = Σλ₁..ₖ/Σλ`
- `Cov matrix = m×m`
- `Transform: T = transpose(eigvecs)`

### Ensemble
- `RF classification = majority vote`
- `RF regression = mean(trees)`
- `Bagging → ↓Variance`
- `Boosting → ↓Bias`

### Naive Bayes
- `P(C|X) ∝ ΠP(xᵢ|C)·P(C)`
- `Gaussian: (1/σ√2π)·e^(−(x−μ)²/2σ²)`
- `Laplace: (count+1)/(N+|V|)`

### Bias-Variance
- `Error = Bias²+Variance+ε`
- `ε = irreducible error`
- `Overfit: train ≫ test (high variance)`
- `Underfit: both low (high bias)`

### Search
- `A*: f(n) = g(n)+h(n)`
- `Admissible: h(n) ≤ h*(n)`
- `Consistent: h(n) ≤ c(n,a,n')+h(n')`
- `UCS = A* with h=0`

## MODEL COMPARISON TABLE

| Property | DT | RF | KNN | NB |
|----------|----|----|-----|----|
| Normalisasi | ❌ | ❌ | ✅ WAJIB | ❌ |
| Encoding | ❌ optional | ❌ optional | ✅ WAJIB | Frekuensi |
| Outlier | ⚠️ Sensitif | ✅ Robust | ⚠️ Sensitif | ✅ Robust |
| Interpretable | ✅ Tinggi | ❌ Rendah | ❌ Rendah | ✅ Cukup |
| Feature Selection | ✅ implicit | ✅ implicit | ❌ | ❌ |
| Lazy learner | ❌ | ❌ | ✅ Ya | ❌ |
| Bias/Variance | Low B, High V | Low B, Low V | Depends on K | High B, Low V |

## ASDOS TIPS

- PCA: eigenvector matrix ortogonal → inverse = TRANSPOSE (tidak perlu hitung inverse manual)
- PCA: kalau soal kasih raw data → tetap harus hitung eigen sendiri dari awal
- KNN imputation: fitur yang ingin diprediksi JANGAN masuk ke perhitungan distance
- CART essay: biasanya sampai pembentukan ROOT saja, jarang sampai full tree
- SMOTE: harus SETELAH train-test split, hanya pada training data
- Recall trick: lihat penyebut di confusion matrix. Recall = baris actual+. Precision = kolom predicted+.

