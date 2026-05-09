---
title: Konnektör Su Yalıtımı ve UV Koruması — Outdoor Anten Sigortası
description: >-
  Outdoor amatör radyo konnektörlerinde su yalıtımı, UV koruma.
  Self-amalgamating tape, dielectric grease, drip loop, PL-259 vs N type,
  kış-yaz bakım.
keywords:
  - konnektör
  - su yalıtım
  - UV
  - outdoor
  - anten
  - bakım
article_section: konnektör
published_at: '2026-04-26'
updated_at: '2026-04-26'
faq:
  - q: En ucuz çözüm?
    a: >-
      Self-amalgamating tape Çince muadili (~30 TL/rolo) yerine 3M (~50 TL). 20
      TL fark ama 5 yıl ömür farkı.
  - q: Heat shrink tek başına yeter mi?
    a: >-
      Hayır — heat shrink mekanik koruma + UV. İçindeki adhesive sealing anlık
      başarılı ama yaşa adet kötüleşir. Birlikte tape kullan.
  - q: N-type için sealing gerek mi?
    a: >-
      Evet, yine de. N-type built-in gasket helpful ama %100 değil. Ekstra tape
      katmanı uzun ömür.
  - q: Apartman balkon için aşırı mı?
    a: >-
      Hayır — apartman balkonunda yağmur var. Tape gerek. Sadece drainage önemi
      düşük (zaten yer açık, su biriken yer yok).
  - q: Pencere geçişi nasıl?
    a: >-
      Bulkhead connector ya da bulkhead PL-259. Pencere kasasına monte, odaya su
      girmesin. İç ile dış arası feedthrough. ---
---
Geçen ay anten test ettin — SWR 1.3, mükemmel. Bu sabah test ettin — SWR 4.5, kötü. Hava değişmedi. **Konnektöre su girdi**. 30 TL'lik PL-259 yüzünden 2.000 TL'lik anten + 1.000 TL'lik koaksta korozyon. Bu rehber outdoor RF konnektörlerinin **su / UV / korozyon** ile savaşı.

## Su girişi nasıl başlar?

### Mekanizma

1.  **Sıcaklık değişimi** — gece/gündüz fark cihazı genleşir/büzülür
2.  **Konnektör boşlukları** — büyür/küçülür, mikro çatlaklar
3.  **Yağmur** — birikmiş su mikro çatlaktan girer
4.  **Capilary action** — koaks dielektriği boyunca yukarıya
5.  **Merkez iletken oksitler** → empedans değişir, SWR yükselir
6.  **Sonuç**: 2-6 ay içinde cihaz mahvolur

### Belirti — erken tespit

-   SWR yağmurdan sonra geçici yükseliyor → konnektörde nem
-   SWR sürekli yüksek → permanent damage
-   TX sırasında "popping" sesleri → arc, su buharlaşıyor
-   Anten test ediyor, OK; ev içine alınıp tekrar test, hâlâ OK; tekrar dış mekana takıyor, **kötü** → outdoor sorun

### Su girişinin sevdiği yerler

1.  **Konnektör birleşim noktası** (PL-259 + SO-239 mesh)
2.  **Anten besleme noktası** (dipole feedpoint)
3.  **Lightning arrestor giriş/çıkışı**
4.  **Splice / joint** — koaks ekleme
5.  **Bulkhead** (duvardan geçiş)

## Self-amalgamating tape (en kritik)

Yağmur korumasının **gold standartı**. Stretch ile self-bond yapan rubber tape.

### 3M Scotch 23 / 2228 / 130C (önerilen)

-   **3M Scotch 23**: orijinal, klasik (~50 TL/rolo)
-   **3M Scotch 2228**: extra güçlü (~80 TL)
-   **3M Scotch 130C**: yüksek voltaj versiyonu (~100 TL)

### Kullanım

1.  Konnektörü **temiz / kuru** ilk başta (kritik!)
2.  Tape rolosunu yarı esnetip stretch ederek sar
3.  **%50 stretch** — bu sayede kendi kendine kaynaşır
4.  Konnektörden **5 cm öncesinden 5 cm sonrasına** sar
5.  **2 katman** üst üste tercih
6.  Üstüne **PVC electrical tape** (Coroplast veya Scotch 33+) UV koruma için

### Sonuç

-   Su girmesi 0 (% **etkin**)
-   5-10 yıl ömür (UV korumalı)
-   Kış-yaz dayanır

## Coax-Seal (alternatif yumuşak macun)

Self-amalgamating tape'in ucuz alternatifi:

-   **CoaxSeal** veya **Stuf** — kil benzeri yumuşak macun
-   Konnektöre yapışır, hava temasıyla sertleşmez (silicon-based)
-   10 TL'lik tüp 5-10 konnektör

### Avantaj

-   Self-amalgamating tape'ten ucuz
-   Çok kolay uygulama (parmakla bas-yapıştır)
-   Tekrar kullanılabilir (söküp tekrar)

