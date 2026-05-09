---
title: 'Amatör Telsiz Rölesi Nedir? Nasıl Çalışır, Nasıl Kullanılır?'
description: >-
  Amatör telsiz röleleri ne işe yarar, simplex/duplex farkı, CTCSS/DCS
  kullanımı, TR bölgeleri, röle protokolleri ve sık sorunlar — yeni başlayanlar
  için kapsamlı rehber.
keywords:
  - röle
  - temel
  - başlangıç
  - vhf
  - uhf
  - simplex
  - duplex
article_section: röle
published_at: '2026-04-25'
updated_at: '2026-04-25'
---
## Röle nedir, ne işe yarar?

Amatör telsiz rölesi (İngilizce _repeater_), sınırlı menzile sahip portatif veya araç telsizlerinin etkili kapsama alanını genişletmek için **yüksek bir noktaya** (tepe, bina çatısı, kule, dağ zirvesi) yerleştirilmiş **otomatik bir tekrarlayıcı**dır. Mantık çok basit:

1.  Röle bir frekansı (input/RX) sürekli dinler
2.  Sinyal aldığında, ikinci bir frekansta (output/TX) **aynı anda** yeniden yayınlar
3.  Yer seviyesindeki düşük güçlü iki istasyon, röle aracılığıyla birbirini duyar

### Tipik bir senaryo

5 W çıkışlı bir UV-K5 el telsizi düz arazide ~3-5 km menzilliği verir; engebeli alanda 1-2 km. Aynı el telsizi, **iyi konumlanmış bir röle**'nin coverage'ı içine girdiğinde, 50-100 km öteye konuşmanızı sağlar:

```
                    ┌─────────────┐
                    │   Röle      │  (rakım 1500 m)
                    │  TA1RX      │
                    └──────┬──────┘
                           │
              dinler 145.000  ───►   yayınlar 145.600
                  ▲                          │
                  │                          │
                  │                          ▼
        ┌─────────┴──────┐         ┌─────────────────┐
        │ Operator A     │         │  Operator B     │
        │  (TA1ABC)      │         │   (TA1DEF)      │
        │  uydu valley   │         │  şehir merkez   │
        └────────────────┘         └─────────────────┘
        Yayınlar 145.000           Dinler 145.600
        Dinler 145.600             Yayınlar 145.000
```

İki operatör birbirini doğrudan duymasa bile röle aracılığıyla net konuşabilir.

## Hangi bantta çalışır?

Türkiye'de aktif amatör röleler **iki temel bantta** dağılmıştır:

### VHF (144-146 MHz) — 2 metre

-   En yaygın amatör bant
-   Uzun menzil potansiyeli (yer seviyesinde dağ ardı), bina içine girer
-   Çoğu el telsizi destekler
-   Klasik shift: **−600 kHz** (örn. röle çıkışı 145.600 → telsiz TX 145.000)

### UHF (430-440 MHz) — 70 cm

-   Şehir içi, yapı içi, ofis kullanımına daha uygun
-   Daha kısa dalga = daha kompakt anten
-   Bina içi, otopark, alt geçit tarzı ortamlarda VHF'den iyi
-   Klasik shift: **−7.6 MHz** veya bölgeye göre **+1.6 MHz**

Bazı röleler **DMR, DSTAR, C4FM** dijital modlar destekler. Mevcut analog telsizinizle dijital röleyi açamazsınız; ayrı dijital telsiz veya hotspot gerekir.

## Simplex vs Duplex — temel ayrım

Telsizler iki temel modda çalışır. Bu **röle kullanımının temelidir**, anlamadan ilerlemek hata kaynağıdır.

### Simplex

-   **Aynı frekansta hem dinlenir hem konuşulur**
-   İki telsiz birbirine doğrudan, aracısız iletişim kurar
-   Avantaj: röle çakışmasından bağımsız, basit
-   Dezavantaj: menzil → ekipmanın görüş hattı menzili kadar
-   Tipik 2m simplex frekansı: 145.500 MHz (ulusal calling), 145.300, 144.900

### Duplex (rölelerde standart)

-   **İki farklı frekans** kullanılır:
    -   Telsiziniz **TX** olarak rölenin **input**'unu (rölenin RX'i) çağırır
    -   **RX** olarak rölenin **output**'unu (rölenin TX'i) dinler
-   Aradaki fark **shift** veya **offset** olarak adlandırılır

