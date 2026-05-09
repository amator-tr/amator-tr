---
title: 'Mors Kodu (CW) Nasıl Öğrenilir? Koch Metodu, LCWO ve Pratik Yolları'
description: >-
  Amatör telsiz için mors kodu (CW) öğrenme rehberi — Koch metodu, Farnsworth
  zamanlaması, LCWO ve G4FON araçları, gerçekçi süre tahmini ve günlük pratik
  düzeni.
keywords:
  - mors
  - cw
  - koch
  - lcwo
  - hf
  - başlangıç
article_section: mors
published_at: '2026-04-25'
updated_at: '2026-04-25'
faq:
  - q: Türkiye'de CW lisansı için zorunlu mu?
    a: '2010''dan beri sınava dahil değil, ama A sınıfı amatörlerin %30+''ı CW yapar'
  - q: Hangi WPM hedeflemeliyim?
    a: 'İlk hedef: 13 WPM (kontak yapma). Master: 25+ WPM'
  - q: Hangi yaşta başlayabilirim?
    a: >-
      Sınır yok. 8 yaş çocukları + 75 yaş emekliler aktif. Müzik kulağı yardım
      eder
  - q: Kafamda yazma vs duyma vs el yazısı?
    a: >-
      Önce duy + yaz (klavye veya kalem). Aylar sonra "head copy" (yazmadan
      tanı) gelişir
  - q: 'Köpek havlaması, müzik vs CW pratik etmeyi engellemez mi?'
    a: >-
      Tam tersine — gürültülü ortam için bilinçli pratik (G4FON QRN) gerçekçi
      simülasyon
---
## Mors kodu (CW) hâlâ neden değerli?