### Dezavantaj

-   1-2 yıl sonra kayganlaşır, su girer
-   Sıcakta çok yumuşar (yaz)
-   Soğukta çatlar (kış)

**Pratik**: hızlı acil çözüm için OK, kalıcı çözüm için tape tercih.

## Dielectric grease

İletkenlerin temas yüzeyine sürülür — silicone-based, su bariyeri:

-   **Permatex Dielectric Grease** ($3-5)
-   **MG Chemicals 8463**
-   **Connector grease** ham radio shops

### Kullanım

1.  Konnektör pinlerine ince katman
2.  Dış kabuklara ince katman
3.  Vidalayıp sıkıştır
4.  Üstüne self-amalgamating tape

### Avantaj

-   Korozyon önler
-   Mikro çatlaklara su girişini durdurur
-   Konnektör ileri sökme kolaylaştırır (don kaynaması yok)

## Drip loop — gravity savunması

Kabloyu cihaza girmeden önce **U şeklinde aşağı** çek — su damlasın diye.

```
[Anten]
  │
  │ koaks
  │
  ↓
  ╲      ← drip loop, su damla
   ╲
    ╲
     ╱
    ╱
   ╱
  ╱
  │
[Cihaz / bina]
```

Çok basit ama **çok etkili** — su damlaları cihazlara değil yere düşer.

### Drip loop kuralları

-   Kablo cihaz seviyesinin **20 cm altına** insin
-   "U" şekli net (Z şekli değil)
-   Drip noktasında plastik kelepçe yok (su tutar)

## Konnektör tipleri ve su direnci

### PL-259 / SO-239 (UHF konnektör)

-   **Su direnci: zayıf** — yapısı gevşek
-   HF'te yaygın, ucuz, lehimle kolay
-   **"Süreksizlik problemi"**: PL-259'un iç yapısı koaks gibi hassas geometriye sahip değil — 300 MHz üzerinde içindeki boşluklar empedansı bozar, "konnektör kaynaklı SWR" yaratır. HF'te sorun yok ama **UHF'te PL-259 kullanma**
-   **Outdoor için tape + grease ZORUNLU**

### N-type

-   **Su direnci: mükemmel** (built-in gasket)
-   Kablonun iç yapısını konnektörün içine kadar **milimetrik hassasiyetle** devam ettirir — empedans sürekliliği
-   VHF/UHF için ideal, 11 GHz'e kadar düşük kayıp
-   Pahalı + takılması zor (özel anahtar)
-   Outdoor preferred — profesyonellerin tek tercihi

### BNC

-   **Quick-connect** — bayonet lock
-   Su direnci orta
-   Düşük güç + iç mekan için

### SMA

