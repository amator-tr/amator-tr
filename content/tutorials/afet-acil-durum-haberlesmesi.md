---
title: Afet ve Acil Durum Haberleşmesi (EmComm) — Amatör Radyonun En Kritik Görevi
description: >-
  Deprem / sel / orman yangını gibi afetlerde amatör telsiz iletişimi. AFAD-TRAC
  protokolü, NVIS, WinLink, APRS, hazırlık çantası, tactical callsign, frekans
  planları.
keywords:
  - afet
  - EmComm
  - acil iletişim
  - AFAD
  - TRAC
  - NVIS
article_section: afet
published_at: '2026-04-26'
updated_at: '2026-04-26'
faq:
  - q: 'Lisansım yok, afette telsiz kullanabilir miyim?'
    a: >-
      Acil yaşam tehlikesinde evet — uluslararası kural, herhangi biri "MAYDAY"
      söyleyip yardım çağırabilir. Ama lisanslı operatör daha verimli — frekans
      bilir, mod bilir, protokol bilir. Lisans almak 2-3 ay zaman alır, sınav 3
      ayda bir.
  - q: Cep telefonu varken neden zahmet?
    a: >-
      Marmara depremi 7 saat, Maraş depremi 12-24 saat baz istasyonu çalışmadı.
      Ham radio o sırada çalışıyor. Sigorta gibi düşün.
  - q: En önemli tek ekipman?
    a: >-
      Bir tane Baofeng UV-5R + iyi anten + dolu bir batarya. 600 TL'lik ekipman
      5W ile 30-50 km menzil — yeter.
  - q: TRAC üye olmak şart mı?
    a: >-
      Hayır ama çok faydalı. Üyelik ücreti yıllık ~150 TL. Net toplantılar,
      eğitim, AFAD kayıtlı gönüllü statüsü için.
  - q: Mors bilmem şart mı?
    a: >-
      Hayır, FT8 ve sesli (SSB/FM) yeterli. CW eski okul ama avantajı: en zayıf
      sinyal koşullarında bile geçer. İleri seviye operatör hedefi varsa öğren.
      ---
---
Telefon kapanır. İnternet çöker. Baz istasyonları yanar. **Amatör telsiz hâlâ çalışır.** 1999 Marmara depremi, 2011 Van, 2023 Kahramanmaraş — her büyük afette ham radio operatörleri AFAD koordinasyonunda iletişim hattı oldu. Bu rehber EmComm (Emergency Communications) felsefesi + Türkiye protokolü + pratik hazırlık.

## Neden ham radio kritik?

Modern iletişim altyapısı bağımlı:

-   **Cep şebekesi** → baz istasyonu + fiber omurga
-   **İnternet** → ISP altyapısı + denizaltı kabloları
-   **Sabit hat** → switching merkezi + bakır/fiber

Afette bu üçü de aynı anda çöker (deprem) veya kapasiteyi aşar (kongesti). Amatör radyo:

-   **Bağımsız altyapı** — operatörün kendi ekipmanı
-   **HF iyonosfer** = atmosferdeki "doğal repeater" — 200-500 km menzil tek hop ile
-   **Düşük güç ihtiyacı** — 5W bile yeter, batarya/güneş paneli ile sürdürülebilir
-   **Operatör ağı** — Türkiye'de TRAC + bireysel ~10K aktif operatör

## AFAD-TRAC protokolü

**AFAD** (Afet ve Acil Durum Yönetimi Başkanlığı) ile **TRAC** (Türkiye Radyo Amatörleri Cemiyeti) arasında koordinasyon protokolü var:

-   TRAC eğitilmiş gönüllü operatörleri AFAD koordinasyon merkezine kaynak olarak sağlar
-   Önceden tanımlanmış **acil iletişim frekansları** kullanılır
-   Tactical callsign sistemi (görev tabanlı geçici çağrı işareti)
-   Haftalık/aylık [net](#net-toplantilari) toplantılarıyla pratik

Her afet sonrasında AFAD ham operatör desteği talep eder. Eğer TRAC üyesiysen veya yerel bir derneğe bağlıysan, kayıtlı gönüllü olarak çağrılabilirsin.

## EmComm temel frekansları (Türkiye)

| Bant | Frekans | Mod | Kullanım |
| --- | --- | --- | --- |
| **2m** | **145.500 MHz** | FM | Ulusal çağrı/acil simplex |
| **2m** | **145.300 MHz** | FM | EmComm secondary |
| **70cm** | **433.500 MHz** | FM | Yerel şehir içi acil |
| **APRS** | **144.800 MHz** | FSK | GPS pozisyon + mesaj |
| **40m HF** | **7.080 MHz** | LSB | Bölgesel/uluslararası gündüz |
| **80m HF** | **3.760 MHz** | LSB | Yakın menzil gece (NVIS) |
| **20m HF** | **14.300 MHz** | USB | Uluslararası DX yardım |
| **Maritime** | **156.800 MHz** | FM | VHF Channel 16 — uluslararası deniz acil |

Aktivasyon sırasında bu frekanslarda **yapılandırılmış net** çalışır — Net Control operatörü trafiği yönetir.

### Simpleks kullanım protokolü (kritik)

Afet anında rölelerin hasar gördüğünü veya enerjisinin bittiğini **varsayın** — simpleks (telsizden telsize doğrudan) tek yol olabilir.

-   **145.500 MHz** ulusal çağrı: herkesle ilk irtibat buradan. Ama kontak kurduktan sonra **hemen yan kanala geç** (145.525, 145.550 vs) — çağrı frekansını meşgul etme, diğer çağrılar engellenir.
-   **433.500 MHz UHF**: beton binalarda, enkaz arasında UHF sinyali VHF'ye göre **daha iyi nüfuz eder** — bina içi / yakın mesafe kurtarma operasyonlarında bu frekans öncelik olmalı.
-   **Squelch en düşüğe:** zayıf sinyalleri kaçırmamak için telsizinizin squelch eşiğini minimum seviyeye çekin. Gürültülü ama hayat kurtarıcı sinyaller duyulabilir hale gelir.

## NVIS — yakın menzil HF mucizesi

Standard HF düşük açılı yayma yapar (uzun mesafe, ufuk yönlü). **NVIS** = **N**ear **V**ertical **I**ncidence **S**kywave: dik yukarı yayma → iyonosferden yansıma → 50-500 km dairesinde iniş.

Özellikleri:

-   **Ölü bölge yok** — 0-500 km arasında kesintisiz iletişim
-   VHF röleler kapsayamayan dağlık bölgelere ulaşır
-   Anten **çok alçak** (yerden 0.1-0.2λ, yani 80m'de sadece 4-8m yükseklikte!)
-   Dipole'u alçak takın → otomatik NVIS — basit

İdeal afet anteni: **80m yatay dipole**, 2-5m yükseklikte gerilen tel. [Detaylı NVIS tutorial →](/tutorials/nvis-haberlesmesi)

## Dijital EmComm araçları

### WinLink (radyodan e-posta)

İnternet kesilse bile **e-mail göndermek/almak** mümkün:

-   Operatör HF veya VHF üzerinden WinLink gateway istasyonuna bağlanır
-   Gateway internet üzerinden e-postayı yönlendirir
-   **VARA modem** = WinLink'in kalbi. Yazılımsal modem olarak sinyali paketler, inanılmaz hızda gönderir (VARA HF + VARA FM)
-   **ICS-213 formları** WinLink içinde gömülü — AFAD/Kızılay standart raporlama formatlarına tam uyumlu. Koordinat, hasar raporu, kaynak talebi hazır şablon
-   [WinLink tutorial →](/tutorials/winlink-email-over-radio)

### NBEMS (Narrow Band Emergency Messaging)

Sesli haberleşme hızlı ama koordinasyon için listeler, koordinatlar, resmi dökümanlar gerekir — bunları sesle okumak hata riski. **NBEMS** = dar bant acil mesajlaşma, **veri odaklı** (data-centric):

-   **fldigi** yazılımı üzerinden çalışır
-   Düşük güçle metin + form gönderme
-   WinLink'e alternatif — gateway gerek yok, peer-to-peer

### APRS (pozisyon + mesaj)

-   GPS koordinatı + 67 karakter mesaj
-   144.800 MHz (Türkiye)
-   Arama-kurtarma ekiplerinin pozisyonu canlı haritada
-   aprs.fi web takibi
-   [APRS tutorial →](/tutorials/aprs-nedir-nasil-kullanilir)

### FT8 (weak-signal text)

-   \-25 dB SNR'ye kadar decode → çok zayıf koşullarda çalışır
-   50 Hz bantgenişliği → minimal güç + minimal interferans
-   Kısa mesajlar ama "hayatta mıyım" sinyali olarak yeter

### EchoLink / Allstar (VoIP gateway)

-   İnternet varsa → her yerden lokal röle ile konuşma
-   İnternet kalkarsa kullanılamaz, ama hibrit afet senaryolarında değerli

## Tactical callsign sistemi

Afet operasyonunda görev tabanlı geçici çağrı:

-   "Net Control 1" — net yöneticisi
-   "Triage Hospital" — hastane irtibat
-   "Logistics" — malzeme ekibi
-   "Search Team Alpha" — arama-kurtarma

Lisans çağrı işareti **her döngünün sonunda + 10 dakikada bir** söylenir (yönetmelik).

Örnek QSO:

> _"Net Control, this is Triage Hospital, 5 critical patients incoming, request transport, Triage Hospital this is TA1XYZ, over."_

## EmComm Go-Bag (hazırlık çantası)

Afet vurduğunda elektrik kesik, internet yok, evden çıkmak zorunda olabilirsin. **24-72 saat** dayanacak go-bag:

### Minimum (300-500 USD eşdeğeri)

-   **Baofeng UV-5R** veya **UV-K5** — 2m/70cm dual band
-   Ekstra batarya (orijinal + yedek 2-3 adet)
-   **AAA/AA batarya tutucu adaptör** — UV-5R için (li-ion bittiğinde alkali kullanım)
-   Kompakt anten (Nagoya NA-771)
-   USB programlama kablosu + laptop'ta CHIRP CSV (önceden yüklü)
-   Kulaklık + boyun askısı

### Orta (1000-2000 USD)

-   HF QRP transceiver: **Yaesu FT-818** veya **Xiegu G90** — 100W, 4-7 kg
-   9V li-ion battery pack veya 12V GEL akü
-   **EFHW anten** + 49:1 unun (10-40m portable)
-   Anten kapsamak için bir **slingshot + nylon ip** (ağaca atmak için)
-   Solar panel (50-100W) + charge controller
-   Kulaklık + paddle (CW operasyonu için)

### İleri (5000+ USD)

-   Yaesu FT-857D + 100W amplifier
-   **Mil-spec rugged radyo** (Icom IC-705)
-   Multi-band yagi
-   Generator (1-2 KW)
-   Cygnett güç kondansatörü, EMP koruma kasası

## Hazırlık adımları

### 1\. Lisans al (zorunlu ilk adım)

B sınıfı en mantıklı (HF + VHF + UHF, 250W). [Çağrı işareti rehberi →](/tutorials/cagri-isareti-nasil-alinir). C sınıfı sadece VHF/UHF — afet bölgesel iletişim için yeterli olabilir.

### 2\. TRAC veya yerel derneğe katıl

-   TRAC merkez İstanbul, yerel şubeler İzmir/Ankara/Antalya/Bursa vs
-   Aylık tatbikat netlerine katıl — gerçek afet öncesi pratik
-   AFAD gönüllü kayıt formu doldur

### 3\. Ekipmanı tanı + pratik et

-   Telsizini afet öncesi 100 saat aktif kullan
-   Frekans + CTCSS + shift programlama ezberinde olsun
-   Karanlıkta menü ezbere

### 4\. Net toplantılarına katıl

TRAC'ın haftalık 80m / 40m / 2m netleri var. İlk başta sadece dinle, sonra check-in yapmaya başla. **Pratik yapmadığın ekipman afette çalışmaz.**

### 5\. Komşu/aile hazırlığı

-   Aile üyelerine "deprem olursa şu frekansta dinle" frekansı ver
-   Cep telsizi ucuz (Baofeng UV-5R 600 TL) — eşine/ebeveynine al, programla
-   Kontak protokolü: günde 2 kez, sabah 9 + akşam 21, 145.500'de

## Net toplantıları

Düzenli pratik = afetinde gerçek kullanım yetkinliği:

-   **TRAC HF Net** — Pazar 19:30 TR, 7.060 MHz LSB
-   **TRAC VHF Net** — Çarşamba 21:00 TR, lokal röleler
-   **APRS sürekli** — 144.800 MHz, anlık takip

Format:

1.  Net Control "Net açılıyor, check-in başlıyor"
2.  Operatörler sırayla çağrı işareti + konum + iletişim notu
3.  Net Control duyurular ve ihtiyaçlar
4.  "Net kapanıyor, 73"

## Sık sorulan sorular

### Lisansım yok, afette telsiz kullanabilir miyim?

**Acil yaşam tehlikesinde** evet — uluslararası kural, herhangi biri "MAYDAY" söyleyip yardım çağırabilir. Ama lisanslı operatör daha verimli — frekans bilir, mod bilir, protokol bilir. Lisans almak 2-3 ay zaman alır, sınav 3 ayda bir.

### Cep telefonu varken neden zahmet?

Marmara depremi 7 saat, Maraş depremi 12-24 saat baz istasyonu çalışmadı. Ham radio o sırada çalışıyor. Sigorta gibi düşün.

### En önemli tek ekipman?

**Bir tane Baofeng UV-5R + iyi anten + dolu bir batarya.** 600 TL'lik ekipman 5W ile 30-50 km menzil — yeter.

### TRAC üye olmak şart mı?

Hayır ama çok faydalı. Üyelik ücreti yıllık ~150 TL. Net toplantılar, eğitim, AFAD kayıtlı gönüllü statüsü için.

### Mors bilmem şart mı?

Hayır, FT8 ve sesli (SSB/FM) yeterli. CW eski okul ama avantajı: en zayıf sinyal koşullarında bile geçer. İleri seviye operatör hedefi varsa öğren.

* * *

## İlgili kaynaklar

-   [NVIS haberleşmesi](/tutorials/nvis-haberlesmesi) — yakın menzil HF detayı
-   [WinLink tutorial](/tutorials/winlink-email-over-radio)
-   [APRS](/tutorials/aprs-nedir-nasil-kullanilir)
-   [HF propagasyon](/tutorials/hf-propagasyon-temelleri)
-   [Çağrı işareti alma](/tutorials/cagri-isareti-nasil-alinir)
-   [Röle nedir](/tutorials/role-nedir)
-   TRAC: [trac.org.tr](https://www.trac.org.tr/) · AFAD: [afad.gov.tr](https://www.afad.gov.tr/)
-   **Genişletilmiş kaynak:** [telsizcilik.com](https://telsizcilik.com/) — afet haberleşmesi makaleleri
