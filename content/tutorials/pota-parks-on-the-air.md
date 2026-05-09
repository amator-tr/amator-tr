---
title: POTA Nedir? Parks On The Air — Doğada Amatör Radyo Aktivasyonu
description: >-
  POTA (Parks On The Air) nedir, Türkiye milli parklarında aktivasyon nasıl
  yapılır, aktivatör vs avcı, kayıt, log şablonu ve portatif HF setup önerileri.
keywords:
  - pota
  - portable
  - hf
  - milli-park
  - outdoor
  - aktivasyon
article_section: pota
published_at: '2026-04-25'
updated_at: '2026-04-25'
faq:
  - q: Park giriş ücreti var mı?
    a: TR milli parklarda 30-100 TL/araç. POTA aktivitesi için indirim yok
  - q: Anten ne kadar uzun olmalı?
    a: >-
      Multi-band için 20.1 m EFHW (40m λ/2, 20-15-10m harmonik). Short-band için
      bant-spesifik
  - q: Yağmurda aktivasyon?
    a: >-
      Çadır + waterproof bag + RF connector silikon. Ama zorda — eğlence için
      ertele
  - q: 'Pil arızalandı, jeneratör ile çalışabilirim mi?'
    a: >-
      Evet ama gürültü → topluluk kuralları ihlali. POTA'da küçük solar +
      LiFePO4 standart
  - q: Sahil Güvenlik / orman izni gerek mi?
    a: >-
      TR'de milli park izni gerekmiyor amatör radyo için (ticari yayın ≠
      amatör). Ama park kurallarına saygı
  - q: Bir günde kaç park aktive edebilirim?
    a: >-
      "Park hopping" — 1 günde 5-8 park rekor (kısa sürede setup + 10 kontak +
      sökme + sürüş)
  - q: Lisanssız aktivasyon?
    a: '**Hayır** — POTA RF üzerinden, lisans şart'
---
## POTA nedir?

**POTA — Parks On The Air**, **WWFF**'in (World Wide Flora & Fauna) ABD topluluk türevi olarak 2016'da başlayan, dünya çapında **2200+ entiteyle** **74,000+ aktif parka** sahip amatör telsiz aktivasyon programı. Mantık çok basit:

> _"Doğal bir parkta amatör telsiz istasyonu kur, dünyada başka amatörlerle bağlantı kur, sayılır."_

İki taraf var:

-   **Aktivatör (Activator)**: Parka gider, kurar, yayın yapar — **10 farklı çağrı işaretiyle bağlantı = aktivasyon başarılı**
-   **Avcı (Hunter)**: Evden veya başka noktadan aktivatörlerle kontak yapar, her park için puan toplar

Outdoor + amatör radyo + topluluk + rozet/sertifika sistemi — Pokémon GO meets ham radio. Hızla yayıldı, **şu an dünyanın en aktif amatör radyo etkinliği**.

## Türkiye'de POTA