-   Küçük — el telsizi, NanoVNA, HackRF
-   Yüksek frekansta mükemmel (18 GHz'e kadar)
-   Su direnci kötü (mikro boyut)
-   **Dikkat: fazla sıkılırsa iç iğnesi kırılır** — ince mekanik yapı. Parmakla sıkıla, pense kullanma. Kırık SMA = cihaz servise gider
-   Sadece iç mekan / araç

### Önerilen

-   **Çatı vertical / Yagi**: N konnektörler
-   **Apartman balkonu**: PL-259 OK + iyi sealing
-   **Mobile**: BNC veya SMA (genelde araç içine doğru)

## UV (güneş) korumasının önemi

Plastik / rubber malzemeler UV ile **yıkımlanır**:

-   1 yaz ardından coax dış kabuk çatlamaya başlar
-   Self-amalgamating tape direkt güneşe **2 yıl** dayanır
-   PVC tape direkt güneşe **5+ yıl**

### Pratik

1.  Self-amalgamating tape (su yalıtım)
2.  Üstüne **PVC electrical tape** (UV koruma katmanı)
3.  **Heat-shrink tubing** ek seçenek

### Heat-shrink (3:1 adhesive lined)

-   Heat gun ile büzülür
-   İçinde adhesive var (su yalıtım)
-   Konnektör üstüne geçirip ısıt — siyah, profesyonel görünüm
-   Yenisi sökmek zorlaşır

## Anten besleme noktası özel

Dipole'un ortası — koaks bağlandığı yer:

-   Plastik dipole center insulator (hazır kit)
-   İçinde SO-239
-   **Bu insulator'i kapatmaya gerek yok** — plastik UV-rated
-   Sadece SO-239 connection point su yalıtım

### Loop / Yagi

-   Beslemenin altında **drain hole** açık tutmak gerek (su hapsedilmesin)
-   Aksi takdirde içeride condensation birikir, kış don ile çatlar

## Senaryo: 5 yıl yağmur sonra

Eğer kötü kurulmuşsa 5 yıl sonra:

-   PL-259 dış pasince yeşil oksit
-   Center pin pas
-   Coax dielektrik nem (su geçirir gibi)
-   SWR sürekli 3-5 (kararsız)
-   TX gücün yarısı kayıp

**Çözüm**: kabloyu **30 cm** kısalt (zarar gören kısmı kes), yeni konnektör, taze sealing.

## Adım adım kurulum (PL-259 outdoor)

### Malzeme

-   1× PL-259 silver-plated
-   Self-amalgamating tape (Scotch 23)
-   PVC electrical tape (Scotch 33+ siyah)
-   Dielectric grease tüpçük
-   Heat gun (opsiyonel)
-   60/40 lehim teli

### Adım 1: Lehim PL-259

-   Coax outer braid PL-259 outer'a
-   Center conductor PL-259 inner pin'e
-   Lehim **sıcak + kısa süre** (dielektrik yanmaması için)

### Adım 2: Görsel kontrol

-   Mekanik gevşeklik yok
-   Lehim soğuk değil (parlak gümüş, mat değil)
-   Coax içeri gerek yok

### Adım 3: Dielectric grease

-   Center pin + outer threadlerine ince
-   Connector iç yüzeylerine ince katman

### Adım 4: SO-239 takma

-   Connector'i sıkıştır manual sıkı
-   Vurma + zorlama yok (elle sıkı yeter)

### Adım 5: Self-amalgamating tape

-   Coax üstünden başla, 5 cm öncesinden
-   50% overlap, 50% stretch
-   Connector boyunca 5 cm sonraya kadar
-   2 kat sar

### Adım 6: PVC tape

-   Self-amalgamating tape üstüne
-   50% overlap
-   Aynı bölgede 2 kat
-   UV koruma + mekanik koruma

### Adım 7: Drip loop

-   Cihaz girmeden 30 cm aşağı U yap
-   Plastik kablo bağı ile sabitle
-   Drain noktası açık

### Adım 8: Test

-   SWR ölç (yağmurdan önce + yağmurdan sonra) — değişmemeli
-   6 ay sonra tekrar test
-   1 yıl sonra görsel + retape gerekirse

## Sık yapılan hatalar

### 1\. Sealing yokluğu

"Yarın yapacağım" → 2 hafta sonra yağmur, korozyon başladı.

### 2\. Yetersiz tape

Sadece konnektör üzerine 1 sarım → su tape kenarından girer. **5+5 cm overlap** zorunlu.

### 3\. Yanlış tape

Klasik electrical tape (PVC) tek başına su geçirir. **Self-amalgamating** zorunlu, PVC sadece UV koruma.

### 4\. Drainage yok

Closed loop antene yer altında → içeride su hapsedilmiş. **Drain hole** kritik.

### 5\. Pas tape (Çince ucuz)

3M veya benzeri kaliteli marka — Çince ucuz tape 6 ayda çatlar.

### 6\. Coax kırılı / kink

Konnektörden 10 cm ötede coax kink → su path. Coax temiz.

## Bakım takvimi

-   **Aylık**: SWR check (anomalia tespit)
-   **6 aylık**: görsel check, tape soluk / çatlak mı
-   **Yıllık**: full retape, dielectric grease tekrarla
-   **Kış öncesi**: drainage holes açık, donma direnci kontrol
-   **Yaz sonu**: UV hasar değerlendirme

## Sık sorulan sorular

### En ucuz çözüm?

Self-amalgamating tape Çince muadili (~30 TL/rolo) yerine 3M (~50 TL). 20 TL fark ama 5 yıl ömür farkı.

### Heat shrink tek başına yeter mi?

Hayır — heat shrink mekanik koruma + UV. **İçindeki adhesive sealing** anlık başarılı ama yaşa adet kötüleşir. Birlikte tape kullan.

### N-type için sealing gerek mi?

Evet, yine de. N-type built-in gasket helpful ama %100 değil. Ekstra tape katmanı uzun ömür.

### Apartman balkon için aşırı mı?

Hayır — apartman balkonunda yağmur var. Tape gerek. Sadece **drainage** önemi düşük (zaten yer açık, su biriken yer yok).

### Pencere geçişi nasıl?

**Bulkhead connector** ya da **bulkhead PL-259**. Pencere kasasına monte, **odaya su girmesin**. İç ile dış arası feedthrough.

* * *

## İlgili kaynaklar

-   [Koaksiyel kablo seçimi](/tutorials/koaksiyel-kablo-secimi) — RG-8X, RG-213, LMR-400
-   [SWR temel](/tutorials/swr-temel-bilgisi) — su girişi etkisi
-   [HF dipole + EFHW yapımı](/tutorials/hf-dipole-efhw-anten)
-   [Vertical anten detay](/tutorials/dikey-vertical-anten-detay)
-   [RF topraklama + yıldırım](/tutorials/rf-topraklama-yildirim-koruma)
-   **Genişletilmiş kaynak:** [telsizcilik.com](https://telsizcilik.com/) — su yalıtım makaleleri
