---
title: HF Dipole ve EFHW Anten Yapımı (40m / 20m / Multiband)
description: >-
  HF amatör için pratik anten projeleri — klasik dipole, multiband EFHW (49:1
  unun ile), boyutlandırma formülleri, malzeme listesi, kurulum ve SWR ayarı.
  80m-10m bantlar.
keywords:
  - anten
  - hf
  - dipole
  - efhw
  - unun
  - balun
  - diy
article_section: anten
published_at: '2026-04-25'
updated_at: '2026-04-25'
faq:
  - q: 'Tel cinsi: bakır mı, alüminyum mu?'
    a: 'Bakır. Alüminyum oksitlenir, lehim zorlaşır'
  - q: 14 AWG vs 18 AWG vs CCS?
    a: '14 AWG en sağlam (rüzgâra karşı). 18 lighter, kısa süreli iyi'
  - q: Antenamı ağaca asabilir miyim?
    a: >-
      Evet — naylon halat + ağaç dalı izolasyon. Ama elektrik hatlarına yakın
      olmasın
  - q: '1:1 balun şart mı?'
    a: >-
      Dipole'da çok önerilen (RF "common mode" akımı önler). Skip ederseniz
      koaks dış çorabı tipik 5-15 dB sinyal kaçışı
  - q: EFHW'da counterpoise neden 0.05 λ?
    a: >-
      Pratik kompromise — daha kısa: zayıf RF balance; daha uzun: kendisi
      resonator olur, paterni bozulur
  - q: Kar/buz tehlikesi?
    a: >-
      Kar yığması antenin ek ağırlık + windload oluşturur; sağlam halat + kopma
      noktası lehim ile değil mekanik bağlantı
  - q: Apartmanda nasıl yaparım?
    a: >-
      Magnetic loop (1-1.5m çelik halka + 365 pF değişken kondansatör) — düşük
      verim ama 10m'lik daire yer ister
---
## HF anten temelleri

VHF/UHF (144/430 MHz) için J-Pole + Slim Jim yeterli ([anten yapımı temel](/tutorials/anten-yapimi-temel)). HF (3.5-30 MHz) için ise dalga boyu çok daha büyük (20-80 m), antenler de büyük. Ev yapımı HF anten = uzun **tel** + uygun balun/unun.

İki temel topoloji:

| Topoloji | Yapısı | Avantaj | Dezavantaj |
| --- | --- | --- | --- |
| **Half-wave Dipole** | Merkezden beslenen yarım dalga (`λ/2`) | Klasik, geniş anlaşılır, simetrik | İki direk gerekli, tek bant resonant |
| **EFHW (End-Fed Half-Wave)** | Bir uçtan beslenen yarım dalga, 49:1 unun ile | Tek direk, multiband (80-10m harmonik resonance), balkonda kurulabilir | Counterpoise şart, RF emniyet kuralları daha sıkı |

**HF'e ilk başlangıç:** EFHW. Daha az direk, daha fazla bant.

> 🛠️ **Hesaplayıcı:** Manuel formül uygulamak yerine frekans + tip + VF girip otomatik boyları al — **[Anten Boy Hesaplayıcı](/araclar/anten-hesaplayici/)** (dipole, EFHW, vertical, J-Pole; tüm bantlar).

## Dalga boyu formülü

HF için kritik tek formül:

```
λ (metre) = 300 / freq (MHz)
λ/2 (yarım dalga, dipole/EFHW radyatör) = 150 / freq (MHz) × 0.95 (velocity factor)
λ/4 (çeyrek dalga, vertical) = 75 / freq (MHz) × 0.95
```

VF 0.95 = bare copper wire için tipik. Yalıtkan kaplı tel daha düşük (0.85-0.92) → boyu kısaltır.

### Bant başına yarım dalga uzunlukları

| Bant | Frekans (MHz) | λ/2 (m, VF 0.95) |
| --- | --- | --- |
| 80m | 3.6 | **39.6 m** |
| 40m | 7.1 | **20.1 m** |
| 30m | 10.1 | 14.1 m |
| 20m | 14.2 | **10.0 m** |
| 17m | 18.1 | 7.9 m |
| 15m | 21.2 | 6.7 m |
| 12m | 24.9 | 5.7 m |
| 10m | 28.5 | 5.0 m |

