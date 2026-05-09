---
title: IARU Bant Planı — Hangi Frekansta Hangi Mod Kullanılır?
description: >-
  IARU Region 1 bant planı detayı — HF/VHF/UHF bantlarında CW, SSB, dijital,
  beacon, satellite bölümleri. Türkiye spesifik frekanslar, çağrı frekansları,
  acil bantlar.
keywords:
  - bant planı
  - IARU
  - frekans
  - HF
  - VHF
  - başlangıç
article_section: bant planı
published_at: '2026-04-26'
updated_at: '2026-04-26'
faq:
  - q: Bant planı yasal mı?
    a: >-
      Gönüllü — BTK yönetmeliği bant sınırları belirler, iç düzen IARU önerir.
      Ama topluluk baskısı güçlü — ihlal eden operatör uyarılır.
  - q: FT8 frekansı sabit mi?
    a: Evet — 14.074 MHz USB dünya standart. WSJT-X otomatik ayarlar. Değiştirme.
  - q: APRS 144.800 mHz tüm dünya mı?
    a: Hayır — ABD 144.390 MHz kullanır. Türkiye + Avrupa 144.800 MHz.
  - q: Genel konuşma" bölgesinde her mod serbest mi?
    a: >-
      Teknik olarak evet ama baskın mod (SSB) dışında mod kullanmak frekans
      karmaşası yaratır. Bant planına uy. ---
---
"14.074'te FT8 yapıyordum, biri bağırdı 'burası SSB bölgesi!'" — doğru frekans, yanlış mod. **IARU bant planı** = her bantta hangi frekans aralığında hangi modun kullanılacağını belirleyen gönüllü ama saygı duyulan düzenleme. Yönetmelik değil ama **ihlali topluluk tarafından kınanır**.

## IARU bant planı nedir?

IARU (International Amateur Radio Union) Region 1 tarafından belirlenen **bant kullanım önerisi**. Yasal zorunluluk değil ama dünya çapında tüm operatörler uyar — çünkü kaos alternatifi.

### Neden gerek?

-   Aynı bantda CW + SSB + dijital + beacon = karışıklık
-   Bant planı "kimin nerede olduğunu" belirler
-   **"Dinle, sonra konuş"** kuralının alt yapısı

## HF bant planı özeti

### 80m bandı (3.500 - 3.800 MHz)

| Frekans | Mod | Kullanım |
| --- | --- | --- |
| 3.500 - 3.570 | CW | CW çağrı: 3.560 |
| 3.570 - 3.600 | Dijital | FT8: 3.573, RTTY: 3.580 |
| 3.600 - 3.650 | SSB + CW | Contest zone |
| 3.650 - 3.700 | SSB | Genel konuşma |
| 3.700 - 3.800 | SSB | TR lokal + DX, **3.760 EmComm** |

### 40m bandı (7.000 - 7.200 MHz)

| Frekans | Mod | Kullanım |
| --- | --- | --- |
| 7.000 - 7.040 | CW | CW çağrı: 7.030, QRP: 7.030 |
| 7.040 - 7.060 | Dijital | FT8: **7.074**, RTTY: 7.040 |
| 7.060 - 7.100 | SSB (LSB) | **7.080 EmComm** |
| 7.100 - 7.200 | SSB | Genel konuşma, DX |

### 20m bandı (14.000 - 14.350 MHz)

| Frekans | Mod | Kullanım |
| --- | --- | --- |
| 14.000 - 14.070 | CW | CW çağrı: 14.060, QRP: 14.060 |
| 14.070 - 14.099 | Dijital | **FT8: 14.074**, RTTY: 14.080, FT4: 14.080 |
| 14.099 - 14.101 | Beacon | IBP beacon ağı (dinleme only) |
| 14.101 - 14.112 | Dijital | PSK31: 14.070 |
| 14.112 - 14.125 | SSB (USB) | Contest |
| 14.125 - 14.300 | SSB | Genel DX, **14.230 SSTV**, **14.300 EmComm** |

### 15m bandı (21.000 - 21.450 MHz)

| Frekans | Mod | Kullanım |
| --- | --- | --- |
| 21.000 - 21.070 | CW | CW çağrı: 21.060 |
| 21.070 - 21.110 | Dijital | FT8: **21.074** |
| 21.110 - 21.149 | Dijital + SSB | Geçiş |
| 21.149 - 21.450 | SSB (USB) | DX, contest |

### 10m bandı (28.000 - 29.700 MHz)

| Frekans | Mod | Kullanım |
| --- | --- | --- |
| 28.000 - 28.070 | CW |  |
| 28.070 - 28.190 | Dijital | FT8: **28.074** |
| 28.190 - 28.300 | Beacon | IBP + regional beacon |
| 28.300 - 28.600 | SSB (USB) | DX |
| 29.000 - 29.200 | AM | Eski AM segment |
| 29.520 - 29.700 | FM | FM simplex + repeater |

## VHF / UHF bant planı

### 2m bandı (144.000 - 146.000 MHz)

