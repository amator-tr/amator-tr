---
title: 'Amatör Telsiz Uydu Haberleşmesi — LEO, AMSAT, ISS, Pratik Rehber'
description: >-
  LEO amatör radyo uyduları (AO-91, RS-44, SO-50), ISS digipeater, AMSAT, FT8
  via QO-100. Doppler shift düzeltme, anten yön ayarı, ücretsiz tracking
  yazılımı.
keywords:
  - uydu
  - satellite
  - LEO
  - AMSAT
  - ISS
  - AO-91
  - QO-100
article_section: uydu
published_at: '2026-04-26'
updated_at: '2026-04-26'
faq:
  - q: Lisans gerek mi?
    a: >-
      Evet, en az B sınıfı (VHF/UHF tam yetki). C sınıfı da yeter çünkü 2m/70cm
      altındadır.
  - q: En kolay ilk uydu?
    a: 'AO-91 Fox-1B — FM repeater, dual-band telsiz yeter, Doppler manuel.'
  - q: Anten zorunlu mu?
    a: >-
      Yagi olmadan (sadece dahili stub anten) çok zor — sinyal -10 dB zayıf.
      Yagi/loop yagi ile 5-element 70cm + 3-element 2m yeter (DIY 200 TL).
  - q: En aktif Türk uydu operatörü?
    a: >-
      TA2RC (Sefa Aşçıoğlu) — uydu kontak şampiyonu, sosyal medyada bilgi
      paylaşıyor.
  - q: QO-100 yatırımı değer mi?
    a: >-
      ~30K TL eşittir İcom IC-7300 fiyatı. Ama 24/7 erişim + kolay DX.
      Apartmanda HF zor olanlar için mucize çözüm — QO-100 anteni pencereye
      takılır, kontak başlatır. ---
---
5 watt el telsizi + Yagi anten + biraz zamanlama → uzaydan dünyaya kontak. **Amatör radyo uyduları** 1961'den beri yörüngede, şu anda 30+ aktif. Bu rehber LEO uydularıyla ilk kontak rehberi + ISS digipeater + QO-100 geosynkron işlem.

## Amatör uydular kategorisi

### LEO (Low Earth Orbit) — 200-2000 km

-   90-110 dakikada bir tur
-   Pas süresi: 8-15 dakika
-   Türkiye üzerinden günde 4-6 pas
-   En tipik amatör uyduları
-   Örnek: AO-91, RS-44, SO-50

### MEO (Medium Earth Orbit) — 2000-35.000 km

-   Bazı yarı-amatör uydular
-   Daha uzun pas

### GEO (Geostationary Orbit) — ~36.000 km