## Klasik HF Dipole (40m bant örneği)

### Malzeme listesi

| Parça | Adet | Açıklama |
| --- | --- | --- |
| Bakır tel | 21 m | 14-18 AWG (~1.6-2 mm), ısıyla kaplı veya çıplak |
| **1:1 voltage balun** | 1 | T200-43 toroid + kapatma kutusu, ~$30-50 |
| 50Ω koaks kablo | 5-15 m | RG-58 (kısa) veya RG-213 (uzun) |
| End insulator | 2 | Plastik dipole insulator (~$5/adet) |
| Center insulator | 1 | Balun'a entegre |
| Direkler / ağaçlar | 2 | 6-10 m yükseklik ideal |
| Naylon halat | 30+ m | Anten gerginliği için |

**Toplam:** $80-150 (TR'de ~3000-5000 TL).

### Boyutlandırma

40m bantı (7.1 MHz merkez):

-   **Toplam uzunluk**: 21 m (her tel 10.5 m)
-   **Yükseklik**: en az **10 m** (λ/4) — daha alçaksa empedans bozulur, NVIS modu (yakın menzil)
-   **Yön**: doğu-batı — sinyal kuzey-güney'de güçlü (HF dipole'un radyasyon paterni)

### Kurulum

```
            ────────────────│────────────────
           ←──── 10.5 m ───→│←──── 10.5 m ───→
                            │ (1:1 balun)
                            │
                            │
                            │ (koaks indirme dik)
                            │
                            ▼
                         transceiver
```

1.  Telleri kes (her tarafa 10.5 m + 30 cm fazla — sondan kısaltarak SWR ayar)
2.  End insulator'ları takılır (plastik, kuruyup kopmaz tel)
3.  Tel uçlarını naylon halat ile direklere bağla
4.  Merkez balun'u ortaya as, koaksı dikey indir
5.  Koaksta **çoraplı RF**'i azaltmak için 5-7 sarımlık koaks "choke" yap (90-100 mm çap)
6.  SWR ölçere bağla — sweep et, dip frekansı bul
7.  Dip 7.1 MHz'in **altındaysa** her iki taraftan eşit miktarda kısalt (5-10 cm). **Üstündeyse** yine eşit kısalt veya uzat
8.  Hedef SWR < 1.5:1, kabul edilebilir < 2:1

## EFHW (End-Fed Half-Wave) — daha esnek

EFHW = aynı yarım dalga teli, **bir ucundan** beslenen versiyon. Avantajı:

-   Tek direk + counterpoise, balkondan veya çatıdan asma
-   49:1 unun ile **multiband resonance** (80-40-20-15-10m harmonik)
-   Random-length yerine **tam λ/2** olduğu için tuner gerek değil

Dezavantaj:

-   Yüksek empedans (~2500Ω) end → 49:1 unun ile 50Ω'a düşürülür
-   Counterpoise (tek ya da çok-tel) şart
-   High-RF voltage, açık alanda kabul edilebilir; iç mekânda elektrik şoku riski

### Multiband EFHW (40m primer + 80/20/15/10 harmonik)

Tek 20.1 m tel:

```
[ Unun box ]── 20.1 m bakır tel ──end-insulator
   │ (49:1 toroid)
   │
   │ 50Ω koaks
   │
   ▼
transceiver
```

**Bantlar bu telde:**

-   40m (7.1 MHz): tam λ/2 ✓
-   20m (14.2 MHz): 1λ — radyasyon paterni farklı ama yüksek empedans yine ✓
-   15m (21.3 MHz): 1.5λ ✓
-   10m (28.4 MHz): 2λ ✓
-   80m (3.55 MHz): λ/4 — tuner gerekebilir, multimode değil ama çalışır

### 49:1 Unun yapımı

Unun = "unbalanced to unbalanced" empedans transformatörü.

