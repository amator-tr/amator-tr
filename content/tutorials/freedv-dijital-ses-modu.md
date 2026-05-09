---
title: FreeDV — Açık Kaynak Dijital Ses Modu (HF Üzerinden)
description: >-
  FreeDV açık kaynak dijital ses modu, HF üzerinden codec2 ile düşük bitrate
  ses. SSB yerine kullan, 1500 Hz BW, daha temiz ses, encryption yok.
keywords:
  - FreeDV
  - dijital ses
  - codec2
  - HF
  - açık kaynak
article_section: FreeDV
published_at: '2026-04-26'
updated_at: '2026-04-26'
faq:
  - q: FreeDV ile DMR farkı?
    a: >-
      - DMR: VHF/UHF, AMBE codec (patentli), çok kullanıcı - FreeDV: HF, Codec2
      (açık), niche topluluk
  - q: Telsiz tek başına FreeDV yapabilir mi?
    a: >-
      Hayır — bilgisayar + yazılım gerek. Bazı SDR transceiver firmware FreeDV
      dahili olarak ekleyebilir gelecek.
  - q: Lisans gerek mi?
    a: 'Evet, B sınıfı (HF ses modu).'
  - q: Encryption mu?
    a: >-
      Hayır — Codec2 açık standart, herkes decode edebilir. Amatör radyo
      yönetmeliği uyumlu.
  - q: En iyi başlangıç frekansı?
    a: '14.236 USB — pazar 18:00 UTC Avrupa net. Aktif propagasyon + topluluk. ---'
---
DMR dijital ses VHF/UHF için. **FreeDV** = HF dijital ses, açık kaynak, ücretsiz. Codec2 audio codec ile **1500 Hz** içinde ses sinyali. SSB'den net ses, dar bant. Bu rehber FreeDV nedir + kurulum + kullanım.

## FreeDV nedir?

David Rowe (VK5DGR) tarafından 2012'de geliştirilen open-source dijital ses modu HF için.

### Özellikler