#### Shift örneği

| Bilgi | Değer |
| --- | --- |
| Röle output (RX) | 145.600 MHz |
| Shift | −600 kHz |
| Telsiz TX (input) | 145.000 MHz |

Telsizinize bu kanalı programlarken: **RX = 145.600**, **TX = 145.000** (veya **shift = −0.6 MHz**).

#### Yanlış shift senaryoları

-   **Pozitif shift (+0.6) kullandın → röleyi açamazsın**, kendi telsizinize seslenmiş olursun.
-   **Shift ihmal edildi (=0)** → simplex modunda yayın → röle alıcısı boştur, kimse duymaz.
-   **Yanlış yönlü shift (UHF için +1.6 yerine −7.6)** → çok yaygın hata, üreticiye/bölgeye göre değişir.

## CTCSS / DCS — gizli giriş şifresi

Çoğu röle **alıcı açma korumasıyla** donatılmıştır. Sebep: röle alıcısı sürekli açık olsa, atmosferik gürültüyü, yan kanaldan gelen yabancı istasyonu, hatta televizyon parazitini bile yayınlamaya başlar. Çözüm: **alt-ses tonu (sub-audible tone)**.

### CTCSS (Continuous Tone-Coded Squelch System)

-   Yayın sırasında sinyalin **altında** çok düşük frekanslı (67-254 Hz) sürekli bir ton gönderilir
-   Insan kulağı bu tonu duymaz (filtreyle kesilir)
-   Röle bu tonu duymazsa yayını **tekrarlamaz**
-   En yaygın TR tonları: **77.0, 88.5, 100.0, 123.0, 127.3 Hz**

### DCS (Digital Coded Squelch)

-   Aynı amaç, ama 23-bit dijital kod (134.4 bps)
-   Daha fazla kombinasyon (~104), daha az parazit
-   Format: 3-haneli oktal (D023, D047, D754, ...)
-   TR'de daha az yaygın

### Telsizinize nasıl girilir?

UV-K5 / CHIRP'te:

