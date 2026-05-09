---
title: ISS ile Kontak — Astronotlara Selam Vermek
description: >-
  Uluslararası Uzay İstasyonu (ISS) ile amatör radyo kontağı — ARISS school
  contact, APRS digipeater (145.825 MHz), SSTV etkinlikleri, pas takibi, el
  telsizi ile ISS duyma.
keywords:
  - ISS
  - ARISS
  - uzay
  - astronot
  - APRS
  - SSTV
  - satellite
article_section: ISS
published_at: '2026-04-26'
updated_at: '2026-04-26'
faq:
  - q: Lisans gerek mi?
    a: >-
      - Dinleme (SSTV alıcı): hayır - TX (APRS via ISS): evet, en az C sınıfı
      (VHF yetkili)
  - q: En kolay ISS aktivitesi?
    a: >-
      APRS via ISS — setup 5 dakika, başarı oranı yüksek, telsiz + APRSdroid
      yeter.
  - q: ISS her zaman amatör radyo aktif mi?
    a: >-
      APRS digi ~%90 aktif. Voice + SSTV = sadece etkinlik sırası (yılda 4-6
      kez).
  - q: ISS'i gözle görebilir miyim?
    a: >-
      Evet! ISS parlak bir yıldız gibi gökyüzünde hareket eder. n2yo.com pas
      saatini verir. Çıplak gözle görülür.
  - q: ARISS school contact bedava mı?
    a: >-
      Evet — ARISS program ücretsiz. Sadece ekipman + sponsor operatör gerek.
      ---
---
**5W el telsizi + basit anten = uzaydaki astronotu duyma.** ISS (International Space Station) üzerinde amatör radyo ekipmanı var — APRS digi, SSTV yayını, hatta bazen canlı sesli kontak. Bu rehber ISS ile ne yapabilirsin + pratik adımlar.

## ISS'te amatör radyo

### Donanım

-   **Kenwood TM-D710GA** telsiz (Rus + US segmentinde)
-   VHF/UHF dual-band
-   APRS digipeater yazılımı
-   SSTV yazılımı (Rus operatörler)
-   Ericsson antenna dış yüzeyde

### Frekanslar

| Mod | Frekans | Yön |
| --- | --- | --- |
| **APRS digi** | **145.825 MHz** | Uplink + downlink (simplex) |
| **Sesli (voice)** | 145.800 MHz | Downlink |
| **SSTV** | 145.800 MHz | Downlink (etkinlik sırasında) |
| **Crossband repeater** | 145.990 up / 437.800 down | Nadiren aktif |

## 3 şey yapabilirsin

### 1\. APRS via ISS (en kolay)

ISS sürekli APRS digipeater olarak çalışır — senin GPS pozisyonunu ISS üzerinden dünyaya relay eder.

**Ekipman:**

-   VHF FM telsiz (Baofeng bile olur, 5W)
-   TNC yazılım (Direwolf) veya APRSdroid (Android)
-   GPS

**Adımlar:**

