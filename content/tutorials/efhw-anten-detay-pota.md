---
title: EFHW (End-Fed Half-Wave) Anten Detaylı Yapım — POTA / SOTA Favorisi
description: >-
  End-Fed Half-Wave anten DIY rehberi. 49:1 unun, multi-band çalışması (40-10m),
  tek tel besleme, yapım maliyeti $20-50, POTA aktivasyonunda neden lider.
keywords:
  - EFHW
  - anten
  - POTA
  - SOTA
  - portable
  - DIY
article_section: EFHW
published_at: '2026-04-26'
updated_at: '2026-04-26'
faq:
  - q: EFHW bandwidth ne kadar?
    a: >-
      Tipik 50-150 kHz SWR<1.5 her bantta. Bantın orta-yarısında ideal,
      kenarlarda SWR yükselir.
  - q: End-fed Z" vs "End-fed half-wave" fark?
    a: >-
      "End-fed Z" general — herhangi bir uzunluk. EFHW spesifik = yarım dalga.
      Kullanım kolaylığı için EFHW tercih.
  - q: Tek bant EFHW (sadece 40m) yapılır mı?
    a: >-
      Evet — sadece 40m'i hedef alıyorsan. Multi-band gerek yoksa daha basit
      unun (1:9 veya 1:25) yeter.
  - q: Lisans şart mı?
    a: >-
      Evet, B sınıfı (HF kullanım yetkisi). EFHW HF antenne için, C sınıfı 28
      MHz dışında HF yapamaz.
  - q: Apartmandan EFHW pratik mi?
    a: >-
      Zor. 40m EFHW = 20m yatay tel — apartmanda bu uzunluk imkansız. 20m EFHW
      (10m tel, 20m + 10m bantları) balkonda mümkün. ---
---
POTA / SOTA aktivatörlerinin %70'i bu anteni kullanıyor. **EFHW (End-Fed Half-Wave)** — bir tel, bir 49:1 unun, kullan-at basitliği. Çoklu bant (40m-10m), tek besleme noktası, ağaca atılabilir. Bu rehber ayrıntılı yapım + frekans hesabı + saha kurulum.

## EFHW nedir, neden popüler?

**End-fed** = tel'in **ucundan** beslenir (klasik dipole'un ortasında değil).

**Half-wave** = tam yarım dalga uzunluğunda (40m bandı için 20m tel).

**49:1 unun** = empedans 2450Ω'dan 50Ω'a düşürür.

### Avantajlar (POTA için)

-   **Tek tel** — koaks beslemesi tek noktada, tel ağaca veya direğe çekilir
-   **Multi-band** — 40m + 20m + 15m + 10m (harmonics) — tek anten 4 bant
-   **Hafif** — 20 metre AWG-22 tel + küçük unun = 200 gr
-   **Hızlı kurulum** — 5 dakikada gerilebilir
-   **Ucuz DIY** — 200 TL malzemeye

### Dezavantajlar

-   **80m için zor** — 40m tel ağaç gerek (büyük)
-   **Yüksek voltaj uçta** — RF "hot end" tehlikeli
-   **Mismatch tuner gerek** — bazen ek tuner yardımcı

## Fiziksel temel

### Yarım dalga = boyu

$L = \\frac{300 \\cdot V\_F}{2 \\cdot f}$

