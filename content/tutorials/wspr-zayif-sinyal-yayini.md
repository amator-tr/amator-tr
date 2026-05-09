---
title: WSPR — Düşük Güçle Dünyaya Sinyal Yaymak ve Propagasyon Haritası
description: >-
  WSPR (Weak Signal Propagation Reporter) ağı — 1W ile dünya çapında sinyal
  raporlama, otomatik propagasyon analizi. WSJT-X kurulumu, 200 mW Avustralya
  kontağı, beacon mod.
keywords:
  - WSPR
  - WSJT-X
  - propagasyon
  - dijital
  - QRP
article_section: WSPR
published_at: '2026-04-26'
updated_at: '2026-04-26'
faq:
  - q: En düşük güç ne kadar duyulur?
    a: >-
      Pratik: 100 mW ile 5000 km gerçekten yaygın. Extreme: 1 mW ile 1000 km
      duyulan rekorlar var.
  - q: Lisans gerek mi?
    a: >-
      Evet, Türkiye'de B sınıfı yeter (HF tx yetkisi). C sınıfı VHF/UHF olduğu
      için 144 MHz WSPR yapabilir ama daha az aktif.
  - q: Telsizimi WSPR'e bırakırsam zarar var mı?
    a: >-
      %20 duty cycle ile telsiz çalışıyor. Soğutma yeterli olduğundan sorun yok.
      Ancak final transistörü ısınır — fan + anten verimi önemli.
  - q: Pico balon hukuki?
    a: >-
      Türkiye'de balon uçuşu için BTK + DHMİ izni var. Helyum balon ufak (≤2
      metre) ve düşük yükseklikte (≤10000 m) genelde sorun çıkmaz, ama büyük
      balon resmi izin gerek.
  - q: Yapay zeka + WSPR?
    a: >-
      Akademisyenler WSPR verisini ML ile MUF tahmin etmek için kullanıyor.
      Bireysel operatör için: aprs.fi tarzı sitelerde otomatik rapor analizi.
      ---
---
200 milliwatt verici, basit dipole anten — Avustralya'dan rapor: "Sinyalini duydum, -22 dB SNR." **WSPR (Weak Signal Propagation Reporter)** Joe Taylor (K1JT) tarafından geliştirilen amatör radyo deneyinin en güzel örneği. Bu rehber WSPR sisteminin nasıl çalıştığı + WSJT-X kurulumu + Türkiye'den dünya raporları.

## WSPR nedir?