CW (Continuous Wave) — yani mors kodu — amatör radyonun en eski moddur (1840'lar) ve bugün hâlâ aktif. Sebep:

-   **En düşük güçle en uzak DX**: 5 W CW = 100 W SSB sinyal-gürültü oranıyla aynı, çünkü dar bant (50 Hz) → daha az gürültü
-   **Uluslararası dil bağımsız**: Türkçe veya İngilizce konuşmasanız bile karşı operatörle anlaşırsınız
-   **Acil durum standardı**: SOS (`... --- ...`) hâlâ uluslararası imdat çağrısı (1999'da resmi olarak terk edildi ama amatör + denizcilikte kullanımı devam)
-   **Donanımsal basitlik**: 1-transistörlü oscillator + anahtar = TX. SSB için karmaşık SDR/PA gerekir
-   **Eski CW kontestleri** (CQ WW CW, ARRL DX CW) — amatör dünyanın en prestijli yarışmaları

Türkiye'de A sınıfı sınavda 2010'a kadar CW alma-gönderme zorunluyduyken kaldırıldı; ama topluluk hâlâ HF alt-band'lerinde CW yapıyor (özellikle 7.020-7.040, 14.020-14.060 MHz).

## Mors alfabesi — temel referans

Her harf **nokta (·)** ve **çizgi (—)** kombinasyonudur. Nokta = 1 zaman birimi, çizgi = 3 zaman birimi.

| Harf | Mors | Harf | Mors | Harf | Mors |
| --- | --- | --- | --- | --- | --- |
| A | · — | J | · — — — | S | · · · |
| B | — · · · | K | — · — | T | — |
| C | — · — · | L | · — · · | U | · · — |
| D | — · · | M | — — | V | · · · — |
| E | · | N | — · | W | · — — |
| F | · · — · | O | — — — | X | — · · — |
| G | — — · | P | · — — · | Y | — · — — |
| H | · · · · | Q | — — · — | Z | — — · · |
| I | · · | R | · — · |  |  |

**Rakamlar:** 0 (— — — — —), 1 (· — — — —), 2 (· · — — —), 3 (· · · — —), 4 (· · · · —), 5 (· · · · ·), 6 (— · · · ·), 7 (— — · · ·), 8 (— — — · ·), 9 (— — — — ·)

**Sık kısaltmalar (CW prosigns):**

-   `AR` = `· — · — ·` — mesaj sonu
-   `K` = `— · —` — sıra senin (over)
-   `KN` = `— · — — ·` — sadece named station yanıtlasın
-   `BT` = `— · · · —` — paragraf ayracı
-   `SK` = `· · · — · —` — final, kontak bitti
-   `73` (saygılarımla) ve `88` (sevgilerimle) sayı olarak gönderilir

## Yanlış yöntemler — nereden başlamamalı?

❌ **Tabloyu ezberle / nokta-çizgi görselleştir:** Bu **en büyük hata**. Harfi "nokta-çizgi" olarak görselleştirdiğin an, hız artığında beyinin bu görseli işleyemez ve tıkanırsın. CW **ses** modudur — "A" harfini görsel olarak `·−` değil, kulağında yer eden bir **"di-dah" melodisi** olarak tanımalısın. Tıpkı bir şarkının nakaratını tanıdığın gibi, harfin **tınısını** tanı. Gözünü kapat ve dinle. Tablo ezberleyen 1 yıl sonra hâlâ her sembolü tek tek "deşifre" eder, 5 WPM bile zor anlar.

❌ **Yavaş başla, hızlandırırım:** Yavaş tempo (5 WPM) tanımayı **sabotaj eder**. Beyin "uzun ses + boşluk" dinler, harflerin arası açılır, ritm bozulur. Adet harfler 10+ WPM'de **müzik** gibidir.

❌ **Görsel mors decoder app'i:** Mikrofona ses verir, ekrana harf yazar. Pasif tüketim → hiçbir öğrenme.

## Doğru yöntem — Koch + Farnsworth

### Koch metodu (1936'dan beri kanıtlanmış)

Alman psikolog Ludwig Koch'un 1930'larda Wehrmacht için geliştirdiği yöntem:

1.  **Sadece 2 harfle başla** (`K` ve `M` — birbirinden çok farklı sesler)
2.  Bu iki harfle **rastgele üretilen 5-dakikalık** ses dosyası dinle
3.  Anlamadığın harfi **tahmin et**, sonra cevabı kontrol et
4.  **%90 doğruluk** sağladığında 3. harfi ekle (`R`)
5.  Yeni harf: `R K M` üçlüsüyle 5 dakika → %90 → yeni harf
6.  5-7 ay'da tüm 26 harf + 10 rakam + bazı prosigns

Bu yaklaşımın **mucizesi**: harfleri **hızlı tempo'da öğrenirsin** (15-20 WPM), beyin otomatik "ses → harf" eşlemesi kurar.

### Farnsworth zamanlaması

Yeni başlayan **harf hızı 18 WPM**, **harfler arası boşluk 5 WPM** şeklinde set edilir. Yani:

-   Tek harf gönderildiğinde: hızlı (`· — · —` 1 saniyede)
-   Harfler arası: yavaş (3-4 saniye boşluk)

Bu sayede beyin harfin "müziğini" hızlı tanırken, harfler arasında düşünme zamanı bulur. Tempo arttıkça boşluk kısalır → 13-20 WPM hedef.

## Araçlar — pratik yapacağın yerler

### LCWO.net (en popüler, Web tabanlı, ücretsiz)

[**lcwo.net**](https://lcwo.net) — Fabian Kurz (DJ1YFK) tarafından geliştirilen Koch metodu + Farnsworth + plain text dictate trainer. Tek tıkla başlar:

1.  Hesap aç (ücretsiz, 30 saniye)
2.  **"Code Course"** sekmesi → Lesson 1 (`K` ve `M`)
3.  **Character speed**: 18-20 WPM (default)
4.  **Effective speed**: 8-12 WPM (Farnsworth)
5.  **Length**: 5 dakika
6.  Başla. Duyduğun harfleri yaz, sonunda doğruluk yüzdesini gör
7.  %90+ → sonraki lesson

**Diğer sekmeler:**

-   **Plain Text** — gerçek metin dikte (lessons sonrası)
-   **Word Mode** — common english words
-   **Callsign Trainer** — gerçek call sign'lar (`TA1ABC` gibi)
-   **QSO Trainer** — tipik QSO senaryosu

### G4FON Koch Trainer (Windows masaüstü, free)

[**g4fon.net**](http://www.g4fon.net) — Ray Goff'un offline Windows trainer'ı. LCWO ile aynı temel ama:

-   Background noise/QRN/QRM ekleme (gerçekçi kontak simülasyonu)
-   Customizable letter set
-   "Speed Builder" — hızdan korkanlar için kademeli artırım

### Mobil: IZ2UUF Morse Koch CW (Android)

Google Play'de [IZ2UUF Morse Koch CW](https://play.google.com/store/apps/details?id=net.iz2uuf.cwkoch) — Koch lessons + plain text + callsign + Q-code trainer. iOS için [Morse Mania](https://apps.apple.com/) benzeri.

### Türkçe topluluk kaynağı

**TA2RX'in rehberi**: [tcswat.org/bka/TA2RX/CW/](http://www.tcswat.org/bka/TA2RX/CW/) — Türkiye CW topluluğunun klasiği, Türkçe özet + pratik öneriler.

## amator.tr ekosistemi: Çağrı Defteri'nin Mors Oyunu (TR-spesifik, AI destekli)

Bu sitenin kardeş uygulaması [**cagri.amator.tr**](https://cagri.amator.tr) (kayıt + giriş ücretsiz) içinde **7 sekmeli oyunlaştırılmış mors antrenörü** var. LCWO + G4FON'a alternatif olarak Türkçe arayüz + topluluk lider tablosu + Türk çağrı işareti odaklı pratik:

| Sekme | Ne yapar |
| --- | --- |
| **Alfabe** | Tüm 26 harf + 10 rakam + prosigns adım adım — her sembol için mors sesi + görsel `· — ·` gösterim |
| **Harf Bilmece** | Rastgele harf duyacaksın, 4 seçenekten doğru cevabı seç (multiple choice). Hatalar takip edilir, zayıf harflerine extra pratik gelir |
| **Hız Yarışı** | Belirli WPM hedefinde (5 → 13 → 20) doğru cevap sayısı yarışı; lider tablosunda Türkiye operatörleri sıralanır |
| **Hayatta Kal** | Yanlış cevap = can düşer; 3 hata sonu. Oyunlaştırılmış disiplin baskısı |
| **Kelime** | CW QSO'nda sık kullanılan kelimeler (`CQ`, `73`, `OM`, `QTH`, `RST`, `DE`, `K`, `BK`, `KN`...) → kelime bütününü duyup yaz |
| **Canlı Gönderici** | Ekrandaki sanal paddle/straight key — fare/dokunmatikle sen gönder, sistem doğru/yanlış öğretir; gerçek tuş motor hafızası geliştirir |
| **Çağrı İşareti Yarışı** | Sadece Türkiye + global call sign formatları (`TA1ABC`, `YM5KAD`, `W2XYZ`...) — kontest acil refleksini geliştirir |

### AI destekli interaktif tutor

Cagri uygulaması **Cloudflare Workers AI**'ya bağlı — 4 farklı dil modeline (Llama 3.3 70B, GPT-OSS 120B, Kimi K2.5, Llama 3.1 8B) erişimi var. Mors pratiği esnasında doğal dilde soru sorabilirsin:

-   _"Q-kodu QRZ ne anlama gelir?"_
-   _"TA1ABC çağrı işaretini nasıl mors ile gönderirim?"_
-   _"5 WPM'den 13 WPM'e nasıl atlayabilirim?"_
-   _"Farnsworth zamanlaması nedir, fark yaratır mı?"_

AI cevap verir — **gerçek bir CW mentörü gibi**. LCWO ve G4FON'un sunmadığı interaktif öğrenme yaklaşımı: hata yaptığında "neden yanlış" diye sor, AI sembolün mors yapısını + benzer harflerle karıştırma riskini açıklar. Birden fazla model fallback (biri başarısız olursa sıradaki dener) sürekli erişim garantisi sağlar.

### Mors pratiği için aynı oturumda QSO log

Cagri uygulamasının ana özelliği zaten **operatör/QSO defteri**dir (gerçek kontaklarınızı kayıt edersiniz). Mors antrenmanı + gerçek QSO log aynı app'te → öğrendiğin sembollerin pratik kontağa dönüşümünü takip edebilirsin: "İlk CW QSO'mu 2026-08-12'de TA2XYZ ile yaptım, 8 ay öğrenmenin meyvesi."

> **Lisans gerekir mi?** Mors antrenörü oyunları **lisanssız oynanabilir** (sadece RX simulasyon). Gerçek RF'de TX yapmak için Türkiye'de A/B/C sınıfı amatör belgesi şart. Bkz. [Çağrı İşareti Nasıl Alınır](/tutorials/cagri-isareti-nasil-alinir).

## Pratik düzeni — gerçek zaman tahmini

| Hedef | Pratik süresi | Beklenen gelişme |
| --- | --- | --- |
| Tüm 26 harf + 10 rakam tanıma | **3-4 ay** (günde 20 dk) | Plain text 8-10 WPM |
| QSO yapabilir hız | **6-8 ay** (günde 30-45 dk) | 12-15 WPM, gerçek QSO |
| Kontest hızı | **1.5-2 yıl** | 25-30 WPM |
| Master / 40+ WPM | **5+ yıl** disipline | 40 WPM, head copy (yazmadan dinleme) |

Pratik **kısa ama günlük** olmalı. Haftada 1× 3 saat yerine günde 30 dk × 7 gün **5 kat etkili**. Beyin gece konsolide eder; uyku önemli.

## QSO formatı (CW kontak akışı)

İlk 2-3 ay sadece dinle. Sonra:

```
CQ CQ CQ DE TA1ABC TA1ABC PSE K
                   (Çağrı yapıyorum, TA1ABC, lütfen yanıt verin, sıra sende)

DE W2XYZ W2XYZ KN
                   (Yanıt: W2XYZ, sadece TA1ABC yanıtlasın)

W2XYZ DE TA1ABC GE OM TKS FER CALL UR RST 599 NAME KAAN QTH ISTANBUL HW? KN
                   (Good evening old man, thanks for call, your signal 599, name Kaan, QTH İstanbul, how copy?)

TA1ABC DE W2XYZ TKS RPRT KAAN UR RST 579 NAME JIM QTH NEW YORK HW?
                   (...)

W2XYZ DE TA1ABC FB JIM TKS QSO 73 SK
                   (Fine business, thanks QSO, 73, end of contact)

TA1ABC DE W2XYZ 73 GL DX SK
```

**Kısaltmalar:**

-   `CQ` = "anyone listening?"
-   `DE` = "from"
-   `RST` = signal report (Readability/Strength/Tone, 599 = mükemmel)
-   `OM` = old man (kadın için `YL`)
-   `FB` = fine business
-   `GL` = good luck
-   `DX` = distance contact

## Donanım — başlamak için ne lazım?

CW sadece **dinlemek** için:

-   HF telsiz (FT-450, IC-718, IC-7300 vs)
-   Anten (HF dipole — bkz. [HF Anten Yapımı](/tutorials/hf-dipole-efhw-anten))

**Göndermek** için:

-   **Straight key** (klasik düz mors anahtarı, $30-150) — başlangıç
-   **Iambic paddle** (çift kollu, $80-300) — yarı-otomatik, daha hızlı
-   **Bug** (Vibroplex, semi-auto) — 1900'lerin klasiği, antika değer
-   **Keyer**: tipik telsiz iç dahili keyer var; harici Winkeyer USB ($150)

### Ucuz başlangıç set'i

-   **MFJ-557 straight key**: $35
-   **Picokeyer keyer**: $45
-   **(opsiyonel) RockMite QRP TX kit**: $50 (3.5 / 7 MHz CW-only)
-   **20m EFHW anten** (DIY): $30

Toplam $160 ile dünya genelinde QRP CW DX yapabilirsiniz.

## Sık sorulan sorular

| Soru | Cevap |
| --- | --- |
| Türkiye'de CW lisansı için zorunlu mu? | 2010'dan beri sınava dahil değil, ama A sınıfı amatörlerin %30+'ı CW yapar |
| Hangi WPM hedeflemeliyim? | İlk hedef: 13 WPM (kontak yapma). Master: 25+ WPM |
| Hangi yaşta başlayabilirim? | Sınır yok. 8 yaş çocukları + 75 yaş emekliler aktif. Müzik kulağı yardım eder |
| Kafamda yazma vs duyma vs el yazısı? | Önce duy + yaz (klavye veya kalem). Aylar sonra "head copy" (yazmadan tanı) gelişir |
| Köpek havlaması, müzik vs CW pratik etmeyi engellemez mi? | Tam tersine — gürültülü ortam için bilinçli pratik (G4FON QRN) gerçekçi simülasyon |

## İleri seviye

-   **CW kontestleri**: CQ WW CW (Kasım), ARRL DX CW (Şubat), IARU HF (Temmuz)
-   **DXpedition**: Nadir entiteler (örn. `T31` Kiribati, `3Y` Bouvet) sadece CW'de duyulur
-   **Skimmer/Reverse Beacon Network**: [reversebeacon.net](https://reversebeacon.net) sinyalinizi otomatik decode + raporlar
-   **CW Academy** (CWops): [https://cwops.org](https://cwops.org) — yapılandırılmış sınıflar, mentorlu

## Yararlı kaynaklar

-   [LCWO.net](https://lcwo.net) — DJ1YFK web trainer
-   [G4FON Koch Trainer](http://www.g4fon.net) — Windows offline
-   [TA2RX CW önerileri](http://www.tcswat.org/bka/TA2RX/CW/) (TR)
-   [Furkan ÖZEN: Kolayca Mors Öğrenmek](https://furkanozen.com.tr/kolayca-mors-ogrenmek-lcwo/) (TR)
-   [CWops Academy](https://cwops.org) — yapılandırılmış kurslar
-   [Mors alfabesi (Wikipedia TR)](https://tr.wikipedia.org/wiki/Mors_alfabesi)
-   [Reverse Beacon Network](https://reversebeacon.net) — sinyalinizi global skimmer'lar görür

## Sıradaki

Mors temellerinden sonra:

-   [HF Dipole / EFHW Anten Yapımı](/tutorials/hf-dipole-efhw-anten) — CW için HF anten şart
-   [NanoVNA ile Anten Ölçümü](/tutorials/nanovna-anten-olcumu) — anten test ekipmanı
-   [FT8 Dijital Mod](/tutorials/ft8-dijital-mod) — CW'nin "dijital kuzeni"
-   [Çağrı İşareti Nasıl Alınır](/tutorials/cagri-isareti-nasil-alinir) — A sınıfı CW kontestlerine girer

İlk CW QSO'nuz için **dit dit, 73, GL!**