-   Sabit pozisyon, sürekli görünür
-   **QO-100** (Es'hailSat-2) — ortadoğu/Türkiye/Avrupa kapsama
-   24/7 sürekli erişim

### Decayed / inactive

-   Birçok eski uydu artık inaktif (battery/RF arıza)
-   Aktif liste: [amsat.org](https://www.amsat.org/)

## En aktif amatör uyduları (2026)

| Uydu | Tip | Uplink | Downlink | Mod |
| --- | --- | --- | --- | --- |
| **AO-91 Fox-1B** | LEO | 435.250 (CTCSS 67) | 145.960 | FM repeater |
| **AO-92 Fox-1D** | LEO | 435.350 | 145.880 | FM repeater (intermittent) |
| **SO-50 Saudisat** | LEO | 145.850 (CTCSS 67) | 436.795 | FM repeater |
| **RS-44 Radio-9** | LEO | 145.935-995 | 435.610-670 | Linear (SSB/CW) |
| **AO-7** | LEO | 432.180-120 | 145.850-790 | Linear (1974'ten beri!) |
| **ISS** (UC) | LEO | 145.825 | 145.825 | APRS digipeater |
| **QO-100** | GEO | 2400 MHz | 10489 MHz | Linear narrowband |

## İlk LEO kontağı (AO-91 / SO-50)

LEO uyduları **FM repeater** olarak çalışır — içeride uplink (sen telsizinden gönderir), aşağıya downlink (sen telsizinden alırsın). Aynen yer-bazlı röle gibi, ama uydu hareket halinde.

### Ekipman

-   **Dual-band (2m/70cm) FM telsiz** — Baofeng UV-5R **yeter**
-   **Yagi anten** — 4-element 70cm + 3-element 2m, omuzla taşınabilir
    -   Ya da omnidireksiyonel + uydu yüksek geçişte (overhead pass) çalışabilir
-   **Pas tahmin yazılımı** (aşağıda)
-   Defter / log

### Maliyet

~1500 TL (Baofeng + DIY Yagi) → uzaya kontak başlangıcı

### Pas tahmin yazılımı

#### Bilgisayar

-   **GPredict** (Linux/Mac/Win) — ücretsiz, klasik
-   **Orbitron** (Windows) — popüler
-   **HamLogger** integrate edilmiş satellite tracking

#### Mobile

-   **AMSAT iOS** (ücretsiz)
-   **Look4Sat** (Android, ücretsiz)
-   **Heavens-Above** (web + app)

### Pas listeleme

TLE (Two-Line Element) veriyor — uydunun yörünge parametreleri. Uygulamalar otomatik günceller.

Örnek pas:

```
AO-91 — Pazar 28 Nisan 2026
Başlangıç: 14:23 UTC, AZ 215° (güneybatı), EL 0°
Maksimum: 14:30 UTC, AZ 178°, EL 67°
Bitiş: 14:36 UTC, AZ 145° (güneydoğu), EL 0°
Süre: 13 dakika
```

EL = elevation (yükseklik açısı). Maks EL > 30° = iyi pas.

## Doppler shift

Uydu hızlı hareket eder (7.5 km/s) → Doppler etkisi → frekans kayar:

-   **Yaklaşırken**: frekans **yüksek** kayar (+5-10 kHz @ 70cm)
-   **Uzaklaşırken**: frekans **düşük** kayar (-5-10 kHz)

### El kontrol

Uplink/downlink frekansını manuel ayarlamak gerek:

-   Pasın başında: downlink +5 kHz
-   Maksimum yüksekte: downlink nominal frekans
-   Pasın sonunda: downlink -5 kHz

### Otomatik kontrol

Bilgisayar kontrolü ile frekans gerçek zamanlı düzeltilir (CAT control). N1MM, GPredict ve Yaesu/Icom integrate edilebilir.

### Pratik

Çoğu el telsizinde manuel Doppler ayarı zor. AO-91 gibi uydularda **downlink VFO'sunu ayarla, uplink fix bırak** — uydu seni daha iyi duyar (sen daha fazla doğrulayıcı).

## İlk QSO adım adım

### 1\. Pas listele

Tahmin yazılımından AO-91 veya SO-50 için bugünkü pas. EL > 30° tercih et.

### 2\. Frekansları yaz

Memory'e:

-   **AO-91 Up**: 435.250 MHz, CTCSS 67.0
-   **AO-91 Down**: 145.960 MHz

### 3\. Pas zamanı yaklaş

-   5 dk öncesinden başlangıç AZ yönüne anteni çevir
-   Bilgisayarı çalıştır, GPredict pasın gerçek zamanlı

### 4\. Pas başlar

-   Anteni AZ + EL yönüne çevir, pas boyunca takip et
-   Telsizi VFO mode, downlink dinle
-   "CQ Satellite TA1XYZ" gibi sesler duyacaksın

### 5\. Çağır

-   TX'e geç, kısa CQ at: "CQ Satellite TA1XYZ"
-   Cevap geldiyse exchange: çağrı + grid + signal
-   Tipik QSO: 30-60 saniye, hızlı çünkü pas kısa

### 6\. Logla

-   TIME UTC, çağrı, uydu adı, pasın açısı

## SO-50 — popüler ama tricky

SO-50 active **etkinleştirme tonu** ister:

-   Önce 67.0 Hz CTCSS ile **74.4 Hz** tonu 2 saniye gönder (etkinleştir)
-   Sonra normal QSO

Bu yüzden bazı operatörler "SO-50 muzip" der. Pasın ilk pasında etkinleştir, kalan pas süresince çalışır.

## ISS APRS Digipeater

International Space Station **APRS digi** olarak çalışır:

-   **Frekans**: 145.825 MHz (uplink + downlink aynı)
-   **Mod**: 1200 baud AFSK APRS
-   **Path**: ARISS

İlk denenen: APRS pozisyonu beacon, sonraki pas'ta aprs.fi'de "via ISS" görünür. Eğer şanslıysan ISS upon Türkiye yörüngede beraber.

[APRS tutorial](/tutorials/aprs-nedir-nasil-kullanilir) konfigürasyon detayı.

## QO-100 (geostationary)

Es'hailSat-2 = 26°E geostationary, ortadoğu/Avrupa/Afrika kapsama. **Türkiye'ye sabit görünür** — anteni güneye 30-40° eğil, 24 saat kontak.

### Avantajlar

-   **Sürekli erişim** (LEO'nun pas zorluğu yok)
-   Geniş bant — narrowband (NB) + wideband (WB) transponder
-   DX çok kolay — Avrupa, Afrika, Ortadoğu hep aynı frekansta

### Dezavantajlar

-   **Pahalı setup** — 2.4 GHz uplink + 10 GHz downlink antenler + LNB + transverter
-   ~30K TL minimum bütçe (DIY)

### Mod

-   Linear transponder (SSB/CW)
-   Web SDR receiver: [websdr.eshail.batc.org.uk](https://websdr.eshail.batc.org.uk/) — uplink yapmadan dinle, pratik

## DX uyduları

### AO-7 (1974'ten beri yörüngede!)

-   Linear transponder, SSB/CW
-   50 yaşında ama hâlâ kısmen çalışıyor
-   "ham radio'nun yaşayan tarihi"

### Falconsat-3

-   Packet radio digipeater (1200 bps AX.25)
-   APRS gibi ama daha eski mod

### Cube-sats

-   Çoğu kısa ömürlü (<5 yıl)
-   AMSAT-NA aktif liste tutuyor

## Uydu ile DX yapmak

LEO uyduları sadece kısa pasta görünür ama **footprint** (yer ayak izi) ~5000 km çapında — bu mesafede iki operatör aynı uyduyu görüp kontak yapabilir.

Türkiye'den AO-91 ile mesafe:

-   Pasın başında uydu güneybatıda → Cebelitarık, Fas, Cezayir görür
-   Maksimumda Türkiye merkezde → Avrupa, Mısır, İran görür
-   Pasın sonunda kuzeydoğuda → Rusya, Sibirya görür

Sıkça yapılan: TR ↔ GR ↔ IT ↔ DE — Avrupa içi kolay. TR ↔ JA (Japonya) zor — uydunun aynı pas anında ikisi de görmesi gerek (footprint sınırında).

## Yapay zeka + uydu

CubeSat'lar AI sensor ile uçar — yer kullanımı, gemi takibi, yangın tespiti. Amatör uyduların bazılarında **AI inference** yapan payload var. Ham radio aracılığıyla gerçek zamanlı veri indirme deneyleri.

## Sık sorulan sorular

### Lisans gerek mi?

Evet, en az B sınıfı (VHF/UHF tam yetki). C sınıfı da yeter çünkü 2m/70cm altındadır.

### En kolay ilk uydu?

**AO-91 Fox-1B** — FM repeater, dual-band telsiz yeter, Doppler manuel.

### Anten zorunlu mu?

Yagi olmadan (sadece dahili stub anten) çok zor — sinyal -10 dB zayıf. Yagi/loop yagi ile 5-element 70cm + 3-element 2m yeter (DIY 200 TL).

### En aktif Türk uydu operatörü?

TA2RC (Sefa Aşçıoğlu) — uydu kontak şampiyonu, sosyal medyada bilgi paylaşıyor.

### QO-100 yatırımı değer mi?

~30K TL eşittir İcom IC-7300 fiyatı. Ama 24/7 erişim + kolay DX. Apartmanda HF zor olanlar için **mucize** çözüm — QO-100 anteni pencereye takılır, kontak başlatır.

* * *

## İlgili kaynaklar

-   [APRS](/tutorials/aprs-nedir-nasil-kullanilir) — ISS digi
-   [Maidenhead grid](/araclar/maidenhead-grid/) — uydu QSO exchange
-   [İlk telsiz satın alma](/tutorials/ilk-telsiz-satin-alma-rehberi)
-   AMSAT-NA: [amsat.org](https://www.amsat.org/)
-   AMSAT-DL (Almanya, QO-100): [amsat-dl.org](https://amsat-dl.org/)
-   Pas tahmini: [heavens-above.com](https://www.heavens-above.com/)
-   **Genişletilmiş kaynak:** [telsizcilik.com](https://telsizcilik.com/) — uydu makaleleri
