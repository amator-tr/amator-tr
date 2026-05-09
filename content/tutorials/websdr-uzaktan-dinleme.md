---
title: WebSDR — Tarayıcıdan Dünyayı Dinle ve Sinyalini Test Et
description: >-
  WebSDR nedir, nasıl kullanılır. University of Twente, KiwiSDR ağı. Kendi
  sinyalini uzaktan test etme, propagasyon analizi, CW pratik, lisanssız
  dinleme.
keywords:
  - WebSDR
  - dinleme
  - propagasyon
  - SDR
  - başlangıç
article_section: WebSDR
published_at: '2026-04-26'
updated_at: '2026-04-26'
faq:
  - q: Lisans gerek mi?
    a: 'Hayır — WebSDR sadece dinleme, TX yok. Herkes kullanabilir.'
  - q: En iyi WebSDR hangisi?
    a: >-
      University of Twente (Hollanda) — en kapsamlı, en temiz sinyal. KiwiSDR
      ağı bölgesel derinlik.
  - q: Mobile'de çalışır mı?
    a: >-
      Çoğu WebSDR tarayıcı tabanlı — iOS/Android tarayıcıda çalışır ama touch
      waterfall zorlu.
  - q: WebSDR ile contest dinlenebilir mi?
    a: 'Evet — CQ WW hafta sonunda Twente''de 14.200 dinle, pile-up''ları canlı duy.'
  - q: Türkiye'de WebSDR var mı?
    a: Birkaç KiwiSDR var — sdr.hu haritasında Türkiye'yi aç. Sayı artıyor. ---
---
Fiziksel anten yok, telsiz yok — sadece tarayıcı. Hollanda'daki profesyonel antene bağlanıp **İstanbul'dan Japonya'nın HF sinyallerini dinliyorsun**. Veya kendi vericinin sinyalini 2000 km ötedeki alıcıdan kontrol ediyorsun. **WebSDR** = internet üzerinden uzak SDR alıcısına bağlanma. Bu rehber ne işe yarar + pratik kullanım.

## WebSDR nedir?

Bir sunucuya bağlı SDR donanımının internet üzerinden erişime açılması. Herkes aynı anda bağımsız olarak farklı frekansta dinleyebilir — eşzamanlı yüzlerce kullanıcı, her biri kendi frekansını seçer.

### Donanım altyapısı

-   Profesyonel antenler (Mini-Whip, büyük loop, dipole)
-   Yüksek hassasiyetli SDR alıcı
-   Genelde **RF kirliliğinin olmadığı kırsal** lokasyonlara kurulmuş
-   İnternet sunucu + web arayüzü

### Kullanıcı tarafı

-   Tarayıcı aç (Chrome, Firefox)
-   URL'ye git
-   Waterfall display + frekans seç + mod seç (USB/LSB/AM/CW/FM)
-   **Ücretsiz, kayıt yok, lisans gerekmez**

## Neden WebSDR kullanılır?

### 1\. Kendi sinyalini test etme

Anten yaptın, acaba sesin Avrupa'ya gidiyor mu? Hollanda'daki WebSDR'ye bağlan, kendi frekansına tune et, TX yap — oradan seni duyarsan propagasyon var ve antenin çalışıyor.

### 2\. Propagasyon analizi

Dünyanın farklı noktalarındaki alıcılara bakarak hangi bandın hangi bölgeye açık olduğunu **canlı** gör. 20m'de Japonya açık mı? Tokyo WebSDR'ye bağlan, 14.200 USB dinle.

### 3\. CW / dijital mod pratik

Mors öğreniyorsun — tertemiz bir sinyal üzerinden pratik yap. Kendi telsizindeki gürültü yok, WebSDR'deki profesyonel anten zayıf sinyalleri bile net yakalar.

### 4\. Lisanssız dinleme (SWL)

Lisansın yok — [SWL tutorialımız](/tutorials/swl-dinleyici-disiplini). WebSDR ile HF/VHF dinleme hiçbir ekipman gerektirmez.

### 5\. Bant keşfi

Hangi bantlarda ne dinlenir? WebSDR waterfall'ında **görsel olarak** bant aktivitesini gör — SSB konuşmalar, CW sinyalleri, FT8 çizgileri, broadcast istasyonları.

## En önemli WebSDR istasyonları

### University of Twente (Hollanda) — "kutsal toprak"

