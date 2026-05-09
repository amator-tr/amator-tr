---
title: 'Anten Tuner ve Empedans Eşleştirme — Internal vs External, Manual vs Auto'
description: >-
  Anten tuner ne işe yarar, ne işe yaramaz. Internal (telsiz dahili) vs
  external, manual T-network vs Auto Tuner (LDG, MFJ), Smith Chart matching,
  balanced vs unbalanced output.
keywords:
  - tuner
  - ATU
  - empedans
  - T-network
  - MFJ
  - başlangıç
article_section: tuner
published_at: '2026-04-26'
updated_at: '2026-04-26'
faq:
  - q: 'Antenim 80m yarım dalga, tuner gerek mi?'
    a: Hayır — rezonans antene tuner gerek değil. Direkt koaks çalışır.
  - q: Random wire (rastgele uzunluk) için ne tuner?
    a: >-
      Geniş range manual tuner veya 9:1 unun + telsiz dahili ATU. Random wire
      SWR çok yüksek (8:1) — auto tuner range yetmeyebilir.
  - q: Tuner içinde SWR meter var mı?
    a: >-
      Çoğu tuner'da var (analog ibre veya dijital). Ama hassas ölçüm için dış
      SWR analyzer veya NanoVNA tercih.
  - q: Auto tuner manual'a göre kaç kat hızlı?
    a: 'Manual: 30-90 saniye, auto: 1-3 saniye. 30x hız.'
  - q: Tuner yokken ne yapılır?
    a: >-
      - Tek bant operasyon (tuner gerek değil) - Telsiz dahili ATU (modern
      modeller) - "Bypass mode" — antenne SWR olduğu gibi kabul, telsiz
      foldback'le güç düşürür ---
---
"Anten SWR yüksek, tuner aldım, şimdi 1:1!" — popüler yanılgı. Tuner SWR'i **gizler**, **çözmez**. Bu rehber tuner'ın gerçek görevi + ne zaman kullan + ne zaman kullanmama gerek + manual vs auto karşılaştırma.

## Tuner ne işe yarar (gerçek)?

**Empedans eşleştirme** — telsizin gördüğü empedansı **50Ω**'a getirme. Anten + koaks sisteminde **gerçekten** ne olur:

### Senaryo: 80m'de SWR 3:1 olan dipole

-   Anten besleme noktası ~150Ω (rezonans dışı bant)
-   Telsiz "150Ω'lık yük" görür
-   Telsiz output transistor 50Ω için tasarlandı
-   50Ω vs 150Ω = SWR 3 = **transistor güç tetiklemesi**

### Tuner devreye girer

-   Tuner = ayarlanabilir L (bobin) + C (kondansatör) network
-   Telsiz tarafı: 50Ω görür
-   Anten tarafı: 150Ω çıkarır
-   **Telsiz mutlu**, korunur

### Aldatıcı kısım

-   **Anten hâlâ 150Ω** — değişmez
-   **Koaksta hâlâ standing wave** — kayıp var
-   Tuner sadece telsiz <-> antenne arası matching yapar
-   Antenden çıkan güç **AYNI** (tuner yokmuş gibi)

### Sonuç

Tuner = **telsizi koruma** + **telsizin göstereceği SWR'i 1:1 yapma**. Antene **giden güç aynı**, sadece telsiz "rahat" ediyor.

## Tuner kayıplar

İdeal tuner kayıpsız değil:

### Maliyet

-   L (bobin) içinde tel direnci
-   C (kondansatör) içinde dielektrik kayıp
-   Tipik kayıp: **0.5-2 dB** (tipik mevcut kayıp ~%10-30)

### Yüksek SWR'de

-   5:1 SWR'de tuner içinde 30-50% güç kaybı
-   10:1 SWR'de 60%+ kayıp — yarı yarıya gücü öldür
-   Tuner "**SWR>3 çok kullanırsan başka anten al**" işareti

## Tuner ne ZAMAN gerek?

### ✓ Yararlı durumlar

1.  **Multi-band tek tel** — 80-10m EFHW, random wire
2.  **Bant sınırı dışı** — anten bantın yarısında düşük SWR, kenarda 2:1+
3.  **Anten boyut hatası** — kısa zaman çözüm (ama kalıcı çözüm: anten boyu düzelt)
4.  **Apartmanda kompromi** — kısa anten zoraki match