1.  ISS pas zamanı öğren ([n2yo.com](https://www.n2yo.com/?s=25544) veya Look4Sat app)
2.  Telsizi 145.825 MHz FM'e ayarla
3.  APRS packet gönder: path **ARISS** (normal path WIDE1-1 değil!)
4.  ISS overhead'dayken (8-12 dakika) paketini alır, relay eder
5.  [aprs.fi](https://aprs.fi/) sitesinde çağrı işaretini ara → "via ISS" görürsün

**Başarı oranı:** iyi pas (elevation 30°+) ile **%60-80** birinci denemede.

### 2\. SSTV dinleme (periodik)

Rus kozmonotlar yılda 4-6 kez **SSTV etkinliği** yapar — ISS'ten görüntüler dünyaya yayınlanır.

**Ekipman:**

-   VHF FM telsiz
-   Bilgisayar ses kart + MMSSTV (veya Robot36 Android app)

**Adımlar:**

1.  ARISS etkinlik takvimi takip et ([ariss.org](https://www.ariss.org/))
2.  145.800 MHz FM tune
3.  ISS pas'ında 8-12 dakika sinyal al
4.  MMSSTV/Robot36 ile decode → renkli görüntü
5.  Etkinlik sonrası ARISS'e rapor → **dijital diploma** al

**Ne alırsın:** NASA tasarım resimleri, kozmonot fotoğrafları, uzay manzaraları. Bir pas'ta 4-6 farklı görüntü gelir.

[SSTV detay →](/tutorials/sstv-yavas-taramali-tv)

### 3\. Sesli kontak (çok nadir)

Bazen astronotlar boş zamanlarında amatör radyoda CQ atar. **Çok nadir** ama raporlanmış.

Ayrıca **ARISS school contact** programı: okullar başvurur, astronot 10 dakika sınıfla konuşur. Türkiye'den de başvurulabilir.

## ISS pas takibi

### Pas nedir?

ISS yörüngede 90 dakikada bir tur atar. Senin üzerinden geçtiği 8-15 dakikalık periyot = **pas**.

### Türkiye üzerinden

-   Günde **4-6 görünür pas**
-   Her pas 8-15 dakika
-   Yüksek elevation (>30°) paslar daha başarılı

### Takip araçları

-   **[n2yo.com](https://www.n2yo.com/?s=25544)** — web tabanlı, canlı harita
-   **Look4Sat** (Android) — ücretsiz, alarm
-   **ISS Detector** (iOS/Android) — görsel geçiş tahmini
-   **Heavens-Above** — detaylı pas listesi + yıldız haritası

### Pas örneği

```
ISS — Pazar 27 Nisan 2026
Başlangıç: 19:42 UTC, güneybatı, EL 2°
Maksimum: 19:47 UTC, güneydoğu, EL 58°
Bitiş: 19:52 UTC, kuzeydoğu, EL 3°
Süre: 10 dakika
```

## Anten

### Minimum (el telsizi anteni)

Baofeng UV-5R stock anten ile ISS APRS **bazen** çalışır — yüksek pas (>50° elevation) gerekir.

### İyi (Nagoya NA-771)

Stock antenden 2-3x daha iyi. ISS APRS güvenilir.

### Mükemmel (el Yagi)

3-element 2m Yagi (DIY veya Arrow antenna) — ISS yönüne doğru tut, pas boyunca takip et. SSTV + voice için ideal.

### Pratik

El telsizi + Nagoya = **APRS via ISS için yeter**. SSTV dinleme için Yagi tercih ama gerekli değil.

## Doppler shift

ISS 7.5 km/s hızda → 145.800 MHz'de **±3.5 kHz Doppler kayma**:

-   ISS yaklaşırken: frekans +3 kHz yüksek (145.803)
-   ISS tam tepede: nominal (145.800)
-   ISS uzaklaşırken: frekans -3 kHz düşük (145.797)

**FM modunda** telsiz Doppler'ı tolere eder (FM deviation ±5 kHz > Doppler ±3.5 kHz). Manuel ayar genelde gerek yok.

## ARISS school contact

### Program

ARISS (Amateur Radio on the International Space Station) = NASA + ARRL + uzay ajansları ortaklığı. Okullar başvurur, seçilirse astronotla 10 dakika **canlı soru-cevap** yapar.

### Türkiye'den başvuru

1.  Okul (ilkokul-lise) ARISS web formunu doldurur
2.  Amatör radyo sponsor istasyonu (lisanslı operatör) gerekir
3.  ARISS değerlendirme (6-18 ay bekleme)
4.  Onay → tarih belirleme → ISS'teki astronotla canlı bağlantı
5.  **Hayat değiştiren deneyim** — çocuklar uzayla konuşuyor

### Geçmiş Türkiye kontakları

-   2016: Ankara'dan okul ARISS kontağı (TA2 bölgesi)
-   2023: İstanbul lise ARISS başvurusu (bekleme)

### Gereken ekipman

-   VHF telsiz (50W+ önerilen)
-   Yagi anten (tracking mümkünse)
-   Ses sistemi (sınıfa duyurmak için)
-   İnternet backup (eğer RF başarısız olursa)

## ISS crew amatör çağrı işaretleri

Bazı astronot/kozmonotlar lisanslı amatör:

-   **NA1SS** — ISS resmi çağrı işareti
-   **RS0ISS** — Rus segment çağrısı
-   Astronotların kişisel çağrıları da var (örn. KC5ZTH = Chris Cassidy)

## El telsizi ile ISS duyma (pratik)

### 5 dakikada ISS dinle

1.  n2yo.com'dan bugünkü pas saatini bul
2.  Baofeng'i 145.800 MHz FM'e ayarla
3.  Squelch'i en düşüğe çek
4.  Pas başlangıcında dışarı çık, anteni gökyüzüne tut
5.  ISS overhead'dayken **APRS "bip-bip" sesleri** veya SSTV "vırt" sesleri duyarsın

Bu deneyim — uzaydan gelen sinyal! — çoğu yeni operatörü **kalıcı olarak** hobiye bağlar.

## Sık sorulan sorular

### Lisans gerek mi?

-   **Dinleme** (SSTV alıcı): hayır
-   **TX** (APRS via ISS): evet, en az C sınıfı (VHF yetkili)

### En kolay ISS aktivitesi?

**APRS via ISS** — setup 5 dakika, başarı oranı yüksek, telsiz + APRSdroid yeter.

### ISS her zaman amatör radyo aktif mi?

APRS digi ~%90 aktif. Voice + SSTV = sadece etkinlik sırası (yılda 4-6 kez).

### ISS'i gözle görebilir miyim?

Evet! ISS parlak bir yıldız gibi gökyüzünde hareket eder. n2yo.com pas saatini verir. Çıplak gözle görülür.

### ARISS school contact bedava mı?

Evet — ARISS program ücretsiz. Sadece ekipman + sponsor operatör gerek.

* * *

## İlgili kaynaklar

-   [Satellite haberleşme LEO/AMSAT](/tutorials/satellite-haberlesme-leo-amsat)
-   [APRS](/tutorials/aprs-nedir-nasil-kullanilir) — ISS APRS detay
-   [SSTV yavaş taramalı TV](/tutorials/sstv-yavas-taramali-tv) — ISS SSTV decode
-   [Çocuk amatör topluluğu](/tutorials/cocuk-amator-radyo-topluluk) — school contact
-   ARISS: [ariss.org](https://www.ariss.org/)
-   ISS tracking: [n2yo.com](https://www.n2yo.com/?s=25544)
-   **Genişletilmiş kaynak:** [telsizcilik.com](https://telsizcilik.com/) — ISS makaleleri
