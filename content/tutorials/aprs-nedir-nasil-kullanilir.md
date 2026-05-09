---
title: 'APRS Nedir? Konum İzleme, Mesajlaşma ve Türkiye''de 144.800 MHz'
description: >-
  APRS (Automatic Packet Reporting System) nedir, nasıl çalışır, donanım (telsiz
  + TNC + GPS) gereksinimleri, aprs.fi kullanımı, Türkiye'de 144.800 MHz
  frekansı ve iGate altyapısı.
keywords:
  - aprs
  - paket-radyo
  - gps
  - ax25
  - vhf
  - dijital
article_section: aprs
published_at: '2026-04-25'
updated_at: '2026-04-25'
faq:
  - q: Lisans gerek mi?
    a: >-
      RF üzerinden yayın yaparsanız evet — APRS amatör bant frekansı (144.800
      MHz). Ancak aprs.fi üzerinden konum izleme, telefonla okuma, telefonla
      mesaj gönderme (APRS-IS only) lisanssız yapılabilir.
  - q: Ne kadar pil tüketir?
    a: >-
      Her TX paketi ~1-2 saniye sürer. 3 dakikada bir TX = 5W telsizinizi
      sürekli açık tutmaktan çok daha az.
  - q: Trafik sıkışıyor mu?
    a: >-
      Türkiye'de 144.800 nispeten boş; ABD'de 144.390 yoğun. Şehir merkezinde
      digipeater'lar arasındaki çakışma uzun yayın aralığı (5-10 dk) ile
      çözülür.
  - q: TX gücü ne olmalı?
    a: >-
      Mobilde 5W yeterli (digipeater ulaşır). Sabit istasyonda 25-50W
      kullanılabilir ama dengelidir; APRS RF spektrumu paylaşımlı, gereksiz güç
      başkalarını engeller.
---
## APRS nedir?

**APRS — Automatic Packet Reporting System**, 1982'de Amerikalı amatör Bob Bruninga (WB4APR, vefat 2022) tarafından geliştirilen, amatör telsiz üzerinden **konum, mesaj, hava durumu ve telemetri verisi** taşıyan bir dijital protokoldür. Her gün dünya çapında binlerce operatör otomatik olarak konum bildirimi gönderir; bu veri internet sitelerinde haritalandırılır.

Klasik telsizden farkı: ses yerine **dijital paketler** (AX.25 protokolü, 1200 baud AFSK modülasyonu) yayınlanır. Bir alıcı bu paketleri dekod eder, içeriğini ekrana yazar, haritada konum gösterir.

### Tipik kullanım senaryoları

-   **Mobil takip:** Araç içi telsiz GPS'le birlikte kendi konumunu her ~3 dakikada yayar; arkadaşların telefonundaki [aprs.fi](https://aprs.fi) konumunuzu canlı görür
-   **Doğa yürüyüşü / dağcılık:** Çantadaki el cihazı (Yaesu VX-8, Kenwood TH-D74 veya Mobilinkd TNC) 10 dk'da bir konum yayar; ailenizin telefonu güzergahı izler
-   **Kısa mesajlaşma:** SMS gibi 67 karakterlik mesajlar — telsizler arasında, ya da APRS-to-email gateway üzerinden
-   **Hava durumu istasyonu:** Wx-station otomatik sıcaklık/rüzgar/nem/basınç verilerini APRS'e basar
-   **ISS APRS digipeater:** Uluslararası Uzay İstasyonu'nun amatör paket digipeater'ı periyodik aktif — 145.825 MHz'de uydu üzerinden yayın
-   **Acil durum:** AFAD koordinasyonunda gönüllü konum paylaşımı (deprem, yangın, sel)

## APRS frekansı (Türkiye'de)