-   [websdr.ewi.utwente.nl](http://websdr.ewi.utwente.nl:8901/)
-   Dünyanın en ünlü WebSDR'si
-   0-29 MHz tam HF kapsama
-   Mükemmel anten + düşük gürültü
-   Türkiye'den HF sinyalleri net duyulur

### KiwiSDR ağı

-   [rx.linkfanel.net](http://rx.linkfanel.net/) — dünya çapında 600+ KiwiSDR
-   Her biri 0-30 MHz
-   Farklı ülkelerde farklı propagasyon perspektifi
-   Türkiye'de de birkaç KiwiSDR var

### SDR.hu

-   [sdr.hu](https://sdr.hu/) — KiwiSDR listesi haritada
-   Haritadan istasyon seç, tarayıcıda aç

### QO-100 WebSDR

-   [websdr.eshail.batc.org.uk](https://websdr.eshail.batc.org.uk/)
-   Geosynkron uydu downlink dinleme (10 GHz)
-   Uplink yapmadan QO-100 SSB/CW trafiğini duy

### Specific bölgesel

-   **Japonya (JA)**: kısa dalga DX testi
-   **ABD (W/K)**: propagasyon Atlantik geçişi kontrol
-   **Avustralya (VK)**: en uzun yol testi

## Pratik: kendi sinyalini test et

### Senaryo

İstanbul'dan 20m bandında (14.250 USB) CQ atıyorsun. Avrupa'ya ulaşıyor musun?

### Adım adım

1.  Hollanda WebSDR'yi aç (Twente)
2.  Frekansı **14.250 MHz** USB'ye tune et
3.  Telsizinden TX yap: "CQ test TB3KKD"
4.  WebSDR'de sesini duy → **propagasyon OK, anten çalışıyor**
5.  Duymuyorsan → propagasyon yok veya anten sorunu

### İleri test

-   Aynı anda 3-4 farklı ülkenin WebSDR'sine bağlan
-   Hangisi seni duyuyor, hangisi duymuyor?
-   Propagasyon yön analizi

## WebSDR waterfall okuma

Waterfall display = frekans (x) × zaman (y) × sinyal gücü (renk):

### Sinyal tipleri

-   **SSB konuşma**: geniş, düzensiz, 2-3 kHz bant
-   **CW (mors)**: ince çizgi, ritmik kesik
-   **FT8**: 15 saniyede bir tekrarlayan ince paralel çizgiler (50 Hz arası)
-   **AM broadcast**: geniş, sürekli, 9-10 kHz
-   **Noise / RFI**: broadband, düzensiz, sürekli

### Pratik

WebSDR waterfall'ına bakarak "şu an 20m açık mı" anlarsın — aktif çizgiler = açık bant, boş display = kapalı.

## WebSDR vs RTL-SDR

|  | WebSDR | RTL-SDR |
| --- | --- | --- |
| Ekipman | Sadece tarayıcı | $30 USB dongle + anten |
| Konum | Uzak istasyon (Hollanda vs) | Senin evinde |
| Gürültü | Düşük (kırsal profesyonel) | Yüksek (şehir evi) |
| TX test | Uzaktan seni dinle | Yerel dinle (yardımcı değil) |
| Maliyet | Ücretsiz | $30+ |
| İnternet | Zorunlu | Gerek yok |

**İkisi complement**: WebSDR uzak propagasyon testi, RTL-SDR yerel dinleme.

## WebSDR sınırlamaları

### Gecikme (latency)

İnternet üzerinden 1-3 saniye gecikme — gerçek zamanlı kontak koordinasyonu zor.

### Bant genişliği

Yüksek kullanıcı yoğunluğunda ses kalitesi düşebilir.

### TX yok

WebSDR sadece **alıcı** — TX yapılamaz (lisans konusu değil, teknik kısıt).

### Availability

Popüler WebSDR'ler (Twente) bazen dolu — eşzamanlı kullanıcı limiti var.

## KiwiSDR kurma (ileri seviye)

Kendi WebSDR istasyonunu kur:

-   **KiwiSDR board** ($300) + BeagleBone Green
-   HF anten (Mini-Whip veya dipole)
-   İnternet bağlantı
-   sdr.hu'ya kayıt → dünya haritasında görünür
-   Topluluk katkısı — senin dinleme istasyonun dünyaya açık

## Sık sorulan sorular

### Lisans gerek mi?

**Hayır** — WebSDR sadece dinleme, TX yok. Herkes kullanabilir.

### En iyi WebSDR hangisi?

**University of Twente** (Hollanda) — en kapsamlı, en temiz sinyal. KiwiSDR ağı bölgesel derinlik.

### Mobile'de çalışır mı?

Çoğu WebSDR tarayıcı tabanlı — iOS/Android tarayıcıda çalışır ama touch waterfall zorlu.

### WebSDR ile contest dinlenebilir mi?

Evet — CQ WW hafta sonunda Twente'de 14.200 dinle, pile-up'ları canlı duy.

### Türkiye'de WebSDR var mı?

Birkaç KiwiSDR var — sdr.hu haritasında Türkiye'yi aç. Sayı artıyor.

* * *

## İlgili kaynaklar

-   [RTL-SDR ile telsiz dinleme](/tutorials/rtl-sdr-ile-telsiz-dinleme) — yerel SDR
-   [SDR yazılım tabanlı telsiz](/tutorials/sdr-yazilim-tabanli-telsiz) — genel SDR
-   [SWL dinleyici disiplini](/tutorials/swl-dinleyici-disiplini) — lisanssız dinleme
-   [HF propagasyon temelleri](/tutorials/hf-propagasyon-temelleri)
-   [HF propagasyon canlı durum](/araclar/propagasyon-durumu/)
-   [Mors kodu öğrenme](/tutorials/mors-kodu-ogrenme) — CW pratik
-   University of Twente: [websdr.ewi.utwente.nl](http://websdr.ewi.utwente.nl:8901/)
-   KiwiSDR haritası: [sdr.hu](https://sdr.hu/)
-   **Genişletilmiş kaynak:** [telsizcilik.com](https://telsizcilik.com/) — WebSDR makaleleri