### ✗ Yararsız durumlar

1.  **Anten zaten rezonans + SWR 1.5** — gerek yok, tuner kaybı eklersin
2.  **Koaks hasar** — tuner SWR gizler, kabin yanmaya devam eder
3.  **Anten tasarım yanlış** — root cause çözülmedi

## Tuner çeşitleri

### 1\. Internal Tuner (telsiz dahili)

Modern transceiver'larda yaygın:

-   **Icom IC-7300**: SWR<3 hızlı match
-   **Yaesu FT-991A**: SWR<3 dahili
-   **Yaesu FT-DX10**: ATU dahili
-   **Kenwood TS-590**: matching network

#### Avantaj

-   Pratik, tek cihaz
-   Pürüzsüz integration
-   Bant değişikliği otomatik retune

#### Dezavantaj

-   **SWR <3 ile sınırlı** — 5:1 antenne match etmez
-   Sınırlı L/C range
-   Premium telsizlerde, ucuz modellerde yok

### 2\. External Manual Tuner

Klasik T-network, kullanıcı el ile bobin / kondansatör ayar:

-   **MFJ-949E** (~$200) — 1500W, eski standart
-   **MFJ-989D** (~$400) — premium 1500W
-   **Heathkit SA-2060** (vintage) — eski okul
-   **Palstar AT2K** ($800) — premium

#### Avantaj

-   **Geniş range** — 6:1 SWR'a kadar match
-   Düşük kayıp (manuel optimize edilebilir)
-   Hassas ayarlama

#### Dezavantaj

-   Bant değişikliğinde yeniden ayar (10-30 sn)
-   Öğrenme eğrisi var
-   Kontest hızı için zor

### 3\. Auto Tuner (External)

Mikroişlemci kontrollü, otomatik ayar:

-   **LDG Z-100Plus** ($200)
-   **LDG Z-817** ($150) — Yaesu FT-817 için
-   **MFJ-993B** ($300) — IntelliTuner
-   **Elecraft KAT500** ($800) — premium

#### Avantaj

-   **Saniye altı match** (1-2 sn)
-   Hafıza — bant başına ayar saklar
-   Bant değişimini otomatik tespit

#### Dezavantaj

-   Daha pahalı manual'a göre
-   Düşük güç → "Bias TX" başlatır (kısa düşük güç sinyal otomatik için)
-   100-1500W versiyonları farklı fiyatlandırma

## T-network nasıl çalışır

Klasik manual tuner şeması:

```
Telsiz ─── C1 ─── L ─── C2 ─── Anten
            │     │      │
            └─ GND ─┘──── ┘
```

-   **C1**: telsiz tarafı kondansatör (matching)
-   **L**: bobin (rezonans)
-   **C2**: anten tarafı kondansatör (matching)

3 değişken (C1, L, C2) ile **iki boyutlu matching** (kompleks empedans = R + jX).

### Ayar süreci (manual)

1.  Telsizi düşük güç (5W) çıkar
2.  CW veya AM modu (sürekli sinyal)
3.  SWR meter monitor
4.  C1 ayarla — SWR düşer/yükselir
5.  L ayarla
6.  C2 ayarla
7.  Yine C1 dön — fine tuning
8.  SWR < 1.5 hedef

İlk öğrenmek 30 dakika. Pratik 1-2 dakika.

## Auto tuner nasıl çalışır

### Algoritma

1.  Tx başlat (düşük güç)
2.  SWR ölç
3.  Random L, C kombinasyonu dene
4.  SWR'i azaltacak yön belirle
5.  Iteratif optimize → SWR < 1.5
6.  Memory'e kaydet (bant + freq) — sonraki seferde anlık

### Bant değişiminde

-   Auto tuner hafızası kontrol eder
-   Önceki ayarı dener — eğer SWR<1.5 hemen dur
-   Değilse fresh search

## Balanced vs Unbalanced output

Bazı tuner'lar **balanced output** sunar — koaks değil **iki tel** ile dipole'a:

### Unbalanced (50Ω koaks output)

-   Standart amatör — koaks → balun → dipole
-   95% durumlarda yeterli

### Balanced output

-   Tuner **internal balun** — direkt 450Ω ladder line'a
-   Klasik open-wire feedline ile kullanılır
-   Kayıp az (LP kablo daha az kayıp koaksdan)
-   Pahalı + kullanım zor (modern amatör için niche)