| Frekans | Mod | Kullanım |
| --- | --- | --- |
| 144.000 - 144.035 | EME | Moonbounce |
| 144.050 - 144.150 | CW | CW çağrı: **144.050** |
| 144.150 - 144.400 | SSB | SSB çağrı: **144.300** |
| 144.400 - 144.490 | Beacon |  |
| 144.500 - 144.794 | Dijital + tüm mod | APRS: **144.800** |
| 145.000 - 145.200 | Repeater input | \-0.6 shift |
| 145.200 - 145.600 | Simplex | **145.500 çağrı**, 145.525-575 yan kanallar |
| 145.600 - 146.000 | Repeater output |  |

### 70cm bandı (430.000 - 440.000 MHz)

| Frekans | Mod | Kullanım |
| --- | --- | --- |
| 432.000 - 432.100 | EME / CW |  |
| 432.100 - 432.400 | SSB | SSB çağrı: **432.200** |
| 433.000 - 433.375 | Repeater input |  |
| 433.400 - 433.575 | Simplex | **433.500 çağrı** |
| 433.600 - 434.000 | Repeater output |  |
| 435.000 - 438.000 | Satellite | Uydu uplink/downlink |

## Önemli çağrı frekansları (Türkiye)

| Frekans | Mod | Amaç |
| --- | --- | --- |
| **145.500 MHz** | FM | 2m ulusal çağrı (simplex) |
| **433.500 MHz** | FM | 70cm ulusal çağrı (simplex) |
| **144.300 MHz** | SSB | 2m SSB çağrı |
| **144.800 MHz** | APRS | APRS Türkiye |
| **14.300 MHz** | USB | Uluslararası acil |
| **7.080 MHz** | LSB | TR bölgesel EmComm |
| **3.760 MHz** | LSB | TR gece EmComm |

## Beacon frekansları — dokunma!

**IBP (International Beacon Project)** frekansları:

-   14.100, 18.110, 21.150, 24.930, 28.200 MHz
-   18 beacon istasyonu dünya çapında, sıralı yayın
-   **Bu frekanslarda asla TX yapma** — sadece dinle, propagasyon test

## WARC bantları (özel)

30m (10.1 MHz), 17m (18.068 MHz), 12m (24.89 MHz) = **contest yasak** bantlar:

-   WARC (World Administrative Radio Conference) tahsisi
-   Sessiz, sakin DX için
-   Contest yığılması yok

## Sık yapılan hatalar

### 1\. SSB bölgesinde dijital mod

14.125'te FT8 → SSB operatörleri kızar. **14.074** doğru yer.

### 2\. Beacon frekansında TX

14.100 MHz'de CQ → beacon dinleyicileri şikayet eder. Bu frekans **koruma altında**.

### 3\. Çağrı frekansında uzun sohbet

145.500'de 10 dakika konuşmak → başkaları çağrı yapamaz. Kontak kur, **hemen yan kanala geç**.

### 4\. Yanlış sideband

40m'de USB → herkes LSB kullanır, seni duymazlar (Donald Duck). 10 MHz altı LSB, üstü USB.

### 5\. Repeater input'ta simplex

145.000-145.200 repeater input → simplex yapınca repeater'ı tetiklersin.

## Bant planı nereden bulunur?

-   **IARU Region 1**: [iaru-r1.org/reference/band-plans](https://www.iaru-r1.org/reference/band-plans/)
-   **TRAC**: trac.org.tr bant planı sayfası
-   **Telsiz menüsü**: çoğu modern telsiz dahili bant planı gösterir (IC-7300 waterfall renk)

## Sık sorulan sorular

### Bant planı yasal mı?

**Gönüllü** — BTK yönetmeliği bant sınırları belirler, iç düzen IARU önerir. Ama topluluk baskısı güçlü — ihlal eden operatör uyarılır.

### FT8 frekansı sabit mi?

Evet — **14.074 MHz USB** dünya standart. WSJT-X otomatik ayarlar. Değiştirme.

### APRS 144.800 mHz tüm dünya mı?

Hayır — ABD 144.390 MHz kullanır. Türkiye + Avrupa 144.800 MHz.

### "Genel konuşma" bölgesinde her mod serbest mi?

Teknik olarak evet ama **baskın mod** (SSB) dışında mod kullanmak frekans karmaşası yaratır. Bant planına uy.

* * *

## İlgili kaynaklar

-   [Q kodları + işletme adabı](/tutorials/q-kodlari-isletme-adabi)
-   [Modülasyon AM/FM/SSB](/tutorials/modulasyon-am-fm-ssb-detay)
-   [FT8 dijital mod](/tutorials/ft8-dijital-mod)
-   [CTCSS / DCS](/tutorials/ctcss-dcs-nedir) — röle ton kodları
-   [Röle nedir](/tutorials/role-nedir)
-   [Callsign prefiks dünya sistemi](/tutorials/callsign-prefiks-dunya-sistemi)
-   IARU Region 1: [iaru-r1.org](https://www.iaru-r1.org/)
-   **Genişletilmiş kaynak:** [telsizcilik.com](https://telsizcilik.com/)
