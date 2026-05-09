---
title: 'Koaksiyel Kablo Seçim Rehberi (RG-58, RG-213, RG-8X, LMR-400)'
description: >-
  Amatör telsiz koaksiyel kablo karşılaştırma. RG-58, RG-8X, RG-213, LMR-400
  frekansa göre kayıp, fiyat, kullanım alanı. PL-259 vs N konnektör, su
  yalıtımı.
keywords:
  - koaksiyel
  - kablo
  - RG-58
  - RG-213
  - LMR-400
  - anten
article_section: koaksiyel
published_at: '2026-04-26'
updated_at: '2026-04-26'
---
Antenden telsize giden koaksiyel kablo görünmez ama sinyalin %20-50'sini kaybedebilen kritik bir bileşen. Yanlış kablo seçimi = anten ne kadar iyi olursa olsun zayıf kontak. Bu rehber 6 yaygın koaks tipini karşılaştırır + frekansa göre seçim kuralları.

## Koaks anatomisi

5 katman:

1.  **İç iletken** (center conductor) — bakır, sinyal taşır
2.  **Dielektrik** — iç ve dış iletkeni ayıran izolasyon (PE, foam, hava)
3.  **Örgü/folyo (shield)** — RF gürültüyü bloke eder, dış iletken
4.  **İkinci shield** (bazı tiplerde) — extra koruma
5.  **Dış ceket** (PVC, PE) — fiziksel/UV koruması

**Karakteristik empedans = 50Ω** amatör radyo standartı (TV/uydu için 75Ω).

## En sık 6 koaks tipi

### RG-58

-   **Çap:** 5 mm (ince)
-   **Kayıp:** Yüksek — 10m'de @ 145 MHz **~1.5 dB**, @ 432 MHz **~2.7 dB**
-   **Güç limiti:** ~250W @ 30 MHz
-   **Fiyat:** Ucuz (~30-50 TL/m)
-   **Kullanım:** Kısa patch kablolar, mobile (3-5m), düşük güç deney
-   **Uzun mesafe için ÖNERİLMEZ** — 20m'de %50 sinyal kaybı UHF'te

### RG-8X (Mini-8)

-   **Çap:** 6 mm
-   **Kayıp:** Orta — 10m'de @ 145 MHz **~1.0 dB**, @ 432 MHz **~1.8 dB**
-   **Güç:** ~600W
-   **Fiyat:** ~50-80 TL/m
-   **Kullanım:** Orta uzunluk (10-20m) HF + VHF, taşınabilir setup, RG-58'in iyi alternatifi

### RG-213

-   **Çap:** 10 mm
-   **Kayıp:** Düşük — 10m'de @ 145 MHz **~0.8 dB**, @ 432 MHz **~1.5 dB**
-   **Güç:** 1500W (HF), 1000W (UHF)
-   **Fiyat:** ~80-150 TL/m
-   **Kullanım:** Sabit istasyon HF + VHF, **standart amatör kablo**. 30-50m'lik run'larda problemsiz.

### LMR-400

-   **Çap:** 10 mm (RG-213 ile aynı dış çap)
-   **Kayıp:** Çok düşük — 10m'de @ 145 MHz **~0.4 dB**, @ 432 MHz **~0.8 dB**
-   **Güç:** 1500W
-   **Fiyat:** ~150-250 TL/m
-   **Kullanım:** **UHF + dijital + uzun runlar için en iyi** (>50m). Ev↔kule arası, repeater installation.

### LMR-600

-   **Çap:** 15 mm (kalın)
-   **Kayıp:** Çok düşük — 10m'de @ 145 MHz **~0.25 dB**, @ 1296 MHz **~0.8 dB**
-   **Kullanım:** Kontest istasyonu, UHF/SHF, çok uzun run (>100m). Pahalı, esnek değil.

### Hardline (LDF4-50A)

-   **Çap:** 12 mm, sert bakır dış iletken
-   **Kayıp:** En düşük — 10m'de @ 145 MHz **~0.18 dB**
-   **Kullanım:** Profesyonel/broadcast/repeater. Ev kullanımı için aşırı.

## Frekansa göre kayıp tablosu (10m kablo)

| Tip | 7 MHz | 14 MHz | 28 MHz | 145 MHz | 432 MHz | 1296 MHz |
| --- | --- | --- | --- | --- | --- | --- |
| RG-58 | 0.4 dB | 0.6 dB | 0.9 dB | 1.5 dB | 2.7 dB | 5.5 dB |
| RG-8X | 0.3 | 0.4 | 0.6 | 1.0 | 1.8 | 3.6 |
| RG-213 | 0.2 | 0.3 | 0.5 | 0.8 | 1.5 | 3.0 |
| LMR-400 | 0.1 | 0.15 | 0.25 | 0.4 | 0.8 | 1.5 |
| LMR-600 | 0.07 | 0.1 | 0.18 | 0.25 | 0.5 | 0.8 |

3 dB = sinyalin **yarısı** kayboluyor. UHF'te RG-58 ile 30m run'da gücün **%75'i kaybolur** — 100W vericiyle anten sadece 25W alır.

### RG-174 uyarısı (tehlikeli)

