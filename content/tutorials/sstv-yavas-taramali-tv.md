---
title: SSTV (Slow Scan Television) — Radyo Üzerinden Görüntü Gönderme
description: >-
  SSTV (Yavaş Taramalı Televizyon) rehberi. Robot36 / Scottie / Martin modları,
  MMSSTV yazılımı, ses kart bağlantı, ISS SSTV özel etkinlikleri.
keywords:
  - SSTV
  - dijital
  - görüntü
  - MMSSTV
  - ISS
article_section: SSTV
published_at: '2026-04-26'
updated_at: '2026-04-26'
faq:
  - q: Lisans gerek mi?
    a: >-
      Evet, B sınıfı yeter. C sınıfı 28 MHz altında sınırlı, ama 28.680'de SSTV
      mümkün.
  - q: Anten gerek mi özel?
    a: >-
      Hayır, normal HF dipole / EFHW yeter. SSTV ses bantgenişliğinde, ses
      moduyla aynı anten.
  - q: En düşük güç ne kadar?
    a: 5W ile yakın bölge (Avrupa) görüntü gönderilir. DX için 50-100W.
  - q: ISS'ten kaç görüntü alırım?
    a: 1 pas (10 dk) içinde 5-8 farklı görüntü gelir (her 2 dakikada 1).
  - q: Mobile/portable yapılır mı?
    a: >-
      Evet — Robot36 Android app + telefon mikrofon = anten ses üzerinden
      decode. POTA aktivasyonunda bonus. ---
---
20 milyon yıl önce çakmak taşıyla başlanmış iletişim, bugün cep telefonunda video. Amatör radyoda **SSTV** = arada bir köprü: ses bantgenişliğinde (~3 kHz) yavaşça **görüntü** gönderirsin. 2 dakikada bir resim, ama 1957'den beri çalışan bir teknoloji. Bu rehber SSTV nasıl çalışır + ücretsiz yazılım + ISS SSTV avı.

## SSTV nedir?

**Slow-Scan Television** — radyo dalgaları üzerinden görüntü iletimi. Klasik TV (broadcast) saniyede 30 frame, MHz'lerce bandwidth. SSTV **120 saniyede 1 frame**, 3 kHz bandwidth — sıradan SSB telsiz ile çalışır.

### Tarihçe

-   **1957**: Copthorne Macdonald (WA2BCW) ilk SSTV transmisyonunu yaptı
-   1960'lar: Tüplü kameralar + sintilasyon ekranlar
-   1990'lar: Bilgisayar dijital encode/decode
-   2000'ler: Internet öncesi son SSTV altın çağı
-   2010'ler: ISS özel etkinlikleri, niche topluluk

### Nasıl çalışır?

1.  Görüntü pixel pixel taranır (yatay satırlar)
2.  Her pixel **ses tonuna** dönüştürülür (frequency = renk/parlaklık)
3.  Ses sinyali SSB telsizden TX
4.  Karşı taraf ses sinyalini decode → pixel pixel görüntü oluştur

## SSTV modları

Birden fazla mod var, hepsi farklı çözünürlük + süre tradeoff'u:

| Mod | Çözünürlük | Süre | Kullanım |
| --- | --- | --- | --- |
| **Robot36** | 320×240 color | 36 sn | Hızlı, kalite orta |
| **Scottie 1** | 320×256 | 110 sn | Yüksek kalite klasik |
| **Scottie 2** | 320×256 | 71 sn | Hızlı Scottie |
| **Martin 1** | 320×256 | 114 sn | Premium kalite |
| **Martin 2** | 320×256 | 58 sn | Hızlı Martin |
| **PD90** | 640×480 | 90 sn | Yüksek çözünürlük |
| **PD120** | 640×496 | 120 sn | En kaliteli |
| **PD180** | 640×496 | 187 sn | Ultra |

### En popüler

-   **Scottie 1** — klasik amatör SSTV
-   **PD120** — modern, yüksek kalite
-   **Robot36** — ISS dahil, hızlı için

## SSTV frekansları (gelenek)

USB modunda HF bantlarda:

| Bant | Frekans |
| --- | --- |
| 80m | 3.730 MHz USB |
| 40m | 7.171 MHz USB |
| 20m | **14.230 MHz USB** ← en aktif |
| 17m | 18.160 MHz USB |
| 15m | 21.340 MHz USB |
| 10m | 28.680 MHz USB |
| 6m | 50.680 MHz |
| 2m | 144.500 MHz FM (Türkiye'de az aktif) |

**14.230 MHz USB** = SSTV dünya merkezi. Hafta sonu sürekli aktif, 2-3 görüntü dakika.

## Yazılım

### MMSSTV (Win, ücretsiz, klasik)

-   1990'lar Mineo JE3HHT tarafından
-   Tüm SSTV modları
-   Audio in/out: telsiz ses kart
-   Tarayıcı + decoder + transmitter — komple paket
-   [hamsoft.ca/mmsstv](https://hamsoft.ca/pages/mmsstv.php)

### QSSTV (Linux, Mac, ücretsiz)

-   KDE / Qt tabanlı
-   Modern UI, MMSSTV alternatifi
-   DRM modları da destekler

### EasyPal (Windows)

-   DRM SSTV (digital, hata düzeltmeli)
-   1024×768 yüksek çözünürlük
-   Daha kompleks setup

### Robot36 (Android, mobile)

-   Telefonu telsizin yanına koy → mikrofon decode
-   Hızlı, basit, sokakta kullanım için

### Mobile iOS

-   **SSTV Slow Scan TV** ($5-10) — App Store
-   iPad/iPhone'la decode + encode

## Kurulum (MMSSTV örneği)

### 1\. İndir + kur

mmsstv.exe → Windows için. Yükle.

### 2\. Audio bağlantı

-   Telsiz **USB cable** veya ses kart input/output
-   Bilgisayar mikrofon: telsiz ses çıkışına
-   Bilgisayar hoparlör (line out): telsiz mikrofon girişine

### 3\. Telsiz ayar

-   USB modunda
-   14.230 MHz tune
-   Mikrofon **PTT VOX** açık (audio TX → otomatik PTT)

### 4\. Audio level kalibrasyon

-   Telsiz hoparlör seviyesi → SSTV decoder ses normal seviyede
-   TX seviyesi → telsiz ALC indikatörü **az** (overmodulate yok)

### 5\. Görüntü hazırla

-   320×256 piksel (Scottie/Martin için)
-   24-bit color
-   File → Open Image → seç

### 6\. TX

-   "TX" butonuna bas
-   110 saniye (Scottie 1) bekle
-   Görüntü gönderiliyor

### 7\. RX

-   Decoder otomatik başlar
-   Sinyal duyulunca renk satırları soldan sağa çizilir
-   110 saniye sonra tam görüntü

## ISS SSTV özel etkinlikleri

Uluslararası Uzay İstasyonu **periodik SSTV etkinlikleri** yapar — Rus segmentinden astronotların çekildiği görüntüler / NASA tasarım resimler dünya çapında yayınlanır.

### Frekans

-   **145.800 MHz FM downlink**
-   ISS'in pasında VHF telsiz ile alınır

### Etkinlik takvimi

-   Yılda 4-6 etkinlik (genelde 2-3 günlük)
-   ARISS organizasyonu duyurur — [www.ariss.org](https://www.ariss.org/)
-   Rusya kozmonotları operatör

### Nasıl alır?

1.  ISS pas zamanı önceden bil ([n2yo.com](https://www.n2yo.com/?s=25544))
2.  5W el telsizi + dual-band Yagi yeter
3.  145.800 MHz FM monitor
4.  ISS overhead'da 8-10 dakika sinyal alırsın
5.  Bilgisayar audio kart + MMSSTV decode

### Ödül programı

ARISS karşılığında **ISS SSTV award diploma** verir — dijital sertifika "ISS'ten görüntü aldım" kanıtı. 100K+ operatör dünya çapında almış.

### Türkiye'de

-   2023 ARISS etkinliği — Türkiye'den 50+ operatör başarılı reception
-   TRAC sosyal medya pas zamanlarını duyurur

## Görüntü içerik

### Klasik etiket

-   Çağrı işareti (TA1XYZ büyük yazı)
-   Maidenhead grid (KN41la)
-   Maps + lokal ilginç manzara
-   Kişisel foto (yüz, istasyon, anten)

### Yaratıcı

-   Memes, selamlar
-   Festivaller, etkinlik resimleri
-   Türk bayrağı + harita (DX'te kültürel)
-   Çocukların çizimleri (genç jenerasyon teşvik)

### Yasak

-   Açık politika / din / cinsel
-   Telif altında profesyonel resimler
-   Aldatıcı (fake çağrı işareti vs)

## Hibrit modlar (DRM-SSTV)

Modern SSTV varyasyonu **DRM** (Digital Radio Mondiale) — hata düzeltmeli, FFT tabanlı:

-   1024×768 yüksek çözünürlük
-   Renk doğruluğu mükemmel
-   Ama bandwidth biraz daha geniş (5-10 kHz)

Klasik SSTV (Scottie, Martin) hâlâ daha popüler — basitlik + uyumluluk.

## SSTV vs FT8 / RTTY

| Özellik | SSTV | FT8 | RTTY |
| --- | --- | --- | --- |
| İçerik | Görüntü | Kısa text | Klavye chat |
| Süre | 60-180 sn | 15 sn | Esnek |
| BW | 3 kHz | 50 Hz | 170 Hz |
| Pratik kullanım | Hobby + visual | Kontak hızlı | Klasik chat |

SSTV "**resim göndermek istemek**" merakıyla yapılır — pratik amatör kontak modu değil.

## Pratik ipuçları

### Görüntü hazırlama

-   320×256 piksel
-   JPG / PNG
-   Açık renk → SSTV daha iyi
-   Yüksek kontrast okunaklı
-   Çağrı işaretini net yaz (font 30+)

### TX seviyesi

-   Mikrofon level çok yüksek → distortion + RFI
-   ALC indikatörü mid-range
-   Telsiz finalın güç içinde (50% nominal)

### Sinyal kalitesi

-   SNR > 10 dB için temiz görüntü
-   Düşük sinyalde renk/satır kaybı, "noise" pattern

### Time sync

-   SSTV time sync gerek **DEĞİL** (FT8'in aksine)
-   Decoder VIS code (mode header) ile mod tanır

## SSTV'in geleceği

### Aşağı yönlü trend

-   Internet ve sosyal medya → görüntü paylaşımı 1 milyar kat hızlı
-   Yeni operatörler SSTV'i "antika" görüyor
-   Sadece ISS etkinlikleri + nostaljik klasik radyo amatörleri

### Niche'da yaşıyor

-   ISS etkinliği SSTV'i her yıl tanıtıyor
-   POTA / SOTA'da nadiren — yer alanı sınırlı
-   Genç jenerasyon "retro tech" kültürü ile keşfediyor

## Sık sorulan sorular

### Lisans gerek mi?

Evet, B sınıfı yeter. C sınıfı 28 MHz altında sınırlı, ama 28.680'de SSTV mümkün.

### Anten gerek mi özel?

Hayır, normal HF dipole / EFHW yeter. SSTV ses bantgenişliğinde, ses moduyla aynı anten.

### En düşük güç ne kadar?

5W ile yakın bölge (Avrupa) görüntü gönderilir. DX için 50-100W.

### ISS'ten kaç görüntü alırım?

1 pas (10 dk) içinde 5-8 farklı görüntü gelir (her 2 dakikada 1).

### Mobile/portable yapılır mı?

Evet — Robot36 Android app + telefon mikrofon = anten ses üzerinden decode. POTA aktivasyonunda bonus.

* * *

## İlgili kaynaklar

-   [FT8 dijital mod](/tutorials/ft8-dijital-mod) — alternatif dijital
-   [JS8Call](/tutorials/js8call-radyo-chat-modu) — chat modu
-   [Satellite haberleşme](/tutorials/satellite-haberlesme-leo-amsat) — ISS pas takip
-   MMSSTV: [hamsoft.ca](https://hamsoft.ca/)
-   ARISS: [ariss.org](https://www.ariss.org/) — ISS etkinlikleri
-   Robot36 Android: Google Play
-   **Genişletilmiş kaynak:** [telsizcilik.com](https://telsizcilik.com/) — SSTV makaleleri