[**TADX.org**](https://tadx.org/potalar/about) Türkiye POTA haritalandırmasını bağımsız olarak yapıyor — herhangi bir kuruluşa bağlı değil, ücretsiz topluluk hizmeti. POTA.app sistemine TR parkları kaydetmiş + Türkçe destek + topluluk forumu.

Aktif Türk POTA parkları (2026 itibariyle 50+):

-   **TR-0001** Yıldız Parkı (İstanbul)
-   **TR-0014** Belgrad Ormanı
-   **TR-0042** Uludağ Milli Parkı
-   **TR-0067** Sarıkamış-Allahuekber Dağları
-   **TR-0089** Kaçkar Dağları
-   **TR-0103** Termessos Antik Kenti
-   **TR-0124** Köprülü Kanyon
-   **TR-0156** Aladağlar
-   ... (tam liste TADX'te)

### Tipik park kategorileri

-   **Milli Park** (Doğa Koruma + Park Şefliği — örn. Uludağ, Köprülü Kanyon, Beydağları)
-   **Tabiat Parkı** (yerel — küçük, şehir yakını)
-   **Tarihi Milli Park** (Gelibolu Yarımadası, Troya)
-   **Doğa Anıtı** (özel ekosistem korumalı)

## Kayıt + başlangıç

### 1\. POTA.app hesabı

[**parksontheair.com**](https://parksontheair.com) → Sign Up → **callsign** + **e-mail** + **şifre**.

Profil oluştur:

-   Name: gerçek ad veya callsign
-   Avatar: opsiyonel
-   Default radio gear: liste + paylaşım

### 2\. TADX'ten Türkiye'deki yakın parkı bul

[**tadx.org/potalar**](https://tadx.org/potalar/about) → harita → ev'inize 30-200 km civarı park seç.

Aşamalı şekilde:

-   50 km içi: günlük gidiş-geliş aktivasyon
-   100-200 km: hafta sonu road trip
-   300+ km: tatil + multi-park

### 3\. İlk aktivasyon planı

Hangi park, hangi tarih, hangi saatte? Önceden **Spot** sayfasında duyur — avcılar göstereceği frekansı + zamanı önceden görüp dinlerler:

[parksontheair.com/spotting](https://parksontheair.com/) → "Spot Yourself" → frekans + bant + planlanan saat.

## Aktivasyon kuralları

### Geçerli aktivasyon nedir?

POTA için geçerli kontak sayılması:

✅ **Aktivatör**: Parkın içinde fiziksel olarak (GPS koordinatları doğrulanır) ✅ **Min 10 farklı çağrı işareti** ile QSO yap ✅ Tüm bantlar geçerli (HF, VHF, UHF — tek bantta 10 yeter) ✅ Tüm modlar geçerli (CW, SSB, FM, FT8, vd.) ✅ Aynı kişi farklı bantta veya modda **tekrar sayılır**

❌ Park dışında olamaz ❌ Aile içi spotaneous QSO sayılmaz (gerçek dış-park kontak şart) ❌ Encrypted modlar yasak (zaten amatör genelde yasak)

### Park kuralları

-   Bagaj boşaltma + topla, **bırakma izi**
-   Yangın hassas alanlarda LiPo/Li-ion hassasiyeti
-   Anteni ağaca asmak — **dal kırmama**, gevşek halat
-   Kamp izinleri (bazı parkta gece geçirme yasak)
-   Park giriş ücreti (Türkiye milli parklarda 30-100 TL)

## Donanım — portatif HF setup

POTA aktivasyonu = **mobil/sırt-çantası HF setup**. Tipik:

### Tier 1: Ucuz başlangıç (~$300)

-   **Telsiz**: Xiegu G90 ($350) — 20W HF SDR + dahili tuner
-   **Anten**: 40m EFHW + 20m balıkçı oltası mast ($30 DIY)
-   **Pil**: 5Ah LiFePO4 ($50) + 12V regulator
-   **Tuş**: straight key veya iambic paddle ($30-80)
-   **Çanta**: REI 30L sırt çantası

### Tier 2: Profesyonel (~$1500)

-   **Telsiz**: Yaesu FT-891 (100W mobile) veya Icom IC-705 (5W LiPo all-in-one)
-   **Anten**: ChameleonAntenna MPAS / Buddistick ($300-500)
-   **Pil**: 20Ah LiFePO4 ($150) — 100W için yeter
-   **Solar panel**: 50W foldable ($150) — bütün gün şarj
-   **Laptop**: Logbook (HamRDB, N3FJP, FLE)

### Tier 3: Apartmandan kaçış (~$5000)

-   **IC-7300** + 100W transverter
-   30m teleskopik fiberglass mast
-   Magnetic loop OR vertical
-   Generator + 30Ah pil
-   Telsiz çadırı (RFI shielded)
-   Multi-band switching antenna

**Çoğu ilk aktivasyon: Tier 1** — basit, çalışır, eğlenceli.

## Aktivasyon günü — adım adım

### Sabah (öncesi)

-   ✅ Ekipman çantaya: telsiz + pil + anten + tuş + log defteri + adapter
-   ✅ Pil **tam dolu** (en kötü senaryoda 4-5 saat aktiv. = 20Ah)
-   ✅ Hava durumu kontrol (yağmur = elektronik risk, anteni gergin tut)
-   ✅ **POTA.app'te Spot** — saat + park + frekans

### Park'a varış

-   Park giriş kontrolü (kart, ücret)
-   **GPS koordinatları kaydet** (logda kayıt için)
-   Anten için uygun yer: ağaç + açık alan + güvenli mesafe (RF emniyet 2-3 m)
-   Setup süresi: **15-30 dk** (ilk seferinde 1 saat normal)

### İstasyon kurulumu

```
   [ ağaç dalı 8-10 m yüksek ]
            │
            │ (anten çekiş halatı)
            │
   [ EFHW tel 20m yatay/eğik ]
            │
            │ koaks
            │
            ▼
   [ Telsiz + log defteri + tuş ]
            │
            │
   [ Pil 12V LiFePO4 ]
            │
   [ Solar panel (uzun aktivasyon) ]
```

### Yayın — POTA frekansları

POTA için **resmi frekans yok**, ama gelenekler:

| Bant | Tipik POTA frekans | Mod |
| --- | --- | --- |
| 80m | 3.520 (CW), 3.825 (SSB) | Akşam |
| 40m | **7.032 (CW), 7.180 (SSB)** | 24 saat (en aktif) |
| 30m | 10.110 (CW) | CW only |
| **20m** | **14.040 (CW), 14.305 (SSB)** | Gündüz, **en aktif** |
| 17m | 18.080 CW, 18.130 SSB | Gündüz uzun |
| 15m | 21.040 CW, 21.330 SSB | Gündüz, güneş |
| 10m | 28.040 CW, 28.450 SSB | Güneş yüksek |
| 6m | 50.130 SSB | Sporadic E sezon |
| 2m | 144.200 SSB | Yakın menzil |

**En aktif: 20m SSB (14.305) + 40m SSB (7.180).**

### Anonsla CQ at

CQ POTA çağrısı:

> _"CQ POTA, CQ POTA, this is TA1ABC, Charlie Quebec POTA park reference TR-0014, listening for Park Activator hunters."_

Veya CW'de: `CQ POTA DE TA1ABC TA1ABC PSE K`

5-10 saniye dinle, cevap bekle. Avcılar genelde Spot'ta gördükleri için zaten dinliyor olur.

### Kontak akışı

Avcı çağırır → kısa QSO yap → log'a yaz → sonraki:

```
TA1ABC: "TA1ABC, listening"
W2XYZ:  "TA1ABC, this is W2XYZ. Your signal is 5-9, my park reference here in NY..."
TA1ABC: "Roger W2XYZ, you're 5-7 here in TR-0014, name is Kaan. 73, QRZ?"
```

Kontak: ~30 saniye-1 dakika. **10 kontak = aktivasyon başarılı**, ortalama 30-90 dakika.

### Log

Log defterine her kontak:

-   Tarih (YYYY-MM-DD)
-   UTC saat (yerel değil!)
-   Çağrı işareti
-   Frekans (MHz)
-   Mod (CW, SSB, FT8, vb.)
-   TX/RX RST raporu (örn. 599 / 559)
-   Komment (opsiyonel — "P2P" = Park-to-Park)

**Mobil uygulama**: [POTAontheGO](https://play.google.com/store/apps/details?id=com.pota.app) — Android, GPS otomatik park doğrulama + log. Veya kâğıt + sonra üretim girişi.

## Aktivasyon sonrası

### Log yükle

POTA.app → My Activations → **Submit Log** → ADIF format yükle (logbook yazılımı ADIF üretir, manual entry forma da var).

48 saat içinde log işlenir + park aktivatör puanları güncellenir.

### Sertifika ve rozet

POTA otomatik sertifika üretir:

-   **First Activation**: ilk park aktivasyonun
-   **N-Park Activator**: 10, 25, 50, 100, 250 park
-   **Hunter milestones**: 100, 500, 1000, 2500, 5000 unique callsign
-   **All-time leaderboard**: ülke + global

PDF olarak indirebilir, çerçeveletebilirsin. Topluluk içinde prestij.

## P2P — Park-to-Park

İki aktivatör birbirini parkta yakaladı = **P2P kontak**, çift puan. Çok değerli (her iki tarafa "bonus park" sayılır). Spot'ta P2P'leri ara.

## Acil durum + outdoor güvenlik

POTA aktivasyon = **outdoor terrain testi**:

-   Pil **dağa götürülmeyen LiPo** olmalı (Li-ion lipo yangın hassas — LiFePO4 çok daha güvenli)
-   Yıldırım sırasında **anten sökülmeli** (ağaca yakın çadırda olmaz)
-   Ayı bölgeleri: ekipmanı ağaca asma, koku içeren yiyecek paketleme
-   Soğuk hava (kış POTA): anten sıcaklık ↓ → boy kısalır → frekans kayar

**Acil durum çağrısı**: 14.300 MHz (HF) + 145.500 MHz (VHF) — bunlar amatörler arası "calling" frekansları. PMR/radyo sürücüsü değil, amatör.

## SOTA, IOTA, vb. kuzen programlar

POTA'nın "kardeş" programları:

| Program | Konum | Açıklama |
| --- | --- | --- |
| **POTA** | Park | Genel parklar (en aktif) |
| **SOTA — Summits On The Air** | Dağ zirveleri | Yürüyerek tırmanılan zirveler, fizik gerektirir |
| **IOTA — Islands On The Air** | Adalar | Türkiye'de Bozcaada, Cunda, Kınalıada vb. |
| **WFD — Winter Field Day** | Outdoor (kış) | Sadece şubat hafta sonu |
| **WWFF** | Park (POTA'nın atası) | Avrupa-merkezli, daha eski |

POTA + SOTA çakışan parklar var (örneğin Uludağ hem milli park hem zirve) → **çift sayım** (P2P-tarzı bonus).

## Sık sorulan sorular

| Soru | Cevap |
| --- | --- |
| Park giriş ücreti var mı? | TR milli parklarda 30-100 TL/araç. POTA aktivitesi için indirim yok |
| Anten ne kadar uzun olmalı? | Multi-band için 20.1 m EFHW (40m λ/2, 20-15-10m harmonik). Short-band için bant-spesifik |
| Yağmurda aktivasyon? | Çadır + waterproof bag + RF connector silikon. Ama zorda — eğlence için ertele |
| Pil arızalandı, jeneratör ile çalışabilirim mi? | Evet ama gürültü → topluluk kuralları ihlali. POTA'da küçük solar + LiFePO4 standart |
| Sahil Güvenlik / orman izni gerek mi? | TR'de milli park izni gerekmiyor amatör radyo için (ticari yayın ≠ amatör). Ama park kurallarına saygı |
| Bir günde kaç park aktive edebilirim? | "Park hopping" — 1 günde 5-8 park rekor (kısa sürede setup + 10 kontak + sökme + sürüş) |
| Lisanssız aktivasyon? | **Hayır** — POTA RF üzerinden, lisans şart |

## İleri özellikler

-   **Activator awards**: Top 10 country leaderboard
-   **POTA portable contesting**: belirli hafta sonları yarışma
-   **N1MM logger** ile multi-mode log
-   **Spot-bot**: APRS/Sotamatadüç ile otomatik spotting
-   **POTA hunter awards**: 5000+ unique kontak

## Yararlı kaynaklar

-   [POTA.app resmi](https://parksontheair.com)
-   [POTA Documentation](https://docs.pota.app)
-   [TADX.org POTA Türkiye haritası](https://tadx.org/potalar/about)
-   [Furkan ÖZEN POTA aktivitesi (TR)](https://furkanozen.com.tr/pota-parks-on-the-air-aktivitesi/)
-   [POTAontheGO Android app](https://play.google.com/store/apps/details?id=com.pota.app)
-   [POTA Activator Guide (resmi)](https://docs.pota.app/docs/activator_reference/activator_guide-english.html)
-   [Ham Radio Prep POTA Beginner](https://hamradioprep.com/introduction-to-pota-operations/)

## Sıradaki

-   [HF Dipole / EFHW Anten](/tutorials/hf-dipole-efhw-anten) — POTA aktivasyon için portatif HF anten
-   [NanoVNA ile Anten Ölçümü](/tutorials/nanovna-anten-olcumu) — saha-test için NanoVNA
-   [FT8 Dijital Mod](/tutorials/ft8-dijital-mod) — POTA aktivasyonun dijital varyasyonu
-   [Mors Kodu](/tutorials/mors-kodu-ogrenme) — POTA CW (en hızlı 10-kontak)

Doğada radyo yapmaya — **CQ POTA, 73 + iyi yürüyüşler!**
