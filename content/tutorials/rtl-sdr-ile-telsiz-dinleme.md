---
title: RTL-SDR ile Telsiz Dinleme — Lisanssız Başlangıç Rehberi
description: >-
  $30'lık bir USB dongle ile 500 kHz - 1.75 GHz arası tüm radyo spektrumunu
  dinleyin. RTL-SDR donanımı, SDR# / SDR++ / GQRX kurulumu, ilk sinyal yakalama
  ve uygulama alanları.
keywords:
  - sdr
  - rtl-sdr
  - dinleme
  - dongle
  - başlangıç
  - frekans
  - scanner
article_section: sdr
published_at: '2026-04-25'
updated_at: '2026-04-25'
faq:
  - q: Yazılım dongle'ı görmüyor
    a: Zadig ile WinUSB sürücüsü kurulu mu kontrol et
  - q: 'Çok parazit, sinyal yok'
    a: >-
      Antenin uzunluğu doğru mu (frekansa göre); USB hub yerine doğrudan PC'ye
      bağla
  - q: FM stereo iyi geliyor ama NFM bozuk
    a: >-
      Bandwidth değiştir (12.5 kHz NFM, 200 kHz WFM); frekans sapması: TCXO
      kalibrasyonu yap
  - q: Aşırı CPU kullanımı
    a: >-
      Sample rate'i düşür (2.4 MSPS yerine 1.024); GUI'de waterfall'u
      kapatabilirsin
  - q: Frekans 1-2 kHz kayık
    a: >-
      TCXO yok, sıcaklık etkisi; SDR++ → Source → "Frequency offset" ile manuel
      düzelt
---
## SDR nedir?