**Toroid çekirdek:** **FT240-43** (büyük, 500 W'a kadar — pahalı, $25) veya **FT140-43** (orta, 100 W) veya **FT82-43** (QRP, 5-20 W).

**Sargı oranı 49:1 → tel oranı 7:1:**

-   **Primer (TX'ten gelen)**: 2 sarım
-   **Sekonder (antene giden)**: 14 sarım

Tipik konstrüksiyon:

-   14 AWG enameled (vernikli) bakır tel
-   ~7-8 cm primer
-   ~110-130 cm sekonder
-   Toroidi sıkı sarıp kuru sarımla (boşluk olmadan eşit dağılım)
-   Plastik kutuda sızdırmaz (su girmez), SO-239 / BNC RF konektör

**100 pF mica kondansatör** (primer-toprak arası): yüksek bantlarda SWR düzeltmesi (10m'de tipik gerekli).

[Detaylı yapım rehberi: KM1NDY DIY 49:1 Unun](https://km1ndy.com/diy-491-unun-impedence-transformer-for-end-fed-half-wave-efhw-antenna/)

### Counterpoise (geri-yer telleri)

EFHW unun bir RF ground'a ihtiyaç duyar — yoksa koaks dış çorabını antenin kendisi gibi kullanır (RF'in geri dönüş yolu eksik). Çözüm: **counterpoise** — alıcı tarafında kısa tel(ler):

-   En basit: **0.05 λ** (en alçak band) tek tel — 80m için **4 m** tel
-   Daha iyi: 5-10 paralel tel, her biri farklı uzunluk (1.2 m, 2 m, 3.5 m, 5 m, ...) — geniş bant performans
-   Toprağa kazık değil — RF için zemin değil "elektromanyetik balans" gerekiyor

### Kurulum tipleri

```
   Tip A: yatay (klasik)
   
   [ Unun ]──────────── 20.1 m ──────────[ end ]
       ↓
       ↓ counterpoise (4 m, ters yön)
       ↓
   transceiver

   Tip B: ters L (yer kazanır)
   
   [ Unun ]──── 12 m yatay ────┐
                                │
                                │ 8 m dikey
                                │
                              [ end ]
   ...

   Tip C: eğik (çatıdan ağaca)
   
                          [ end ]
                         /
                        / 20.1 m eğik
                       /
                      /
                  [ Unun + counterpoise ]
                      |
                  transceiver
```

C tipi balkonda yaşayan amatörler için ideal — balkondan komşu ağaca veya direğe eğik halat çekme.

## SWR ayar süreci

NanoVNA veya MFJ-849 ile her bantı sweep:

1.  Bant merkez frekansını seç (örn. 7.1 MHz)
2.  Sweep 6.5-7.5 MHz (geniş)
3.  Min SWR frekansını gör
4.  **Hedeften aşağı** → tel kısa, **uzat** (5-10 cm) — frekans yukarı kayar
5.  **Hedeften yukarı** → tel uzun, **kısalt**
6.  < 2:1 SWR → kabul, < 1.5:1 → mükemmel
7.  Tüm hedefe banlarda kontrol et — multiband EFHW'de bazı bantlarda compromise olur (dipole optimal değil)

EFHW her zaman 80m'de en yüksek SWR (3-5:1) verir — tuner ile çalıştırılır.

## Performans karşılaştırma (40m, 10 m yükseklik)

| Anten | 100 W TX, ABD doğu sahil | 100 W TX, Avustralya |
| --- | --- | --- |
| 1/4 vertical (kompromise) | \-100 dB | \-120 dB (zor DX) |
| **40m dipole** (10m yüksek) | \-90 dB | \-100 dB |
| **40m EFHW** (10m yüksek) | \-92 dB | \-102 dB (dipole'a çok yakın) |
| Yagi 3-element (>15m yüksek) | \-75 dB | \-85 dB |

Dipole ve EFHW pratikte birbirine **çok yakın**. Yagi (yönlü) ileri sınıf upgrade.

## Yükseklik etkisi

HF'de yükseklik **çok kritik**:

-   **0.25 λ altında** (40m'de < 10m): NVIS modu — yakın menzil (200-1000 km), uzak DX zor
-   **0.5 λ** (40m'de 20m): mükemmel DX
-   **1 λ** (40m'de 40m+): dilek ama imkansız çoğu için

Çatıya 8-10 m direk + bayrak direği kombinasyonu = ulaşılabilir maksimum.

## RF güvenliği

| Güç (W) | Anten yakını mesafe (TX sırasında) |
| --- | --- |
| 5W (QRP) | 30-60 cm |
| 100W (typical) | 2-3 m |
| 500W | 4-6 m |
| 1500W (max US) | 7-10 m |

EFHW'in **end** ucu **çok yüksek RF voltage** — bina/çocuk/hayvan ulaşabilir bölgede olmamalı. Tel ucunu 3+ m yüksekte tut.

Yıldırım koruması: anten kabarcığında **gas discharge tube** (~$15-30, NMO/SO-239) + topraklama (10mm² tel direkt toprağa) zorunlu.

## Sık sorulan sorular

| Soru | Cevap |
| --- | --- |
| Tel cinsi: bakır mı, alüminyum mu? | Bakır. Alüminyum oksitlenir, lehim zorlaşır |
| 14 AWG vs 18 AWG vs CCS? | 14 AWG en sağlam (rüzgâra karşı). 18 lighter, kısa süreli iyi |
| Antenamı ağaca asabilir miyim? | Evet — naylon halat + ağaç dalı izolasyon. Ama elektrik hatlarına yakın olmasın |
| 1:1 balun şart mı? | Dipole'da çok önerilen (RF "common mode" akımı önler). Skip ederseniz koaks dış çorabı tipik 5-15 dB sinyal kaçışı |
| EFHW'da counterpoise neden 0.05 λ? | Pratik kompromise — daha kısa: zayıf RF balance; daha uzun: kendisi resonator olur, paterni bozulur |
| Kar/buz tehlikesi? | Kar yığması antenin ek ağırlık + windload oluşturur; sağlam halat + kopma noktası lehim ile değil mekanik bağlantı |
| Apartmanda nasıl yaparım? | Magnetic loop (1-1.5m çelik halka + 365 pF değişken kondansatör) — düşük verim ama 10m'lik daire yer ister |

## Test ve doğrulama

İlk on-air testi:

1.  Anten + balun/unun bağlantı OK
2.  Kuru hava + güneşli (kar/yağmur kondisyonu farklı)
3.  SWR < 2:1 her hedef bantta
4.  **Reverse Beacon Network**: [reversebeacon.net](https://reversebeacon.net) — CW yayın yap, dünya skimmerları sinyalinizi otomatik decode + raporlar
5.  **PSKReporter**: [pskreporter.info](https://pskreporter.info) — FT8 yayın yap, global harita kim sizi duyduğu

Eğer 5 W FT8 ile 5+ kıtaya ulaşıyorsanız anten doğru çalışıyor.

## Yararlı kaynaklar

-   [KM1NDY DIY 49:1 Unun (en detaylı)](https://km1ndy.com/diy-491-unun-impedence-transformer-for-end-fed-half-wave-efhw-antenna/)
-   [N7TWL EFHW PDF rehber](https://n7tar.org/wp-content/uploads/2023/06/The-End-Fed-Half-Wave-Antenna.pdf)
-   [M0UKD EFHW + 1:1 balun](https://m0ukd.com/homebrew/baluns-and-ununs/)
-   [VU2NSB Multiband EFHW analiz](https://vu2nsb.com/antenna/wire-antennas/multiband-efhw-antenna/)
-   [ARRL EFHW Antenna Kit](https://www.arrl.org/end-fed-half-wave-antenna-kit) — ticari + DIY karışım

## Sıradaki adımlar

-   [NanoVNA ile Anten Ölçümü](/tutorials/nanovna-anten-olcumu) — kurduğunuz HF antenin SWR/empedans ölçümü
-   [FT8 Dijital Mod](/tutorials/ft8-dijital-mod) — HF dipole/EFHW + FT8 = düşük güçle DX
-   [Mors Kodu](/tutorials/mors-kodu-ogrenme) — CW HF kontestler için optimal mod
-   [J-Pole / Slim Jim VHF Anten](/tutorials/anten-yapimi-temel) — VHF tarafı, HF'le farklı dünya

73, ve **POTA** aktivitelerinde EFHW'iniz portatif olarak çıksın!
