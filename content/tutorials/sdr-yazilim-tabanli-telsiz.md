---
title: SDR (Yazılım Tabanlı Telsiz) — Donanımdan Yazılıma Geçiş
description: >-
  SDR (Software Defined Radio) nedir, nasıl çalışır. RTL-SDR, HackRF, PlutoSDR,
  Icom IC-7300 SDR mimarisi. SDR# / GQRX kurulumu, waterfall display, dijital
  decode.
keywords:
  - SDR
  - RTL-SDR
  - HackRF
  - IC-7300
  - dijital telsiz
article_section: SDR
published_at: '2026-04-26'
updated_at: '2026-04-26'
faq:
  - q: SDR ile ne dinleyebilirim (lisanssız)?
    a: >-
      - Amatör radyo (her bant) - AM/FM broadcast - Havacılık (118-137 MHz AM) -
      Maritime VHF - ADS-B (1090 MHz uçak data) - Pager (eski era, hâlâ aktif
      bazı yerlerde) - LoRa, IoT cihazlar - Cep telefon trafic? HAYIR —
      encrypted, dinlemek de yasal sorun
  - q: Encryption olan sinyalleri decode edebilir miyim?
    a: >-
      - Amatör radyo'da encryption yasak (acil durum hariç) - Cellular GSM/LTE —
      şifreli, decode yasal sorun - Police/Government TETRA — şifreli, illegal
  - q: SDR ile TX yaparken bantı nasıl kısıtlarım?
    a: >-
      HackRF/PlutoSDR yasal olmayan frekansta da TX yapabilir → operatör
      sorumlu. Yazılımda manual frekans kısıtlaması yap (TX limiter).
  - q: Defined" radio — donanım niye lazım?
    a: >-
      Pure software'le radyo yapılamaz çünkü RF dünyası analog. SDR'ın "donanım
      frontend" + "yazılım backend" karışımı. ---
---
[RTL-SDR ile telsiz dinleme tutorialımız](/tutorials/rtl-sdr-ile-telsiz-dinleme) basit RX setup'ı işliyor. Bu rehber bir adım daha — **SDR mimarisi**, sadece RX değil **TX** SDR'lar (HackRF, PlutoSDR), modern transceiver'larda SDR (IC-7300, FTDX-10), yazılım stack'i.

## Klasik telsiz vs SDR

### Klasik (analog) telsiz

-   Her bant için **dedikated devre**
-   Filtreler, mixer'lar, IF amplifier'lar fiziksel donanım
-   Bantgenişliği + mod **değiştirilemez** — donanım sabit
-   Maliyet: parça yoğun, tasarım pahalı

### SDR (Software Defined Radio)

-   Antenden gelen sinyal **doğrudan örneklenir** (high-speed ADC)
-   **Yazılım** mod, bantgenişliği, filter'i tanımlar
-   Aynı donanım: AM, FM, SSB, CW, FT8, herhangi bir mod yazılımla
-   Maliyet: silikon ucuzladıkça SDR de ucuzlıyor

### Hibrit

-   Modern transceiver'lar (Icom IC-7300, Yaesu FTDX-10) **direct sampling SDR**
-   IF stage **dijital domain'de** yapılır
-   Front-end donanım hâlâ var (LNA, ADC öncesi filter)

## SDR çeşitleri (donanım)

### RX-only

#### RTL-SDR (~$30)

-   DVB-T USB stick, hack edilmiş driver
-   24 MHz - 1.7 GHz bant
-   2.4 Msps örnek hızı
-   8-bit ADC (orta dinamik aralık)
-   **Başlangıç için ideal**, lisans gerek yok (sadece RX)
-   [Tutorial →](/tutorials/rtl-sdr-ile-telsiz-dinleme)

#### Airspy R2 (~$170)