-   **Tone Mode**: `Tone` (sadece TX'de CTCSS gönder)
-   **Tone (rTone)**: rölenin istediği frekans (örn. 100.0)
-   **Tone Squelch (cTone)**: genelde **boş bırakılır** — röle çıkışı CTCSS göndermeyebilir

Detay: [CTCSS / DCS Tonları Açıklaması](/tutorials/ctcss-dcs-nedir)

## Röleyi nasıl kullanırım? (etiket + protokol)

Röleler **paylaşımlı topluluk kaynağı**dır. Birkaç dakikalık QSO için onlarca operatör sıraya girebilir. Etik ve verimli kullanım için:

### 1\. Programlayın

Telsizinize:

-   RX frekansı (rölenin output'u)
-   TX shift (yön + miktar)
-   CTCSS tonu (TX)
-   Tone Mode = Tone

CSV ile [amator.tr/role-export/](/role-export/) → cihaza özel hazır profil.

### 2\. Dinleyin (önce)

Yayına başlamadan **30 saniye** dinleyin:

-   Başka bir QSO devam ediyorsa **kesmeyin** — yer açın
-   Acil çağrı varsa duyun
-   Röle "kuyruğu" (yayın sonrası kısa açıklık) içinde girmeyin

### 3\. Çağrı yapın

**Kibarca, kısa, çağrı işaretinizle:**

> _"TA1ABC, dinliyor."_

veya QSO başlatmak için:

> _"TA1ABC, \[röle adı\] üzerinden test, cevap verir misiniz?"_

veya

> _"CQ, TA1ABC, monitör yapıyor."_

(CQ = "anyone listening?" anlamında.)

### 4\. Konuşma sırası

-   Konuşma → PTT bırak → 1-2 saniye bekle, sonra cevap için yer ver
-   Acil çağrılara öncelik (uzun monolog yapmayın)
-   Röle "timeout" özelliğine sahip (~3 dk sonra otomatik keser) — uzun konuşmadan kaçının
-   Her **10 dakikada en az 1 kez** çağrı işaretinizi tekrarlayın (yasal zorunluluk)

### 5\. Çıkış

> _"TA1ABC, kapatıyor"_ (artık dinlemiyorum)

veya

> _"TA1ABC, monitör"_ (dinlemeye devam ediyorum, başka çağrılara açık)

## Ulusal/uluslararası protokol kelimeler

Sık duyacağınız kısaltmalar:

| Kısaltma | Anlam |
| --- | --- |
| **CQ** | "Çağrı yapıyorum, kim cevap verir?" (kontestlerde sık) |
| **QSO** | "İletişim/kontak" |
| **QRZ?** | "Kim çağırdı, beni mi?" |
| **QTH** | "Konum bilgim" (örn. _"My QTH is Istanbul Kadikoy"_) |
| **QRM** | "İnsan kaynaklı parazit" |
| **QRN** | "Atmosferik parazit" |
| **QSL** | "Aldım, anladım" / kontak doğrulama kartı |
| **73** | "İyi dilekler" (kapanış) — rakam tek formda kullanılır, "73's" yanlış |
| **88** | "Sevgiler" (kapanış, genelde kadın operatörlere veya yakın arkadaşlara) |
| **PSE** | "Lütfen" |
| **TKS / TNX** | "Teşekkürler" |

## Türkiye'de röle dağılımı

Türkiye **TA bölgelerine** göre coğrafi olarak organize edilmiştir. Her bölgede onlarca aktif röle:

| Bölge | Coğrafi alan | Örnek röle frekansları |
| --- | --- | --- |
| TA1 | Marmara | 145.625 (İstanbul Çamlıca), 145.700 (Bursa Uludağ) |
| TA2 | Akdeniz | 145.625 (Antalya), 438.500 (Mersin) |
| TA3 | Ege | 145.700 (İzmir), 145.787 (Aydın) |
| TA4 | Karadeniz | 145.6125 (Trabzon), 145.687 (Samsun) |
| TA5 | Doğu Anadolu | 145.600 (Erzurum), 145.700 (Van) |
| TA6 | Güneydoğu | 145.600 (Diyarbakır), 145.700 (Şanlıurfa) |
| TA7 | İç Anadolu | 145.625 (Ankara Beytepe), 145.687 (Konya) |

(Dinamik liste için [amator.tr/role-export/](/role-export/) kullanın — günlük güncellenen veritabanı.)

## Tipik sorunlar ve çözümleri

| Belirti | Olası sebep | Çözüm |
| --- | --- | --- |
| Röle bana cevap vermiyor | CTCSS tonu yanlış / OFF | Tone Mode = Tone, doğru frekans gir |
| Röleyi açıyorum ama duymuyorlar | TX gücü zayıf, anten kötü | 5W'a çıkar, daha yüksek anten |
| Çift sinyal duyuyorum | İki röle aynı frekansta çakışıyor | CTCSS Tone Squelch ekle, sadece istediğin röleyi duyarsın |
| Sürekli "açık-kapalı" beep | Röle "open mode" (CTCSS yok) | Senin sorun değil, başka operatörler tetikliyor |
| Sinyal var ama bozuk ses | Multipath, doppler | Antenin konumunu değiştir, mobil ise dur ve test et |
| Röle kendi kendine açılıyor | Birisi DTMF gönderiyor | Senin sorun değil, normal |
| 3 dakikada kesiyor | Röle timeout | Daha kısa konuş, PTT bırak ve devam et |

## Röle etkinlikleri ve net'ler

Çoğu bölgede haftalık **net** (planlı yayın) düzenlenir:

-   Pazartesi 21:00 — TA1 bölge net (Marmara)
-   Salı 21:00 — TA3 net (Ege)
-   vb.

Net'ler:

-   Yeni operatörler için tanışma
-   Acil iletişim hazırlığı (CONELRAD, AFAD koordinasyonu)
-   Bölge teknik tartışması

Yerel kulübünüzün sosyal medyasını / web sitesini takip edin (TRAC şubesi, AKRAD, DARD vb.).

## Sıradaki adım

Pratik için:

-   [Quansheng UV-K5 Programlama Rehberi](/tutorials/uv-k5-programlama) — F4HWN firmware ile röle CSV yükle
-   [CTCSS / DCS Tonları Detaylı](/tutorials/ctcss-dcs-nedir) — TX vs RX ton, sık hatalar
-   [Türkiye'de Çağrı İşareti Nasıl Alınır?](/tutorials/cagri-isareti-nasil-alinir) — yasal yayın için lisans
-   [J-Pole / Slim Jim Anten Yapımı](/tutorials/anten-yapimi-temel) — el telsiziyle röle menzilini 2-3× büyütme

İlk röle QSO'nuz için **bol şans, 73!**