Tek bir ulusal frekans var: **144.800 MHz** (FM, simplex). Avrupa standardıdır (ABD'de 144.390 MHz). Tüm Türkiye'deki APRS kullanıcıları aynı frekansı paylaşır; **digipeater** ve **iGate** istasyonları ortaklaşa çalışır:

```
   ┌─────────────┐    144.800 MHz    ┌─────────────┐    144.800 MHz    ┌──────────────┐
   │ Mobil       │ ─── paket ───────►│ Digipeater  │─── paket ────────►│ Diğer mobil  │
   │ TA1ABC-9    │                   │ TA1RPT-1    │                   │  TA1XYZ      │
   └─────────────┘                   └──────┬──────┘                   └──────────────┘
                                            │
                                            │ (iGate'se internet'e basar)
                                            ▼
                                  ┌──────────────────┐
                                  │   APRS-IS        │
                                  │ aprs.fi gibi     │
                                  │ web haritalar    │
                                  └──────────────────┘
```

-   **Digipeater (digital repeater):** Aldığı paketi tekrar yayınlar — menzil genişler. Türkiye'de TA1, TA3, TA7'de aktif digipeater'lar var (Çamlıca, Uludağ, Beytepe...)
-   **iGate (internet gateway):** RF'ten aldığı paketi internet'e (APRS-IS sunucusu) basar; aprs.fi gibi sayfalar bu kaynak üzerinden yayın yapar

## Donanım — APRS'e nasıl başlanır?

### Yöntem 1: Hazır el cihazı (en kolay, pahalı)

| Cihaz | Yaklaşık fiyat | Özellik |
| --- | --- | --- |
| **Yaesu VX-8DR / VX-8GE** | $300-500 (ikinci el TR'de bulunur) | GPS + APRS dahili |
| **Kenwood TH-D74 / TH-D75** | $700-900 | En kapsamlı, D-STAR + APRS |
| **Anytone AT-D878UV II Plus** | $300-400 | DMR + APRS |

Avantaj: kabloya, ek cihaza, yazılıma gerek yok — aç, GPS sabitlensin, başlat.

### Yöntem 2: Modular setup (uygun fiyatlı)

```
[ Telsiz (UV-K5/UV-5R) ]──ses kablosu──[ TNC modem ]──USB──[ Bilgisayar / Raspberry Pi ]
                                              │
                                              └──── GPS (NMEA)
```

| Bileşen | Açıklama | Yaklaşık fiyat |
| --- | --- | --- |
| **Telsiz** | UV-K5, UV-5R, herhangi VHF FM telsiz | 700-1500 TL |
| **TNC modem** | Mobilinkd TNC4 (Bluetooth), DigiRig, KISS TNC | $80-150 |
| **GPS modülü** | u-blox NEO-6M veya NEO-8M USB | $15-30 |
| **Yazılım** | APRSdroid (Android), Pat (KISS), YAAC (Java), Direwolf (Linux/Pi) | ücretsiz |

Pi tabanlı kurulum ile çatıya kalıcı **iGate** kurabilirsiniz (Direwolf + APRX).

### Yöntem 3: APRSdroid (Android — iki modlu)

[APRSdroid](https://aprsdroid.org/) sadece "internet modu" değil — **iki farklı çalışma modu** var:

**TCP/IS modu (internet):** Telefonun internet bağlantısıyla APRS-IS sunucularına bağlanır. Telsiz gerek yok, konum + mesaj internet üzerinden haritalara düşer. Lisans gerekmez ama "gerçek RF APRS" değil.

**AFSK modu (telsiz entegrasyonu — asıl güç):** Telefonu ses kablosu veya Bluetooth arayüzü ile telsizine bağlarsın. APRSdroid veriyi ses tonlarına (beeping) çevirir, telsiz üzerinden 144.800 MHz'e RF olarak bırakır. **İnternetin olmadığı dağ başında bile** diğer istasyonlarla haberleşirsin — gerçek dijital telsiz operatörü gibi. Bu mod lisans gerektirir.

**Pratik:** AFSK modu için ucuz 3.5mm ses kablosu ($5) veya Bluetooth TNC (Mobilinkd, ~$120) yeter. POTA/SOTA aktivasyonunda telefon GPS + telsiz RF = tam APRS istasyonu.

## Çağrı işareti SSID

APRS'te çağrı işaretinin sonuna **SSID** (Secondary Station Identifier) eklenir: `TA1ABC-9` gibi. Standart SSID anlamları (Bob WB4APR'ın orijinal şeması):

| SSID | Kullanım |
| --- | --- |
| `-0` veya yok | Birincil (sabit ev) istasyon |
| `-1` | Mobil — birincil araç |
| `-2` | İkinci araç |
| `-7` | El cihazı |
| `-8` | Tekne |
| `-9` | Mobil (genel) |
| `-10` | İnternet only (telefon, web) |
| `-11` | Hava balonu / APRS uçuş |
| `-12` | Track-1 takip cihazı |
| `-15` | İGate / dijital |

(Detaylı liste: [APRS SSID standartları](http://www.aprs.org/aprs11/SSIDs.txt))

## aprs.fi kullanımı

[aprs.fi](https://aprs.fi) — Heikki Hannikainen (OH7LZB) tarafından geliştirilen, **dünyanın en popüler APRS web haritası**. Türkiye için:

1.  Üst arama kutusuna **çağrı işaretinizi** yazın (örn. `TA1ABC-9`) → konumunuzu görüntüler
2.  Harita modu (uydu, açık sokak, vs.) sağ üstten
3.  **"Other SSIDs"** ile aynı kullanıcının diğer cihazlarını görün
4.  **Tail (geçmiş izleri)** — son 24 saat / 7 gün / 30 gün arası gösterimi

Bedava ve open-source dataset; APRS-IS feed'i oluşturup kendi web sitenize de bağlayabilirsiniz.

## Mesajlaşma

APRS metin mesajları **67 karakter limiti** ile gönderilir. Telsiz/TNC menüsünden:

```
Hedef: TA1XYZ-7
Metin: "Test, beni duyuyor musun?"
```

Mesaj alıcının cihazına **birden fazla denemeyle** ulaşır (mesaj kaybolma toleransı). Hedef ack gönderdiğinde size onay döner.

**E-mail gateway:**

-   Mesajı `EMAIL` callsign'ına gönder, ilk satıra `email@example.com` yaz
-   Veya `WLNK-1` (WinLink gateway) ile e-posta entegrasyonu

## Hava durumu istasyonu (Wx)

Bir Davis Vantage Pro gibi hava durumu istasyonunu (veya DIY ESP32+BME280 sensörü) APRS'e bağlayabilirsiniz. APRS paketleri içinde özel format:

```
@190200z4012.34N/02858.12E_180/008g012t068r000p001P000h45b10142
```

Çözümlemesi:

-   Saat, koordinat
-   Rüzgar yönü/hızı/üfleyiş
-   Sıcaklık, yağış, nem, basınç

[aprs.fi/weather](https://aprs.fi/weather/) — global hava istasyonu haritası.

## Acil durum kullanımı

APRS'in en değerli kullanımı **şebeke çöktüğünde**. AFAD koordinasyonunda:

-   **Wx alerts:** Tornado, sel uyarıları APRS üzerinden yayılır
-   **Object spotting:** Bir yangın, deprem hasarı, yardım noktası işaretle (geçici APRS objesi)
-   **Bulletin:** Genel uyarı (acil çağrı, ekipman ihtiyacı)

ABD'de SKYWARN ağı (storm spotter) APRS üzerinden tornado'yu real-time raporlar. Türkiye'de **TRAC + AFAD** ortak çalışmaları artmakta.

## Yazılım listesi

| Yazılım | Platform | Açıklama |
| --- | --- | --- |
| **APRSdroid** | Android | En popüler mobil; GPS + telsiz arayüzü |
| **YAAC (Yet Another APRS Client)** | Java (her OS) | Tam donanımlı masaüstü |
| **Pat** | Win/Mac/Linux | KISS TNC desteği, basit |
| **Direwolf** | Linux/Pi | Yazılım TNC — sadece ses kartı + telsiz yeter |
| **APRX** | Linux/Pi | iGate / digipeater için |
| **PinPoint** | Windows | Tam masaüstü, harita entegrasyonu |
| **Xastir** | Linux | Klasik X11 client |

## Sık sorulan sorular

### "Lisans gerek mi?"

RF üzerinden yayın yaparsanız **evet** — APRS amatör bant frekansı (144.800 MHz). Ancak [aprs.fi](https://aprs.fi) üzerinden konum izleme, telefonla okuma, telefonla mesaj gönderme (APRS-IS only) **lisanssız** yapılabilir.

### "Ne kadar pil tüketir?"

Her TX paketi ~1-2 saniye sürer. 3 dakikada bir TX = 5W telsizinizi sürekli açık tutmaktan çok daha az.

### "Trafik sıkışıyor mu?"

Türkiye'de 144.800 nispeten boş; ABD'de 144.390 yoğun. Şehir merkezinde digipeater'lar arasındaki çakışma uzun yayın aralığı (5-10 dk) ile çözülür.

### "TX gücü ne olmalı?"

Mobilde 5W yeterli (digipeater ulaşır). Sabit istasyonda 25-50W kullanılabilir ama dengelidir; APRS RF spektrumu paylaşımlı, gereksiz güç başkalarını engeller.

## Yararlı kaynaklar

-   [aprs.fi](https://aprs.fi) — global APRS haritası
-   [aprsdroid.org](https://aprsdroid.org) — Android uygulama
-   [aprs.org](http://www.aprs.org) — Bob Bruninga'nın orijinal sitesi (tarihçe + spec)
-   [TRAC Eskişehir APRS rehberi](https://traceskisehir.org.tr/sayfa-aprs-nedIr-65.html)
-   [AKRAD APRS](https://www.akrad.org.tr/aprs-otomatik-veri-raporlama-sistemi/)
-   [ANTRAK Mobil APRS + Tinytrak](https://antrak.org.tr/genel/mobil-aprs-ve-tinytrak/)
-   [Direwolf yazılım TNC](https://github.com/wb2osz/direwolf) — açık kaynak

## Sıradaki adımlar

-   [UV-K5 Programlama](/tutorials/uv-k5-programlama) — APRS için TX kabiliyeti olan bir telsiz
-   [Çağrı İşareti Nasıl Alınır](/tutorials/cagri-isareti-nasil-alinir) — APRS RF için gerekli lisans
-   [J-Pole Anten](/tutorials/anten-yapimi-temel) — sabit APRS istasyonu için iyi anten

73, ve aprs.fi'de **TA1ABC-9 görüşürüz!**
