---
title: QRZ.com Kullanım Rehberi — Amatör Telsizciliğin Dijital Kimliği
description: >-
  QRZ.com nedir, nasıl kullanılır. Çağrı işareti arama, profil oluşturma,
  dijital logbook, QSL yönetimi, WSJT-X entegrasyonu, XML API, ikinci el pazar.
keywords:
  - QRZ
  - logbook
  - QSL
  - profil
  - dijital kimlik
  - başlangıç
article_section: QRZ
published_at: '2026-04-26'
updated_at: '2026-04-26'
faq:
  - q: QRZ hesabı olmadan amatör olabilir miyim?
    a: >-
      Evet — QRZ zorunlu değil. Ama toplulukta standard practice. DX yapmak
      istiyorsan profil şart.
  - q: QRZ sayfamda ev adresim gözükür mü?
    a: >-
      Evet — varsayılan olarak posta adresi görünür (QSL kartı için).
      İstemiyorsan "QSL: No cards, LotW only" yaz + adresi kaldır.
  - q: Türkiye operatörleri QRZ'de çok mu?
    a: ~3000-5000 Türk operatör kayıtlı. Aktif profil oranı ~%30.
  - q: QRZ logbook ile LotW aynı mı?
    a: >-
      Hayır — QRZ kişisel log, LotW = ARRL resmi doğrulama. İkisini birlikte
      kullan.
  - q: QRZ'de reklam çok?
    a: Ücretsiz versiyonda evet. Premium ($30/yıl) reklamsız. ---
---
Havada "TA2ABC" duydun — bu kim, nerde, hangi ekipmanla çalışıyor? **QRZ.com** = amatör telsizciliğin "LinkedIn"i. 1992'den beri dünyanın en büyük çağrı işareti veritabanı. Bu rehber QRZ hesabı açma + profil + logbook + yazılım entegrasyonu.

## QRZ.com nedir?

1992'de Fred Lloyd (AA7BQ) tarafından kurulan platform. İsmi Q kodundan: **QRZ?** = "Beni kim çağırıyor?" Bugün milyonlarca amatörün bilgilerini barındıran en büyük ham radio veritabanı.

### Temel işlevler

-   **Çağrı işareti arama**: isim, konum, posta adresi (QSL kartı göndermek için)
-   **Dijital logbook**: bulut tabanlı QSO kayıt defteri
-   **Profil sayfası**: istasyon fotoğrafları, anten, cihaz listesi
-   **QSL yönetimi**: dijital doğrulama + award
-   **İkinci el pazarı** (Swapmeet): dünya çapında alım-satım
-   **Forum**: teknik tartışma + topluluk

## Neden QRZ sayfanız olmalı?

### Güven ve şeffaflık

Sizi havada duyan operatör QRZ'ye bakar — gerçek lisanslı amatör olduğunuzu teyit eder. Sayfa yoksa "bu çağrı gerçek mi?" şüphesi.

### QSL kartı alışverişi

Fiziksel QSL kartı göndermek isteyen operatör adresinizi QRZ'den alır. Sayfanızda **"QSL: Direct"** (doğrudan posta) veya **"QSL: Bureau"** (TRAC bürosu aracılığıyla) tercihinizi belirtin.

### Dijital diplomalar (award)

Belirli sayıda ülke/bölge ile QSO onaylandığında QRZ otomatik dijital başarı belgeleri verir. DXCC chase'in dijital karşılığı.

### Profesyonel izlenim

Contest'te sizi arayan operatör profilinize bakar — "bu ciddi operatör" izlenimi verirsiniz. Boş profil = "geçici meraklı" algısı.

## Hesap oluşturma

### 1\. qrz.com → "Register"

-   Çağrı işareti gir (TB3KKD)
-   Email + şifre
-   Lisans doğrulama (Türkiye BTK PDF veya otomatik FCC veritabanı — TR için manuel)

### 2\. Profil düzenleme

-   **Bio**: kim olduğun, ne yaptığın (Türkçe + İngilizce)
-   **QTH**: şehir + Maidenhead grid (KN41la)
-   **Ekipman listesi**: telsiz, anten, güç kaynağı
-   **Fotoğraf**: istasyon (shack), anten, QSL kartı

### 3\. QSL tercihi belirt

-   "QSL: Direct with SASE" — doğrudan posta (zarfla cevap)
-   "QSL: via Bureau" — TRAC QSL bürosu
-   "QSL: via LotW" — [Logbook of the World](/tutorials/log-tutma-qsl-lotw)
-   "QSL: via eQSL" — eqsl.cc

## Dijital logbook

### QRZ logbook (ücretsiz)

-   Her QSO'yu online kaydet
-   Tarih, saat (UTC), frekans, mod, RST, çağrı işareti
-   Otomatik DXCC entity tanıma
-   Dijital award tracking

### ADIF import/export

-   Logging yazılımından (Logger32, N1MM vs) ADIF export
-   QRZ'ye upload → tüm kontaklar bulutta
-   Veya QRZ'den ADIF export → başka yazılıma

## Yazılım entegrasyonu (XML API)

QRZ'nin en güçlü tarafı — diğer ham radio yazılımlarıyla konuşması:

### WSJT-X (FT8)

-   Settings → Reporting → "QRZ Logbook" etkinleştir
-   Her FT8 kontağı otomatik QRZ logbook'a yüklenir
-   Gerçek zamanlı — kontak bittiğinde 5 saniyede bulutta

### Log4OM

-   QRZ XML integration
-   Çağrı işareti arama (kontak sırasında kimin olduğunu anında gör)
-   Award tracking entegre

### N1MM Logger

-   DX cluster + QRZ arama birlikte
-   Contest sırasında operatör bilgisi pop-up

### HamRS (mobile)

-   POTA/SOTA aktivasyon log → QRZ sync

## Çağrı işareti arama — pratik

### Basit arama

qrz.com → arama kutusuna "TA2ABC" yaz → profil sayfası açılır:

-   İsim, konum, grid
-   Ekipman, anten
-   Son QSO'lar (logbook açıksa)
-   QSL tercihi

### İleri arama

-   Ülke bazlı (tüm TA prefiksli operatörler)
-   Grid bazlı (KN41 grid'deki operatörler)
-   "Superbrowser" (premium üyelik) — gelişmiş filtreleme

## Premium üyelik

### Ücretsiz vs premium

| Özellik | Ücretsiz | Premium ($30/yıl) |
| --- | --- | --- |
| Çağrı arama | ✓ | ✓ |
| Profil sayfası | ✓ | ✓ |
| Logbook (temel) | ✓ | ✓ |
| XML API (sınırsız) | ✗ | ✓ |
| Reklamsız | ✗ | ✓ |
| Superbrowser | ✗ | ✓ |
| Award tracking | Temel | Gelişmiş |

Çoğu amatör için **ücretsiz yeterli**. XML API yoğun kullanım (contest yazılımı) premium gerektirir.

## İkinci el pazarı (Swapmeet)

QRZ'nin "Craigslist"i:

-   Dünya çapında amatör ekipman alım-satım
-   Kategori: telsiz, anten, aksesuara, test ekipmanı
-   Güvenilirlik: seller QRZ profili var, feedback sistemi
-   Dikkat: uluslararası kargo + gümrük

## QRZ alternatifler

-   **HamQTH.com** — Avrupa merkezli, ücretsiz XML API
-   **RadioQTH.com** — daha küçük veritabanı
-   **HamCall.net** — Buckmaster veritabanı
-   **TRAC veritabanı** — Türkiye spesifik (sınırlı)

**Pratik**: QRZ.com ana, HamQTH yedek (bazı yazılımlar ikisini de destekler).

## Profil yazma ipuçları

### İyi profil

-   Türkçe + İngilizce bio (DX operatörler de okuyabilsin)
-   Ekipman listesi güncel (telsiz modeli, anten tipi)
-   Fotoğraf: shack + anten + QSL kart
-   Grid: KN41la (Maidenhead tam)
-   QSL tercihi net: "LotW preferred, Direct OK, no Bureau"

### Kötü profil

-   Boş sayfa — "Bu operatör gerçek mi?"
-   Çok uzun hikaye — 3 paragraf yeter
-   Eski bilgi — 10 yıl önceki ekipman hâlâ listeleniyor

## QRZ + DXCC chase

DXCC avı (100+ entity) QRZ logbook ile takip edilebilir:

-   QSO girdikçe DXCC counter güncellenir
-   Hangi entity'ler eksik → hedef listesi
-   LotW + QRZ birlikte kullanım: LotW resmi DXCC, QRZ kişisel tracking

## Sık sorulan sorular

### QRZ hesabı olmadan amatör olabilir miyim?

Evet — QRZ zorunlu değil. Ama toplulukta **standard practice**. DX yapmak istiyorsan profil şart.

### QRZ sayfamda ev adresim gözükür mü?

Evet — varsayılan olarak posta adresi görünür (QSL kartı için). İstemiyorsan "QSL: No cards, LotW only" yaz + adresi kaldır.

### Türkiye operatörleri QRZ'de çok mu?

~3000-5000 Türk operatör kayıtlı. Aktif profil oranı ~%30.

### QRZ logbook ile LotW aynı mı?

Hayır — QRZ kişisel log, LotW = ARRL resmi doğrulama. İkisini birlikte kullan.

### QRZ'de reklam çok?

Ücretsiz versiyonda evet. Premium ($30/yıl) reklamsız.

* * *

## İlgili kaynaklar

-   [Log tutma + QSL + LotW](/tutorials/log-tutma-qsl-lotw)
-   [DXCC ve DX hunting](/tutorials/dxcc-dx-hunting)
-   [Callsign prefiks dünya sistemi](/tutorials/callsign-prefiks-dunya-sistemi)
-   [FT8 dijital mod](/tutorials/ft8-dijital-mod) — QRZ entegrasyonu
-   [Contesting rehberi](/tutorials/contesting-yarisma-rehberi)
-   QRZ.com: [qrz.com](https://www.qrz.com/)
-   HamQTH: [hamqth.com](https://www.hamqth.com/)
-   **Genişletilmiş kaynak:** [telsizcilik.com](https://telsizcilik.com/) — QRZ makaleleri