### Pratik

Eğer ladder line / open-wire kullanıyorsan **balanced ATU** zorunlu. Aksi takdirde unbalanced yeter.

## SWR analyzer — hassas ölçüm

Tuner ayarı için SWR yeterli ama daha derin analiz için:

### NanoVNA

-   $50-150
-   SWR + empedans (R + jX) + Smith Chart
-   Tuner yokken bile anten karakterizasyonu
-   [NanoVNA tutorial →](/tutorials/nanovna-anten-olcumu)

### MFJ-269 / MFJ-259

-   Klasik amatör SWR analyzer
-   Manuel sweep
-   $300-500

### RigExpert

-   Premium analyzer ($400-1000)
-   Continuous sweep, multi-port

## Sık yapılan hatalar

### 1\. "Tuner çözer her şeyi" yanılgısı

Tuner antenni iyileştirmiyor — sadece telsizin SWR görmesini gizler. Çok yüksek SWR'de tuner içinde **kayıp**.

### 2\. Yüksek güç ile auto-tune

Auto tuner ayar sırasında **5-10W**'a düşürmek lazım. 100W ile auto-tune zorlamak tuner componentlerini yakar.

### 3\. Düşük L (bobin) range

Kısa anten + uzun bant (örn 80m'de 10m tel) → çok yüksek empedans → tuner range yetmez. Çözüm: anten boyut yükselt veya 9:1 unun ekle.

### 4\. Capacitor arc

Yüksek güç + dar capacitor gap → arc, capacitor yanar. Vacuum capacitor kullan ya da gücü düşür.

### 5\. Tuner bypass tek bantta

Eğer tek bant operatörsen + anten o bantta rezonant → tuner bypass et, kayıp önle.

## Tuner alma rehberi (bütçe başına)

### Bütçe entry (≤$200)

-   **LDG Z-817** — Yaesu FT-817 odaklı, 20W
-   **MFJ-902B** — manual, 150W

### Mid-range ($300-500)

-   **MFJ-993B** — auto, 300W, popüler
-   **LDG AT-200ProII** — auto, 250W, premium auto

### High-end ($700+)

-   **MFJ-989D** — manual 1500W tüplü amplifier için
-   **Palstar AT-1500CV** — premium manual
-   **Elecraft KAT500** — auto 500W premium

### Internal tuner Telsiz seçimi

-   **Icom IC-7300** — SWR<3 dahili (yeni başlayan için ideal)
-   **Yaesu FT-991A** — dahili ATU
-   **Xiegu G90** — dahili ATU + 20W (POTA)

## Sık sorulan sorular

### Antenim 80m yarım dalga, tuner gerek mi?

Hayır — rezonans antene tuner gerek değil. Direkt koaks çalışır.

### Random wire (rastgele uzunluk) için ne tuner?

**Geniş range manual tuner** veya 9:1 unun + telsiz dahili ATU. Random wire SWR çok yüksek (8:1) — auto tuner range yetmeyebilir.

### Tuner içinde SWR meter var mı?

Çoğu tuner'da var (analog ibre veya dijital). Ama hassas ölçüm için **dış SWR analyzer** veya NanoVNA tercih.

### Auto tuner manual'a göre kaç kat hızlı?

Manual: 30-90 saniye, auto: 1-3 saniye. **30x hız**.

### Tuner yokken ne yapılır?

-   Tek bant operasyon (tuner gerek değil)
-   Telsiz dahili ATU (modern modeller)
-   "Bypass mode" — antenne SWR olduğu gibi kabul, telsiz foldback'le güç düşürür

* * *

## İlgili kaynaklar

-   [SWR temel](/tutorials/swr-temel-bilgisi)
-   [NanoVNA ile anten ölçümü](/tutorials/nanovna-anten-olcumu)
-   [HF dipole + EFHW](/tutorials/hf-dipole-efhw-anten)
-   [EFHW anten POTA](/tutorials/efhw-anten-detay-pota) — EFHW + tuner uyum
-   [Balun yapımı](/tutorials/balun-yapimi-rehberi)
-   [Anten boy hesaplayıcı](/araclar/anten-hesaplayici/)
-   **Genişletilmiş kaynak:** [telsizcilik.com](https://telsizcilik.com/) — tuner makaleleri