Çok ince kablo (~2.8mm), sadece **cihaz içi jumper** (maksimum 50 cm) için kullanılmalı. Anten hattı olarak kullanıldığında sistem verimini **%80 düşürebilir** — 100W basarsanız antene 20W ulaşır. NanoVNA'nın kendi kablosu, telsizden SWR metre'ye kısa patch vs. iç kullanım için OK, **anten hattı asla**.

### Velocity Factor (VF) uyarısı

Radyo dalgası kablonun içinde boşluktaki hızından daha yavaş yol alır. Bu orana **Velocity Factor** denir (RG-58: 0.66, LMR-400: 0.85, hava: ~1.0). Eğer anten boyunu **kablo uzunluğuyla** ayarlıyorsan (stub matching, ¼λ transformer) veya faz kaydırmalı bir sistem kuruyorsan, kablonun VF değerini **mutlaka hesaba kat**. Aksi takdirde rezonans noktası sapar ve anten hatalı çalışır. Her kablonun datasheet'inde VF yazılıdır.

## Pratik seçim kuralları

### HF (3-30 MHz), kısa run (≤15m)

**RG-8X yeter.** Kayıp düşük, fiyat makul. RG-213 daha iyi ama 15m'de fark sadece 0.3 dB — gözle görülmez.

### HF, uzun run (15-50m)

**RG-213.** Standart sabit istasyon kablosu.

### VHF/UHF (144/432 MHz), 10-30m

**LMR-400.** RG-213 yerine bu — 432 MHz'de 30m run'da 2 dB tasarruf eder.

### UHF/SHF (≥1 GHz)

**LMR-600 veya hardline.** RG-58/8X ölçeklenebilir bile değil — sinyal kaybı korkunç.

### Mobile (araç)

**RG-58.** Esnek, ince, 1-3m kısa runlar için kayıp önemsiz.

### Düşük güç (QRP, ≤10W)

**RG-58 OK.** Az güç olduğundan kayıp olsa da problem değil.

## Konnektör seçimi: PL-259 vs N

### PL-259 / SO-239 (UHF)

-   **Geleneksel amatör konnektör.** Adı yanıltıcı — "UHF" denir ama UHF için ideal değil
-   Empedans uyumu zayıf (33Ω civarı) — yansıma yapar
-   HF'te problemsiz çalışır
-   Su girişi var (yapıdan dolayı)
-   Ucuz, lehimle kolay

### N-type

-   **Konstant 50Ω** — empedans uyumlu
-   VHF/UHF için ideal
-   Su yalıtımı çok iyi (gasket'lı)
-   Pahalı, takılması zor (özel takım gerek)

### Pratik:

-   **HF**: PL-259 OK
-   **VHF**: PL-259 borderline, N tercih et
-   **UHF/SHF**: N zorunlu

### BNC, SMA

-   **BNC** — quick-connect, hassas RF iş için (oscilloscope, dummy load)
-   **SMA** — küçük cihazlar (Baofeng, NanoVNA), 18 GHz'e kadar

## Su yalıtımı (kablo dışarıda kalıyorsa)

Yağmur + kar + UV → konnektörlere su girer → SWR bozulur, kabin korozyona uğrar.

**Self-amalgamating tape** (3M Scotch 23 gibi) zorunlu:

1.  Konnektörü temiz/kuru ilk başta
2.  Tape'i %50 esneyerek streç ile sar (bant kendi kendine kaynaşır)
3.  Konnektörden 5cm öncesinden 5cm sonrasına kadar
4.  Üstüne **PVC tape** koruma katmanı

**Drip loop** — kablo cihaza girmeden önce U şeklinde bir loop yap, su damlasın diye. Direkt cihaza giren kabloda su içeri akar.

## Kablo kıvrılma sınırı

Her kablonun **minimum bend radius** var:

-   RG-58: 5 cm
-   RG-213: 13 cm
-   LMR-400: 25 cm
-   LMR-600: 38 cm

Minimum'un altında kıvırırsan iç iletken hasarı + dielektrik bozulur, SWR bozulur.

## Maliyet hesabı (örnek)

**Senaryo:** 145 MHz röle anten, 25m kablo, 50W TX:

| Kablo | Antenden çıkan güç | Fiyat |
| --- | --- | --- |
| RG-58 | 25W (yarısı kayıp) | ~1000 TL |
| RG-8X | 35W | ~1500 TL |
| RG-213 | 40W | ~3000 TL |
| LMR-400 | 47W | ~5000 TL |

LMR-400 4-5x daha pahalı ama anten gücünün %94'üne sahip — RG-58 sadece %50. Uzun vadede hangisi daha mantıklı?

## Test ipuçları

-   **NanoVNA TDR (Time Domain Reflectometry):** kabloyu sweep et, internal hasarı tespit et — su girmiş yer veya kıvrılma "spike" gösterir
-   **DC continuity test:** multimetre — center pin'den karşı pin'e direnç düşük (lehim OK), shield'dan center'a açık devre olmalı
-   **Görsel:** ceket çatlağı, plastik sertleşmesi, konnektör paslı

* * *

## İlgili kaynaklar

-   [NanoVNA ile ölçüm](/tutorials/nanovna-anten-olcumu) — kablo testleri dahil
-   [SWR temel bilgisi](/tutorials/swr-temel-bilgisi) — koaks ve SWR ilişkisi
-   [Anten yapımı](/tutorials/anten-yapimi-temel)
-   **Genişletilmiş kaynak:** [telsizcilik.com](https://telsizcilik.com/) — koaks rehberi