**Otomatik propagasyon ağı.** 50 Hz bandgenişliğinde, 110 saniye süreli mesajlar — sadece çağrı işareti + Maidenhead grid + güç. Düşük güçle (genelde 1-5W, bazıları 100 mW!) yapılır. Dünya çapındaki binlerce WSPR receiver bu sinyalleri otomatik decode edip [wsprnet.org](https://wsprnet.org/)'a rapor eder.

### Bir Nobel ödüllü dehanın mirası

WSPR'ın arkasında Princeton Üniversitesi profesörü **Joe Taylor (K1JT)** var — pulsarlar üzerindeki çalışmalarıyla **1993 Nobel Fizik Ödülü** almış bir astrofizikçi. Taylor, radyo dalgalarının iyonosferdeki yolculuğunu anlık haritalandırmak istiyordu. Mevcut yöntemler çok güç gerektiriyordu ve sadece iki istasyon arasındaki durumu gösteriyordu. Taylor'un vizyonu: çok düşük güçteki sinyalleri gürültüden ayırt eden bir algoritma yazarak, dünya çapında binlerce amatörün aynı anda "fener" (beacon) gibi çalışmasını sağlamak. 2008'de WSPR doğdu ve amatör telsizciliğin en büyük bilimsel veri toplama ağına dönüştü.

### "Fısıltı" nasıl duyuluyor? (SNR mucizesi)

İnsan kulağı gürültünün altındaki bir sesi duyamaz. Ama WSPR algoritması gürültü seviyesinin **\-28 dB altına** kadar inebilir. Telsizin hoparlöründen sadece statik "hışırtı" duyarken, yazılım o hışırtının içindeki matematiksel desenleri çözümleyip çağrı işaretini çıkarır. Fırtınalı bir denizde yüzen kağıt geminin üzerindeki yazıyı kıyıdan okumak gibi düşünebilirsiniz — WSPR tam olarak bunu yapar.

### Nedir, ne değil

-   ✅ **Beacon ağı** — propagasyon koşullarını canlı izleme
-   ✅ **Düşük güç deneyi** — 100 mW ile dünyaya
-   ❌ **QSO yapma** — kontak yok, sadece bir yönlü beacon
-   ❌ **Mesaj iletimi** — sadece çağrı + grid + güç

### Sistem özelikleri

-   **Bandgenişliği:** 50 Hz (FT8'den 5x dar)
-   **Hızı:** 110 saniye / mesaj
-   **SNR limit:** -28 dB (FT8 -25 dB'den 3 dB daha hassas)
-   **Güç:** ≤5W typical (extreme deneylerde 1-100 mW)

## Pratik kullanım

### 1\. WSJT-X kur

[physics.princeton.edu/pulsar/k1jt/wsjtx.html](https://physics.princeton.edu/pulsar/k1jt/wsjtx.html) — Win/Mac/Linux ücretsiz.

### 2\. Ekipman bağla

-   **Telsiz** SSB modunda
-   **Bilgisayar** USB kablo ile telsiz CAT control + ses kart
-   Veya **dedicated WSPR transmitter** (ZachTech WSPR-LITE, Ultimate WSPR ~$50)

### 3\. Frekans ayarla

WSPR USB modunda, bant ortasında:

-   80m: **3.568 MHz**
-   40m: **7.038 MHz**
-   30m: **10.138 MHz**
-   20m: **14.095 MHz**
-   17m: **18.104 MHz**
-   15m: **21.094 MHz**
-   10m: **28.124 MHz**

### 4\. WSJT-X'te WSPR mode

-   File → Settings → Mode: WSPR
-   Power: kullandığın güç (W)
-   Çağrı işareti + Maidenhead grid (KN41la gibi)
-   Auto Tx period: %20 (her 5 dakikadan birinde TX)

### 5\. Yayına başla

-   TX butonuna bas
-   110 saniye sinyal yayar
-   Mesaj otomatik wsprnet.org'a yüklenir

### 6\. Raporları gör

[wsprnet.org/drupal/wsprnet/spots](https://wsprnet.org/drupal/wsprnet/spots) — çağrı işaretini ara, dünya çapında kim duyduğunu gör.

Tipik harita: Türkiye merkezde, kırmızı çizgiler 30 farklı ülkeye uzanır → "200 mW ile bu sabah 11 ülke duyuldu" gibi.

## En etkileyici WSPR rekorları

-   **2W ile İstanbul → Yeni Zelanda** (17.000 km) — Joe Taylor'un kendi deneyleri
-   **100 mW ile İngiltere → Avustralya** (16.000 km) — sıkça raporlanır
-   **20 mW ile pan-European** — pico balon WSPR transmitter'ları

WSPR amatör radyonun "**watt başına kilometre**" rekorlarını kıran sistemi.

## Pico balon (özel uygulama)

WSPR transmitter helyum balon veya solar-powered balona takılır → atmosferdeki rüzgarlarla dünya turu yapar. **Solar-powered + WSPR + balon** = haftalarca uçan, dünya çapında izlenen küçük bir uydu efekti.

-   **AB6OS pico balonları** dünya turu rekorları kırdı
-   Maliyet: ~$150-300 / balon
-   Helyum şart, hidrojen riskli
-   Yasal: Türkiye'de hava trafik kuralları var, BTK izni gerek

## Pratik kullanım senaryoları

### 1\. Anten testi

Yeni anten kurdun, propagasyon nasıl?

-   2 saat WSPR yayını → kaç ülke duydu?
-   Aynı pencerede önceki anten? → karşılaştırma yap.

### 2\. MUF / LUF tespiti

-   14 MHz raporları geliyor mu? → MUF en az 14 MHz
-   10 MHz altında 80m raporları? → LUF düşük (gece koşulları iyi)

### 3\. QRP rekoru

-   1W ile en uzak duyulan? Tipik 5000-10000 km
-   100 mW ile? — özel bir çabayla 8000-15000 km

### 4\. Bant açıklığı izleme

-   6m (50 MHz) sürekli WSPR — yaz aylarında Es açılması anlık görülür
-   2m (144 MHz) WSPR — meteor scatter / EME deneyleri

## WSPR receiver olmak

Sen yayın yapmaktan vazgeçip sadece **receiver** olsan bile katkı sağlarsın — wsprnet.org'a senin duydukların eklenir, dünyaya ortak harita yapılır.

### Setup

-   RTL-SDR ($30) + bilgisayar
-   Antenne dipole / G5RV
-   WSJT-X "RX only" mode

### Faydalar

-   Telsiz almadan amatör topluluğa katkı
-   Propagasyon istatistikleri
-   24/7 unattended çalışır

## WSPR vs FT8 — fark

| Özellik | WSPR | FT8 |
| --- | --- | --- |
| Amaç | Beacon / propagasyon | Kontak (QSO) |
| Mesaj | Çağrı + grid + güç | İki yönlü exchange |
| Süre | 110s | 15s |
| BW | 50 Hz | 50 Hz |
| SNR limit | \-28 dB | \-25 dB |
| Güç | 100mW-5W typ | 5-50W typ |

WSPR daha pasif, FT8 aktif kontak. İkisini de kullanır operatörler — gündüz FT8, gece WSPR beacon.

## Türkiye'den popüler WSPR operatörleri

-   TA1ED, TA2ZAF, TA1HZ — düzenli WSPR yayın yapan operatörler
-   Türkiye genelinde 20-30 aktif WSPR receiver
-   Cycle 25 zirvesi (2026-2027) → WSPR ile rekorlar dönemi

## Pratik ipuçları

### Frekans dikkat

WSPR sadece 200 Hz **alt-banttan** TX yapar (örn 14.0956-14.0976 MHz). Frekansı tam ayarla — yanlışsa diğer modlarına interferans.

### Time sync

WSJT-X **kesin saat** ister (NTP synced computer). Yanlışsa decode olmaz. Windows'ta Internet Time, Mac/Linux NTP sync kontrol et.

### Anten verim

WSPR 50 Hz dar bant — anten SWR 1.5'in altında olmalı. Geniş bantlı anten (GP) zayıf raporlar üretir.

### Düşük gürültü

HF gürültü maksimumsa decode zor. Şehir merkezinde bile WSPR çalışır ama gece (gürültü düşük) en iyi.

## Sık sorulan sorular

### En düşük güç ne kadar duyulur?

Pratik: **100 mW** ile 5000 km gerçekten yaygın. Extreme: **1 mW** ile 1000 km duyulan rekorlar var.

### Lisans gerek mi?

Evet, **Türkiye'de B sınıfı yeter** (HF tx yetkisi). C sınıfı VHF/UHF olduğu için 144 MHz WSPR yapabilir ama daha az aktif.

### Telsizimi WSPR'e bırakırsam zarar var mı?

%20 duty cycle ile telsiz çalışıyor. **Soğutma yeterli olduğundan** sorun yok. Ancak final transistörü ısınır — fan + anten verimi önemli.

### Pico balon hukuki?

Türkiye'de balon uçuşu için BTK + DHMİ izni var. Helyum balon ufak (≤2 metre) ve düşük yükseklikte (≤10000 m) genelde sorun çıkmaz, ama büyük balon resmi izin gerek.

### Yapay zeka + WSPR?

Akademisyenler WSPR verisini ML ile MUF tahmin etmek için kullanıyor. Bireysel operatör için: aprs.fi tarzı sitelerde otomatik rapor analizi.

* * *

## İlgili kaynaklar

-   [FT8 dijital mod](/tutorials/ft8-dijital-mod) — kontak modu
-   [HF propagasyon temelleri](/tutorials/hf-propagasyon-temelleri)
-   [İyonosfer katmanları](/tutorials/ionosfer-katmanlari-detay)
-   [HF Propagasyon canlı](/araclar/propagasyon-durumu/)
-   [Maidenhead grid](/araclar/maidenhead-grid/)
-   WSPRnet: [wsprnet.org](https://wsprnet.org/)
-   WSJT-X: [physics.princeton.edu/pulsar/k1jt/](https://physics.princeton.edu/pulsar/k1jt/)
-   **Genişletilmiş kaynak:** [telsizcilik.com](https://telsizcilik.com/) — WSPR makaleleri