-   L: tel uzunluğu (m)
-   V\_F: velocity factor (~0.95 hava'da)
-   f: frekans (MHz)

| Bant | Frekans | EFHW boyu |
| --- | --- | --- |
| **40m** | 7.1 MHz | 20.1m |
| **20m** | 14.2 MHz | 10.0m |
| **15m** | 21.3 MHz | 6.7m |
| **10m** | 28.5 MHz | 5.0m |

40m EFHW (20m tel) **40m + 20m + 15m + 10m** dört bantta yarım dalga harmonics olur:

-   40m: f0 (1λ/2)
-   20m: 2× f0 (2λ/2 = λ)
-   15m: 3× f0 (3λ/2)
-   10m: 4× f0 (4λ/2 = 2λ)

Multi-band aynı tel ile!

### Empedans: gerilim beslemesi vs akım beslemesi

Klasik dipole merkezden beslenir — orta noktada akım yüksek, gerilim düşük = **akım beslemeli** (low impedance, ~73Ω). EFHW uçtan beslenir — uçta akım sıfır, gerilim maksimum = **gerilim beslemeli** (high impedance, 2400-3000Ω).

Bu fark anlamına gelir:

-   Besleme noktasında **binlerce volt** oluşur (100W TX'te 1-3 kV)
-   Direkt 50Ω koaksla bağlanamaz → **49:1 unun** empedans dönüşümü zorunlu
-   İnsulator + izolasyon kritik (tel sonuna dokunma!)

EFHW'yi pratik yapan şey: akım beslemeli dipole **ortadan** koaks gerektirir (iki yöne direk + ortada ağır kablo). Gerilim beslemeli EFHW **uçtan** tek noktada bağlanır — tek direk veya ağaç yeter.

**Alternatif:** Eğer EFHW boyu yapamıyorsan, [random wire + 9:1 unun](/tutorials/random-wire-anten-9-1-unun) ile rastgele uzunlukta tel + tuner ile tüm bantlarda çalışabilirsin (ama daha az verimli).

## 49:1 Unun yapımı

[Balun yapımı tutorial](/tutorials/balun-yapimi-rehberi) detaylıca işliyor. Kısa:

### Malzeme

-   1× **FT-240-43** ferrit toroid (~250 TL)
-   1.5m enamel bakır tel 1.5mm
-   1× SO-239 bulkhead konnektör
-   1× M5 cıvata + somun + lehim malzeme
-   1× (opsiyonel) 100 pF cap (5 kV) parallel
-   Plastik kutu ~10×6×3 cm

### Sarım

**14:2 ratio** = 14 sarım sekonder + 2 sarım primer:

1.  Telin başını M5 cıvataya bağla (anten teli noktası)
2.  **Toroid etrafına 14 sarım** sar — eşit dağıt
3.  **2 sarım daha sar** (sekonder devamı)
4.  **Tap point** — 2 sarım sonrasında SO-239 inner pin'e
5.  Kalan 14 sarımın sonu → toroid'e başlangıçla aynı tarafa, M5'e geri
6.  Cap (opsiyonel) M5 ↔ SO-239 outer arasında parallel

### Test

-   NanoVNA: 50Ω dummy load anten tarafına
-   1-30 MHz sweep
-   SWR < 1.5 olmalı tüm aralıkta (geniş bant unun)

## Anten teli

### Boyut: 20m AWG-22 (40m EFHW için)

-   AWG-22 = 0.6mm çap, hafif (60 gr/100m)
-   Bakır kalay kaplı veya emaye
-   Polywire (sentetik çekirdek + tel) extra mukavemet

### Boy ayar — kritik

-   **20.1m mathematical** ama **anten kuruluş yüksekliğine bağlı** etkilenir
-   İlk denemede 20.5m kes
-   NanoVNA SWR ölç → her bant'ta minimum SWR frekansı bul
-   Eğer 7.0 MHz'de min SWR (40m alt sınırı dışında) → 5cm kısalt
-   Iteratif fine-tune

### Tel sonu insulator

EFHW ucunda **yüksek voltaj** (1-3 kV @ 100W TX). İnsulator zorunlu:

-   Plastik egg insulator
-   PVC tüp parçası
-   Anten teli sonunda halka — direkt ip bağlanmasın (ip iletken olabilir)

## Kurulum

### Saha senaryosu (POTA)

```
   [Ağaç]
      │ ip
      │
      ●─── insulator
      │
   ~20m AWG-22 tel
      │
      │
   ●─── 49:1 unun
      │ koaks
      │
   [Telsiz]
```

### Adım adım

1.  **Ağaca ip at** — slingshot veya tenis topu ile (3-5m yüksek)
2.  **Anten teli ip'e bağla** (insulator aracılığıyla)
3.  **Tel'i çek** — yatay veya hafif eğik
4.  **Unun yer altında** — telin diğer ucu unun M5'ine, koaks unun'dan telsize
5.  **Telsizi tune** — SWR<2 her bantta

### Yön

EFHW yatay → maksimum yayma anten teline **dik** (yan loblar)

-   Doğu-batı yönelimli tel → kuzey ve güneye yayar
-   DX hedefini bil → tel yönünü buna göre ayarla

### Yükseklik

-   **5-10m** ideal — yer yansıması düşük loss
-   3m altı NVIS olur (yakın menzil)
-   15m+ premium ama POTA için pratik değil

## Multi-band tuning

Pratikte 40m EFHW her bantta SWR <1.5 olmaz. Bantlar:

| Bant | Tipik SWR (counter-poise yok) |
| --- | --- |
| 40m | 1.2:1 ✓ |
| 20m | 1.4:1 ✓ |
| 15m | 1.5:1 ✓ |
| 10m | 1.5:1 ✓ |
| 30m | 4:1 ✗ (harmonic değil) |
| 17m | 3:1 ✗ |
| 12m | 3:1 ✗ |

**Tuner ile 30m + 17m + 12m** açılır — telsiz dahili tuner yeterli (IC-7300, FT-991A).

## Counterpoise (yer iletkeni) — opsiyonel

EFHW "feedline counterpoise" gibi davranır — koaks shield'i bir tür ground görevi. Performans için **küçük counterpoise** ekleme:

-   5m AWG-22 tel
-   Unun toprak (M5) noktasına bağla
-   Yere yatay bırak (anten yönüne ters)
-   Bu zaten **counterpoise** veya **rejection filter** değil — sadece RF için ground reference

İhtiyaç tartışmalı. Bazı operatörler EFHW'i temiz "tek tel" olarak kullanır, diğerleri counterpoise ile %5-10 verim artışı raporluyor.

## EFHW kit alıma alternatifi

DIY istemiyorsan:

| Marka | Model | Bant | Güç | Fiyat |
| --- | --- | --- | --- | --- |
| **MyAntennas** | EFHW-8010 | 80-10m | 1000W | $150 |
| **Sotabeams** | EFHW QRP | 40-10m | 50W | $50 |
| **PackTenna** | Mini EFHW | 40-6m | 25W | $90 |
| **Chameleon** | TD-LITE | 40-6m | 50W | $120 |

**MyAntennas EFHW-8010** = POTA topluluğunda altın standartı.

## EFHW vs alternatif portable antenler

### vs Linked dipole

-   **EFHW**: tek tel, multi-band, hızlı
-   **Linked dipole**: bantlar arası link aç/kapat — tuning hassas
-   EFHW kazanan — basitlik için

### vs Vertical

-   **EFHW**: yatay, ağaç gerek
-   **Vertical**: dikey direk + radyaller
-   EFHW kazanan — ağaç olan yerde
-   Vertical kazanan — ağaç yoksa

### vs Random Wire

-   **EFHW**: rezonant, multi-band, tuner gerek değil (büyük kısım)
-   **Random Wire**: rastgele uzunluk, tuner zorunlu, daha esnek
-   EFHW kazanan — POTA hızlı setup için

## Güç sınırı

49:1 unun ferrit doyma noktası:

-   **FT-240-43 tek toroid**: ≤300W güvenli
-   **2× FT-240-43 stacked**: ≤1000W
-   **3× stacked**: ≤2000W

POTA için 5-100W normal, **tek toroid yeterli**.

## Sık yapılan hatalar

### 1\. Yanlış boy

20.5m önerilen, ilk kesimde böyle yapıp SWR'a göre kısalt. Direkt 20.1m kesince kuruluş ortamına göre off-tune olur.

### 2\. Insulator yokluğu

Tel sonunda direkt ip bağlamak → yüksek voltaj ip üstünden geçer, RF arc, insulator gerekli.

### 3\. Çok alçak yüksek

2-3m yükseklikte EFHW DX zayıf. 5m+ tercih et.

### 4\. Tel rastgele tipi

Çelik tel paslı, kayıp yüksek. Bakır kalay kaplı veya emaye 1.5mm tercih.

### 5\. Tüpsel direk yakınında

Anten direkten 30 cm'den fazla uzakta. Direk metalse coupling olur, pattern bozulur.

## POTA pratik aktivasyon

### Ekipman çantası

-   20m EFHW tel (bobinli)
-   49:1 unun + 5m koaks
-   6m fishing pole (telescopic)
-   Slingshot + nylon ip 30m
-   Pas insulator + iplik
-   Saç gergi kelepçe

### Aktivasyon süresi

-   Setup: 5-10 dakika
-   60 kontak ortalama (good propagation)
-   Pack-up: 5 dakika
-   Toplam: 1.5-2 saat verimli aktivasyon

[POTA / SOTA tutorial](/tutorials/pota-sota-aktivasyon-rehberi) detayları.

## Sık sorulan sorular

### EFHW bandwidth ne kadar?

Tipik 50-150 kHz SWR<1.5 her bantta. Bantın orta-yarısında ideal, kenarlarda SWR yükselir.

### "End-fed Z" vs "End-fed half-wave" fark?

"End-fed Z" general — herhangi bir uzunluk. EFHW spesifik = yarım dalga. Kullanım kolaylığı için EFHW tercih.

### Tek bant EFHW (sadece 40m) yapılır mı?

Evet — sadece 40m'i hedef alıyorsan. Multi-band gerek yoksa daha basit unun (1:9 veya 1:25) yeter.

### Lisans şart mı?

Evet, B sınıfı (HF kullanım yetkisi). EFHW HF antenne için, C sınıfı 28 MHz dışında HF yapamaz.

### Apartmandan EFHW pratik mi?

Zor. 40m EFHW = 20m yatay tel — apartmanda bu uzunluk imkansız. **20m EFHW** (10m tel, 20m + 10m bantları) balkonda mümkün.

* * *

## İlgili kaynaklar

-   [HF dipole + EFHW anten](/tutorials/hf-dipole-efhw-anten) — temel HF antenler
-   [Balun yapımı](/tutorials/balun-yapimi-rehberi) — 49:1 unun detayı
-   [POTA / SOTA aktivasyon](/tutorials/pota-sota-aktivasyon-rehberi)
-   [Anten yapımı temel](/tutorials/anten-yapimi-temel)
-   [Anten boy hesaplayıcı](/araclar/anten-hesaplayici/)
-   [SWR temel](/tutorials/swr-temel-bilgisi)
-   [NanoVNA ile ölçüm](/tutorials/nanovna-anten-olcumu)
-   **Genişletilmiş kaynak:** [telsizcilik.com](https://telsizcilik.com/) — EFHW makaleleri