**SDR — Software Defined Radio (Yazılım Tanımlı Radyo)**, geleneksel donanım radyolarının (filtreler, mixer'lar, demodülatörler) iş yükünü **yazılıma** taşıyan bir paradigmadır. Anten + USB dongle ile gelen ham sinyali bilgisayar dijital olarak işler; aynı donanım FM yayını dinleme, askeri uydular, hava trafiği konuşması veya telsiz amatörü dijital sinyaller dahil **çok geniş yelpazeye** dönüştürülebilir.

**RTL-SDR** — orijinalde DVB-T (dijital karasal TV) USB tuner çipi (Realtek RTL2832U) için olan; topluluk tarafından "Software Defined Radio" olarak hack'lenip $30'lık spektrum analizci/scanner haline getirilen donanım. 2012'de Antti Palosaari'nin keşfiyle popüler oldu, sonrasında [rtl-sdr.com](https://www.rtl-sdr.com) ekibi tarafından özelleştirilmiş "Blog v3" / "Blog v4" sürümleri üretildi.

## Ne yapabilirim?

| Uygulama | Frekans | Açıklama |
| --- | --- | --- |
| **FM radyo dinleme** | 88-108 MHz | Geleneksel ticari + amatör FM |
| **Amatör telsiz dinleme** | 144-148, 430-440 MHz | Röleler, simplex, APRS |
| **Hava trafiği** | 118-137 MHz AM | ATC kuleleri, ATIS, pilot konuşmaları |
| **NOAA / Meteor weather sat** | 137-138 MHz APT | Hava durumu uydularından canlı görüntü |
| **Sigfox / LoRa** | 433/868 MHz | IoT cihaz trafiği gözlem |
| **POCSAG pager** | ~150-170 MHz | Eski çağrı cihazı protokolü |
| **ISS APRS digipeater** | 145.825 MHz | Uzay istasyonundan paket |
| **DMR / D-STAR** | 144 + 430 MHz | Dijital amatör (ek dekoder gerekir) |
| **ADS-B uçak takip** | 1090 MHz | Civarınızdaki tüm uçakları haritada görmek |
| **Trunked radyo** (P25, TETRA) | 800-900 MHz | Yerel hizmet (polis, taksi) — yasal sınır var |

> **Yasal not:** Türkiye'de **dinlemek genelde yasal**, **kayıt + paylaşmak** ise iletişim gizliliğine girebilir. Şifrelenmiş sinyali çözmeye çalışmak suç. Amatör bantları dinleme (144/430 MHz) tamamen serbest. Acil hizmet (polis/itfaiye) trafiği genelde dinlenebilir ama redistribute etmek yasak.

## Donanım — hangi RTL-SDR alınmalı?

### RTL-SDR Blog v4 (2023+, önerilen)

-   $30-40 (TR'de ~600-1000 TL)
-   500 kHz - 1.75 GHz aralık
-   HF için **direkt sample mode** (1-30 MHz) dahili
-   Bias-T (anten DC besleme) + TCXO (1 ppm hassasiyet)
-   USB-C konektör
-   [rtl-sdr.com/v4](https://www.rtl-sdr.com/v4/) resmi

### RTL-SDR Blog v3

-   $25-30
-   24 MHz - 1.7 GHz (HF için ek upconverter gerek)
-   TCXO 0.5 ppm
-   USB-A
-   Hâlâ üretiliyor, eski stoklar bol

### Generic RTL2832U dongle ($10-15)

-   Bilinen markasız Çin clone'ları
-   TCXO yok (sıcaklık değişiminde frekans kayar)
-   HF mode yok genelde
-   Başlangıç için OK ama **Blog v4'ü önemle** öneririm — eğitim eğrisinde fark yaratır

### Ek donanım

| Parça | Açıklama | Fiyat |
| --- | --- | --- |
| **Anten** | Telescopic (Diamond, Comet, generic) — 5 cm-1.5m ayarlanabilir | $20-50 |
| **MCX → SMA adaptör** | Çoğu dongle MCX, geniş anten dünyası SMA | $5 |
| **HF upconverter** (Blog v3 için) | Ham-It-Up nano, NESDR | $50 |
| **Aktif anten** (uydular için) | LNA + filtreli; NOAA, ADS-B'de fark eder | $40-100 |
| **Pi 4 / Pi 5** (24/7 server) | RTL-SDR Pi server (web arayüzlü) | TR'de ~3000-5000 TL |

## Yazılım — hangisini kullanmalıyım?

### SDR# (SDRSharp) — Windows

-   En klasik, eski ama hâlâ sağlam
-   Eklenti ekosistemi geniş (frekans listesi, plugin'lerle DMR/POCSAG/AIS dekoder)
-   [airspy.com/download](https://airspy.com/download/) → "SDRSharp + plugins"
-   **TR Türkçe kullanım:** [Berkay Yıldız blog](https://berkayyildiz.com/rf-radyo-frekansi-sdr/), [Çağlar Çelik SIGINT serisi](https://caglar-celik.com/siber-guvenlik/sigint-serisi-1-rtl-sdr-ve-sdr-kullanimi/)

### SDR++ — Multiplatform (Win/Mac/Linux)

-   2020'de Alexandre Rouma tarafından yazıldı
-   Modern arayüz, hızlı, daha az kaynak tüketir
-   Native Apple Silicon desteği (Mac M1/M2/M3'te tıkır tıkır)
-   [sdrpp.org](https://www.sdrpp.org) → installer / source
-   **Önerim:** Yeni başlayanlar için en iyi seçim

### GQRX — Linux + macOS

-   GNU/Linux dünyasının standardı, terminal-amatörü dostu
-   Mac homebrew: `brew install gqrx`
-   [gqrx.dk](https://gqrx.dk)

### CubicSDR — Multiplatform

-   Kompakt, en az kaynak; Pi'de iyi
-   [github.com/cjcliffe/CubicSDR](https://github.com/cjcliffe/CubicSDR)

## Adım adım: ilk sinyali yakalama

### Adım 1: Sürücü kurulumu (Windows)

Generic RTL2832U dongle Windows'a bağlanınca **DVB-T sürücüsü** otomatik yüklenir; bu yanlış sürücüdür. Aşağıdakini yap:

1.  [zadig.akeo.ie](https://zadig.akeo.ie/) → Zadig sürücü değiştirici indir
2.  Dongle USB'ye bağlı, **Options → List All Devices** ✓
3.  Listeden "Bulk-In, Interface (Interface 0)" seç
4.  Sağdaki sürücüyü **WinUSB** olarak değiştir
5.  **Replace Driver** → 30 sn → tamam

(macOS / Linux'ta in-tree drv vardır, kurulum gerekmez.)

### Adım 2: SDR++ indir + aç

[sdrpp.org/install](https://www.sdrpp.org/install) → işletim sisteminize uygun installer.

İlk açılışta:

1.  **Module Manager** → "RTL-SDR" otomatik yüklü
2.  Ana ekranda **Source** bölümü → "RTL-SDR" seç
3.  **Sample Rate**: 2.4 MSPS (default)
4.  **Start** tuşuna bas

### Adım 3: FM radyoyu dene

En kolay test:

1.  Frequency: 99.500 MHz (yerel popüler bir FM kanalı)
2.  Demodulator: **Wide FM** (WFM)
3.  RF Gain: orta (Auto = AGC, deneyebilirsin)
4.  Hoparlörden ses gelmeli

### Adım 4: Amatör bandı dinle

VHF amatör 2m bandı:

1.  Frequency: 145.625 MHz (TA1 İstanbul Çamlıca rölesi)
2.  Demod: **Narrow FM** (NFM, amatör standart)
3.  Bandwidth: 12.5 kHz
4.  Squelch: −60 dB civarı (parazit kesimi)

Eğer Çamlıca rölesi aktif konuşma yayıyorsa duyarsınız. Ya da APRS:

1.  Frequency: 144.800 MHz
2.  Demod: **NFM**
3.  Squelch düşük → her birkaç dakikada bir "ciritleyen" paket sesi (audio modem)

### Adım 5: Spektrum gözlem

-   Üst panel: **waterfall** (zaman x frekans x güç)
-   Alt panel: **anlık spektrum**
-   Sürüklemekle frekans gez
-   Mouse wheel ile zoom in/out
-   Sağ panel'de gain, audio settings

## Anten önerisi

### Stock telescopic anten (gelendir)

-   Çoğu Blog v4'le birlikte gelir
-   5 cm-1m arası ayar — bandına göre kısalt:
    -   VHF (145 MHz): ~50 cm
    -   UHF (433 MHz): ~17 cm
    -   1090 MHz (ADS-B): ~7 cm

### DIY discone (geniş bant)

-   25 MHz - 1.5 GHz aralık tek anten
-   8 element + topraklama plakası, alüminyum/bakır boru
-   Online plan: [discone calculator](https://www.changpuak.ch/electronics/discone.php)

### J-Pole / Slim Jim (amatör 2m/70cm için)

-   Bkz. [Anten Yapımı](/tutorials/anten-yapimi-temel)

### Aktif anten (uzay/uydu için)

-   LNA içerir, antene yakın amplify eder
-   NOAA APT (137 MHz) ve ADS-B (1090 MHz) için fark yaratır

## Uygulama örnekleri

### Hava trafiği dinleme

-   Frequency: 118.100 MHz (Atatürk yaklaşma) — AM modu
-   Bandwidth: 5 kHz
-   Squelch: dinleme yapılan civar yoğunluğa göre

### NOAA hava durumu uydusu

-   NOAA-15 / 18 / 19 — APT modu (analog görüntü, 137-138 MHz)
-   WXtoImg veya open-weather-apt-decoder yazılımı
-   Geçişler ~12 dakika; **Heavens-Above.com** uydu programı için
-   Kuzey-güney geçişlerde aktif — sabit anten oryantasyonuyla bile yakalanır

### ADS-B uçak takibi

-   Frequency: 1090 MHz
-   Yazılım: dump1090, [adsbexchange.com feeder](https://adsbexchange.com/)
-   24/7 Pi setup ile civarınızdaki tüm uçakları haritada görmek + adsbexchange'e besleme

### POCSAG pager (acil servis)

-   Türkiye'de hâlâ aktif (acil tıp, itfaiye)
-   154-160 MHz aralık taranır, mesajlar metin olarak çıkar
-   PDW dekoder (Win) veya MultimonNG (Linux/Mac) yazılımı

## SDR'la amatör radyoyu birleştirme

İlerlemiş kullanım: **WSJT-X + RTL-SDR**:

-   HF dipole + RTL-SDR Blog v4 (direct sampling 14 MHz)
-   WSJT-X audio source = "RTL-SDR" (üzerinden ses yayınla)
-   5W TX için ayrı RF amplifier gerek (RTL-SDR sadece RX)
-   Maliyet: $40 dongle + ev yapımı dipole + 5W ucuz QRP TX = $200

Bu setup'la 14.074 MHz FT8 dinleyerek dünyada kim çalışıyor öğrenirsiniz, sonra TX yapmaya başladığınızda zaten bilgi sahibisiniz.

## Sık sorunlar

| Belirti | Çözüm |
| --- | --- |
| Yazılım dongle'ı görmüyor | Zadig ile WinUSB sürücüsü kurulu mu kontrol et |
| Çok parazit, sinyal yok | Antenin uzunluğu doğru mu (frekansa göre); USB hub yerine doğrudan PC'ye bağla |
| FM stereo iyi geliyor ama NFM bozuk | Bandwidth değiştir (12.5 kHz NFM, 200 kHz WFM); frekans sapması: TCXO kalibrasyonu yap |
| Aşırı CPU kullanımı | Sample rate'i düşür (2.4 MSPS yerine 1.024); GUI'de waterfall'u kapatabilirsin |
| Frekans 1-2 kHz kayık | TCXO yok, sıcaklık etkisi; SDR++ → Source → "Frequency offset" ile manuel düzelt |

## Yasal sınırlar (Türkiye)

-   **Dinleme** genelde serbest (TBK 244, 246 madde tartışması — dinleme tek başına suç değil)
-   **Kayıt + yayma** iletişim gizliliği ihlali; özellikle özel kişi konuşması
-   **Şifre kırma** asla yasal değil (RSA, AES, P25 enkripsiyonu kırma girişimi suç)
-   **Ticari yayın yapan istasyonu engelleme** (jamming) ciddi suç
-   **Amatör bant (144/430 MHz)** — dinleme tamamen serbest, hatta lisansı olan amatör meslektaşlarla "scanner" işi yaygın

> **Etik tavsiye:** Dinlediklerinizi sosyal medyada/forumda paylaşmadan önce iki kez düşünün. Acil servis frekanslarını dinleyebilirsiniz ama kişisel detayları (isim, adres) yaymak yasal sorun + etik dışı.

## Yararlı kaynaklar

-   [rtl-sdr.com](https://www.rtl-sdr.com) — resmi blog + tutorials
-   [rtl-sdr.com/v4](https://www.rtl-sdr.com/v4/) — Blog v4 user guide
-   [SDR++](https://www.sdrpp.org)
-   [SDR# (SDRSharp)](https://airspy.com/download/)
-   [GQRX](https://gqrx.dk)
-   [Çağlar Çelik SIGINT serisi 1: RTL-SDR + SDR#](https://caglar-celik.com/siber-guvenlik/sigint-serisi-1-rtl-sdr-ve-sdr-kullanimi/) (TR)
-   [Berkay Yıldız RF + SDR](https://berkayyildiz.com/rf-radyo-frekansi-sdr/) (TR)
-   [Beti SDR rehberi](https://blog.beti.com.tr/rtl-sdr-rehberi-kurulum-anten-baglantisi-ve-gercek-sinyal-yakalama/)
-   [adsbexchange.com](https://adsbexchange.com) — ADS-B feeder ağı
-   [aprs.fi](https://aprs.fi) — APRS sinyallerinizi RTL-SDR ile RF'ten dekod ettirip web'e basabilirsiniz

## Sıradaki adımlar

-   [Çağrı İşareti Nasıl Alınır](/tutorials/cagri-isareti-nasil-alinir) — RX'i öğrendikten sonra TX yapma izni
-   [APRS Nedir](/tutorials/aprs-nedir-nasil-kullanilir) — RTL-SDR ile direkt dinlenebilir
-   [FT8](/tutorials/ft8-dijital-mod) — RTL-SDR + WSJT-X = lisanssız RX FT8 gözlemcisi
-   [UV-K5 Programlama](/tutorials/uv-k5-programlama) — RX'i öğrendikten sonra TX hazırlığı

73, ve dinleyip öğren — telsiz gerçekten hayatın farklı yönlerinden öğretici!