-   **Codec2** ses codec (1300, 700, 450 bps)
-   **OFDM modülasyon** HF için
-   **Bandwidth: 1500 Hz** (SSB'nin yarısı)
-   **Encryption yok** — amatör radyo yönetmeliği uyumlu
-   **Açık kaynak** — herkes geliştirebilir, kullanabilir

### Modlar

| Mod | Bit rate | BW | Kalite |
| --- | --- | --- | --- |
| **FreeDV 1600** | 1600 bps | 1500 Hz | Telefon kalitesi |
| **FreeDV 700C** | 700 bps | 1500 Hz | Anlaşılır, weak signal |
| **FreeDV 700D** | 700 bps | 1500 Hz | DOM (data over media) |
| **FreeDV 2020** | 2400 bps | 1700 Hz | HiFi |

## SSB vs FreeDV karşılaştırma

| Özellik | SSB | FreeDV |
| --- | --- | --- |
| BW | 2.4 kHz | 1.5 kHz |
| Audio kalite | Analog "Donald Duck" | Net dijital |
| Weak signal | \-10 dB SNR | \-2 dB SNR (700D) |
| Encryption | Hayır | Hayır (Codec2 açık) |
| Kurulum | Pasif (telsizden) | Bilgisayar + yazılım |

### Avantajlar

-   **Net ses** — analog SSB'in distorsiyonu yok
-   **Weak signal** — düşük SNR'da bile anlaşılır
-   **Spectrum verimli** — daha çok operatör aynı bantta

### Dezavantajlar

-   **Bilgisayar gerek** — telsiz yetmez
-   **Adoption düşük** — operatör sayısı sınırlı
-   **DSP latency** — ufak gecikme

## Kurulum

### 1\. Yazılım indir

-   [FreeDV.org](https://freedv.org/) → Win/Mac/Linux ücretsiz
-   v1.7+ önerilen

### 2\. Telsiz bağlantı

-   USB cable (Yaesu/Icom modern)
-   Ses kart bağlantı (eski telsiz)
-   CAT control opsiyonel ama tavsiye

### 3\. Audio level

-   Telsiz audio out → bilgisayar mic in
-   Bilgisayar speaker → telsiz mic in
-   Level mid-range (clipping yok)

### 4\. Frekans seç

HF popüler frekansları:

-   **80m**: 3.625 MHz LSB
-   **40m**: 7.177 MHz LSB
-   **20m**: 14.236 MHz USB
-   **17m**: 18.118 MHz USB
-   **15m**: 21.236 MHz USB

USB/LSB klasik gelenek (10 MHz altı LSB, üstü USB).

## Pratik kontak

### CQ atma

1.  FreeDV yazılımı **TX** moduna geç
2.  PTT bas (veya VOX)
3.  "CQ FreeDV TB3KKD"
4.  Cevap bekle — bilgisayar otomatik decode

### Kontak akışı

-   Klasik amatör SSB ile aynı (CQ + exchange + 73)
-   Audio kalite **mucize** seviyesinde net
-   Background noise yok (codec'in beyaz gürültü filtresi)

## FreeDV 700D (weak signal)

En zayıf sinyal modu:

-   700 bps Codec2
-   LDPC error correction (very robust)
-   **\-2 dB SNR'da decode** — SSB -10 dB altı imkansız sinyaller anlaşılır

### Pratik

HF zayıf koşullarda SSB ile zor / FT8 ile sadece text → **FreeDV 700D ile sesli** kontak.

### Atlantik QRP test

1W FreeDV 700D ile Avrupa'dan ABD'ye kontaklar raporlandı.

## FreeDV 2020 (yüksek kalite)

Premium:

-   2400 bps
-   LPCNet codec (AI ile geliştirilmiş)
-   HiFi ses kalitesi
-   1700 Hz BW

İyi propagasyon koşullarında kullan — tropo / Es / sahili.

## Aktif topluluk

### FreeDV Net'leri

-   **Sundays 18:00 UTC, 14.236 USB** — Avrupa FreeDV net
-   **Saturdays 22:00 UTC, 7.177 LSB** — North American net
-   Türkiye'de henüz aktif net yok

### Forum

-   FreeDV Slack
-   GitHub repo (codec2 + freedv)
-   HamSCI araştırma collaboration

## Türkiye'de durum

-   **FreeDV operatör sayısı**: ~5-10 (2026)
-   Niche topluluk
-   Promosyon eksik
-   Kurulum **5 dakika** — ama farkındalık düşük

### Geliştirme fırsatı

-   Türkiye TRAC FreeDV net başlatabilir
-   Lisans yenileme dijital ses modülü kursu
-   Genç operatör için "modern alternative SSB" pitch

## Codec2 — neden açık kaynak?

David Rowe (VK5DGR) Codec2'yi geliştirmek için:

-   Mevcut codec'ler (AMBE+2 vs DMR'da kullanılan) **patentli**
-   Patent-encumbered → amatör radyo açık ruhuna ters
-   Codec2 **patent-free**, herkes kullanabilir

### Sonuç

-   DMR (commercial codec) vs FreeDV (free codec)
-   DMR popüler, FreeDV niche — patent issue önemli mi tartışılır

## SDR + FreeDV

SDR transceiver (IC-7300, FT-991A) doğal partner:

-   USB cable direkt FreeDV
-   Bilgisayar zaten kullanıyor
-   Latency düşük

### Pluto SDR

PlutoSDR + FreeDV özelleştir → tam yazılım dijital ses transceiver.

## Sık sorulan sorular

### FreeDV ile DMR farkı?

-   **DMR**: VHF/UHF, AMBE codec (patentli), çok kullanıcı
-   **FreeDV**: HF, Codec2 (açık), niche topluluk

### Telsiz tek başına FreeDV yapabilir mi?

Hayır — bilgisayar + yazılım gerek. Bazı SDR transceiver firmware FreeDV dahili olarak ekleyebilir gelecek.

### Lisans gerek mi?

Evet, B sınıfı (HF ses modu).

### Encryption mu?

**Hayır** — Codec2 açık standart, herkes decode edebilir. Amatör radyo yönetmeliği uyumlu.

### En iyi başlangıç frekansı?

14.236 USB — pazar 18:00 UTC Avrupa net. Aktif propagasyon + topluluk.

* * *

## İlgili kaynaklar

-   [Modülasyon AM/FM/SSB detay](/tutorials/modulasyon-am-fm-ssb-detay)
-   [DMR Brandmeister talkgrouplar](/tutorials/dmr-brandmeister-talkgrouplar)
-   [SDR yazılım tabanlı telsiz](/tutorials/sdr-yazilim-tabanli-telsiz)
-   [JS8Call](/tutorials/js8call-radyo-chat-modu) — alternatif open dijital
-   FreeDV: [freedv.org](https://freedv.org/)
-   Codec2: [github.com/drowe67/codec2](https://github.com/drowe67/codec2)
-   **Genişletilmiş kaynak:** [telsizcilik.com](https://telsizcilik.com/)