-   24-1750 MHz
-   10 Msps
-   12-bit ADC (RTL'den 4x daha hassas)
-   HF için ek dongle (HF+ Discovery $169)

#### SDRplay RSPdx (~$200)

-   1 kHz - 2 GHz (HF dahil!)
-   14-bit ADC, çok geniş dinamik aralık
-   Premium HF receiver

### TX-capable (transceiver)

#### HackRF One (~$300)

-   1 MHz - 6 GHz, hem RX hem TX
-   20 Msps
-   **Half-duplex** (aynı anda RX veya TX, ikisi birden değil)
-   Hacking + amatör radyo + güvenlik araştırması

#### PlutoSDR / Adalm-Pluto (~$200)

-   325 MHz - 3.8 GHz (extended firmware ile 70 MHz - 6 GHz)
-   61.44 Msps
-   **Full-duplex** (RX + TX aynı anda)
-   Eğitim odaklı, genç engineer'lar arasında popüler

#### LimeSDR Mini (~$200)

-   10 MHz - 3.5 GHz
-   30.72 Msps
-   Open hardware

#### Icom IC-705 (~$1300)

-   All-mode HF + 6m + 2m + 70cm
-   5W TX
-   **SDR architecture** + traditional UI
-   Portable + Bluetooth + GPS
-   Premium SDR transceiver

### Sabit istasyon SDR

#### Icom IC-7300 (~$1300)

-   100W HF + 6m
-   Direct RF sampling SDR
-   30 kHz waterfall display
-   USB digital interface
-   Modern amatör'ün gold standard'ı

#### Yaesu FTDX-10 (~$1500)

-   100W HF + 6m
-   Hybrid SDR + traditional architecture

#### Flex Radio FLEX-6400 (~$3500)

-   Pure SDR — ekran/UI yok, bilgisayardan kontrol
-   Multi-receiver (2-8 simultaneous)
-   Contest king

## SDR yazılım

### RX yazılımları

| Yazılım | Platform | Fiyat | Özellik |
| --- | --- | --- | --- |
| **SDR#** (Sharp) | Win | Ücretsiz | RTL-SDR mainstay |
| **SDR Console v3** | Win | Ücretsiz | RTL/Airspy/SDRplay multi |
| **GQRX** | Linux/Mac | Ücretsiz | Açık kaynak, sade |
| **CubicSDR** | Multi | Ücretsiz | Açık kaynak, modern UI |
| **HDSDR** | Win | Ücretsiz | Klasik SDR Pro alternatif |
| **SDRangel** | Multi | Ücretsiz | Multi-mode TX/RX |

### TX yazılımları

| Yazılım | Donanım | Özellik |
| --- | --- | --- |
| **GNU Radio** | All | Programlanabilir DSP toolbox |
| **WSJT-X** | All | FT8 + dijital modlar |
| **fldigi** | All | RTTY + PSK + birçok mod |
| **PowerSDR** | Flex | Flex Radio için resmi |
| **Quisk** | All | Linux SDR transceiver software |

### GNU Radio

SDR programlama framework — Python + C++ tabanlı. Block diagram editörü → kendi receiver'ını "node-based" tasarla. Akademisyen + güvenlik araştırmacılarının ana aracı.

## Pratik kullanım

### Senaryo 1: HF dinleme + analiz

-   SDRplay RSPdx + 30m dipole
-   SDR Console — 6 bant aynı anda
-   Geniş waterfall görüntüsü, propagasyon analizi

### Senaryo 2: Dijital mod

-   IC-7300 + WSJT-X (USB cable)
-   FT8 / FT4 / WSPR
-   Bilgisayar ses kart bypass — direct USB

### Senaryo 3: GNU Radio deneyi

-   HackRF + GNU Radio
-   ADS-B (uçak signal) decode
-   LoRa decode
-   Kendi modülasyon türü tasarımı

### Senaryo 4: Multi-receiver contest

-   Flex Radio + N1MM Logger
-   4 receiver eşzamanlı — 4 banttan kontak
-   Pile-up management görsel waterfall

## Waterfall display — modern SDR'ın sihri

Klasik telsizde tek bir frekansta dinliyorsun. SDR'da **30 kHz - 2 MHz** aralığında **görsel olarak** dolu:

-   X axis: frekans
-   Y axis: zaman (yukarı doğru ilerler)
-   Renk: sinyal gücü

### Pratik avantajları

-   "Bant açık mı?" — bir bakışta görürsün
-   Yeni operatör spotting — bant boş gözükse bile küçük sinyal aktivitesi waterfall'da
-   Kontest sırasında — pile-up'ı görsel olarak yönet
-   DXer cluster'a duyurmadan önce DX bul

## Front-end limitations

SDR donanım sınırları var:

### ADC dinamik aralığı

-   8-bit ADC = 48 dB dinamik aralık → strong signal nearby weak signal'i basar
-   12-bit = 72 dB
-   16-bit = 96 dB (premium SDR)

### Sample rate

-   Daha hızlı = daha geniş bandgenişliği aynı anda
-   USB bandwidth limit: 10-50 Msps
-   Network SDR: gigabit ethernet → 100+ Msps mümkün

### LNA noise figure

-   Antene yakın LNA (preamp) noise figure düşük olmalı
-   0.5-2 dB NF ideal

## SDR'ın pratik avantajları

1.  **Multi-mode aynı donanım** — yazılım değiştir, mod değişir
2.  **Frekans bağımsız** — 0-3 GHz aynı SDR
3.  **Recording** — ham IQ data save, sonra analiz
4.  **Multi-receiver** — bir SDR'dan aynı anda 4-8 sanal alıcı
5.  **Yazılım upgrade** — yeni mod çıkınca firmware update yeter
6.  **Hacking + güvenlik** — SDR + GNU Radio = istediğin protokolü reverse engineer

## SDR'ın pratik dezavantajları

1.  **Bilgisayar gerek** — pure SDR'lar standalone çalışmaz
2.  **Gecikme** (latency) — software processing bazı modlar için problem (CW QSO'da 100 ms gecikme)
3.  **Computer noise** — bilgisayar SDR'a yakın → RFI
4.  **Front-end zayıf güçlü sinyalde** — SDR receiver karşı yakın güçlü TX'ten desensitize olabilir

## Türkiye için SDR setup önerisi

### Bütçe entry (~$50)

RTL-SDR + 1.5m anten tel + bilgisayar → HF dinleme + VHF/UHF airband. **Lisans gerek yok**, sadece RX.

### Mid-range (~$300)

Airspy HF+ Discovery + dipole — quality HF dinleme.

### TX-capable amateur (~$1500)

Icom IC-705 — portable, all-mode, 5W. Lisans şart (B sınıfı).

### Sabit istasyon (~$1300)

Icom IC-7300 — 100W HF, mainstream amatör SDR.

## Sık sorulan sorular

### SDR ile ne dinleyebilirim (lisanssız)?

-   Amatör radyo (her bant)
-   AM/FM broadcast
-   Havacılık (118-137 MHz AM)
-   Maritime VHF
-   ADS-B (1090 MHz uçak data)
-   Pager (eski era, hâlâ aktif bazı yerlerde)
-   LoRa, IoT cihazlar
-   Cep telefon trafic? **HAYIR** — encrypted, dinlemek de yasal sorun

### Encryption olan sinyalleri decode edebilir miyim?

-   Amatör radyo'da encryption **yasak** (acil durum hariç)
-   Cellular GSM/LTE — şifreli, decode yasal sorun
-   Police/Government TETRA — şifreli, illegal

### SDR ile TX yaparken bantı nasıl kısıtlarım?

HackRF/PlutoSDR yasal olmayan frekansta da TX yapabilir → **operatör sorumlu**. Yazılımda manual frekans kısıtlaması yap (TX limiter).

### "Defined" radio — donanım niye lazım?

Pure software'le radyo yapılamaz çünkü RF dünyası analog. SDR'ın "donanım frontend" + "yazılım backend" karışımı.

* * *

## İlgili kaynaklar

-   [RTL-SDR ile dinleme](/tutorials/rtl-sdr-ile-telsiz-dinleme) — entry SDR
-   [FT8 dijital mod](/tutorials/ft8-dijital-mod) — SDR ile FT8
-   [WSPR](/tutorials/wspr-zayif-sinyal-yayini)
-   [İlk telsiz satın alma](/tutorials/ilk-telsiz-satin-alma-rehberi)
-   SDR# (Win): [airspy.com/download](https://airspy.com/download/)
-   GQRX (Linux/Mac): [gqrx.dk](https://gqrx.dk/)
-   GNU Radio: [gnuradio.org](https://www.gnuradio.org/)
-   **Genişletilmiş kaynak:** [telsizcilik.com](https://telsizcilik.com/) — SDR makaleleri
