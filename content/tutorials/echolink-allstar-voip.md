---
title: Echolink ve Allstar Link — VoIP ile Amatör Radyo (PC + Telefon)
description: >-
  Echolink, Allstar Link ve IRLP — internet üzerinden global röle bağlantısı,
  kayıt + lisans doğrulama, mobil app kurulumu, telsizsiz amatör radyo deneyimi.
keywords:
  - echolink
  - allstar
  - voip
  - irlp
  - mobil
  - gateway
article_section: echolink
published_at: '2026-04-26'
updated_at: '2026-04-26'
faq:
  - q: Echolink ve Allstar farkı nedir?
    a: >-
      Echolink: kapalı, basit, mobile app. Allstar: open-source, esnek, biraz
      teknik
  - q: 'Lisansım yok, kayıt olabilir miyim?'
    a: '**Hayır** — kayıt + validation lisans şartı'
  - q: Validation kaç gün sürüyor?
    a: 24-72 saat (manuel onay)
  - q: 'Mobile app''te ses kötü, çözüm?'
    a: WiFi şart (cellular dalgalı). VOX yerine PTT mode
  - q: Telsiz olmadan amatör radyo bu mu sayılır?
    a: >-
      RF yayını yok ama amatör operatörlerle konuşuyorsun, **gerçek QSO**
      sayılır (Echolink kontestleri var)
  - q: 'Çağrı işaretim eski stil (3 harfli kuyruk), kabul mu?'
    a: 'Evet, format önemli değil — geçerli lisans yeter'
  - q: Encryption var mı?
    a: >-
      Hayır. Tüm trafik açık (Internet HTTPS olabilir ama içerik amatör kuralı:
      encryption yasak)
---
## VoIP amatör radyo nedir?

**VoIP gateway sistemleri** (Echolink, Allstar Link, IRLP) — RF röleleri **internet üzerinden** birbirine bağlayan, böylece **bir telsiziniz olmadan bile** amatör radyo iletişimine erişmenizi sağlayan altyapılardır.

Mantık çok basit:

1.  Bir röle internet'e bağlanır (gateway sunucusu)
2.  Sen telefonun veya bilgisayarınla VoIP node'a bağlanırsın
3.  Konuşman röle frekansından **RF** olarak yayınlanır → uzakta telsizi olan amatörler duyar
4.  Onlar telsizden konuşur → röle internet'e basar → senin cihazına gelir

```
[ Telefonun ]──Internet──[ Echolink server ]──Internet──[ Röle gateway ]──RF──[ Amatör operatör ]
                                                              ▲
                                                              └── HF/VHF/UHF röle, dünyanın herhangi bir köşesi
```

**Lisans şart:** Tüm bu sistemler **çağrı işareti doğrulaması** ister. Türkiye'den Avustralya'daki röleye bağlanıp Türkçe veya İngilizce konuşabilirsin.

## Üç ana sistem

| Sistem | Sunan | Kapsam | Erişim | Lisans |
| --- | --- | --- | --- | --- |
| **Echolink** | K1RFD (Jonathan Taylor) | Dünya genelinde 200,000+ kayıtlı kullanıcı | Win/Mac/iOS/Android + Linux Docker | Lisans belgesi taraması ile validation |
| **Allstar Link** | Allstar topluluğu (open source) | Asilon (Asterisk PBX) tabanlı, geniş node ağı | Linux (Pi) node, mobile SIP, web UI | DMR ID benzeri kayıt |
| **IRLP** (Internet Radio Linking Project) | David Cameron VE7LTD (Vancouver) | Amerikan + Avrupa-ağırlıklı, ~2000 node | Linux node + RF, mobil yok | Sponsor + lisans doğrulama |

**Çoğu Türk amatör için: Echolink** — en basit kurulum, mobil app ile zero-overhead başlangıç.

## Echolink — kurulum

### Adım 1: Kayıt + lisans doğrulama

[**echolink.org**](https://www.echolink.org) → "Sign Up" → callsign + e-mail + şifre.

**Doğrulama (kritik):** Echolink lisanssız hesap kabul etmez. `validation@echolink.org`'a şu bilgilerle e-posta gönder:

-   Adın, soyadın
-   Çağrı işaretin (örn. TA1ABC)
-   **Lisans belgenin taranmış kopyası** (PDF veya net JPG)

24-72 saat içinde "validated" e-postası gelir. Ondan önce hesabın login olur ama **konuşmaya katılamazsın** (text-only chat).

### Adım 2: Mobil app (en kolay)

| Platform | Link |
| --- | --- |
| **iOS** | App Store → "EchoLink" (K1RFD) |
| **Android** | Play Store → "EchoLink" |

Aç → callsign + şifre → giriş.

Ana ekranda:

-   **Conference**: çoklu kişi konferans odaları (örn. `*TURKEY*`, `*EUROPE*`)
-   **Repeater**: dünya genelinde Echolink-bağlı röleler (`-R` ekli)
-   **Link**: tek-yönlü gateway'ler (`-L` ekli)
-   **Index**: çevrimiçi tüm node'lar — arama yap

### Adım 3: Bir node'a bağlan

Listeden ilgi çeken bir node seç (örn. `TA2KS-R` — Türk röle gateway):

1.  Tıkla → Connect
2.  Yeşil ışık → bağlandın
3.  **Mikrofona bas (PTT)** → konuş
4.  Bırakırsan diğer operatörler konuşabilir

Mobil app'de "PTT" sayfasında büyük yeşil buton var; basılı tut + konuş + bırak.

### Adım 4: Desktop client (Windows + Mac)

[echolink.org/download](https://www.echolink.org/download.htm) → Win EchoLink veya MacEchoLink.

Avantaj: Ses kalitesi mobile'dan iyi, klavye kısayolları, çoklu pencere. Linux için **Docker image** ([github.com/echolink-docker](https://github.com)) veya [thebridge](https://github.com/dl1hrc/thebridge) alternative.

## TR Echolink topluluğu

Türkiye'de aktif Echolink röle gateway'leri:

| Node ID | Çağrı işareti | Konum |
| --- | --- | --- |
| **TA1ABC-R** | tipik İstanbul (örnek) | Marmara |
| **TA3XYZ-R** | İzmir/Ege röle | Ege |
| **YM5AAA-R** | Ankara | Anadolu |

(Liste dinamik; [echolink.org/logins.jsp](http://www.echolink.org/logins.jsp) ile aktif TA-prefiks node'ları gör.)

**Kararlı conference rooms:**

-   `*TURKEY*` (TA conference) — Türk amatörlere özel
-   `*EUROPE*` — Avrupa geneli
-   `*WORLD*` — global

Akşam 19:00-23:00 TRT en yoğun.

## Allstar Link — daha gelişmiş

Allstar Link, Asterisk PBX tabanlı (Linux servisi olarak). Avantajları:

-   Open-source, full kontrol
-   HF + VHF/UHF + DMR + analog hepsi tek node'da
-   Echolink + IRLP'ye köprü
-   Pi-Star benzeri kişisel node kurulabilir

### Kişisel node kurulumu (gelişmiş)

1.  [allstarlink.org](https://allstarlink.org) → "ASL3" image indir (Pi 3/4 için)
2.  SD card → Pi'yi başlat → Web UI
3.  Node ID için [allstarlink.org/portal/](https://allstarlink.org/portal/) → kayıt
4.  Lisans doğrulama (FCC ulr veya Türk belgesi PDF)
5.  URI ile telsiz bağla (USB ses kartı + USB→serial PTT)
6.  Diğer node'lara bağlan: `*<node-id>` PTT komut

### Hazır node'lara mobile bağlanma

Allstar'da kendin node kurmadan da [WebTransceiver](https://web.dvswitch.org/) gibi web tabanlı arayüzler ile bağlanabilirsin. Login + lisans doğrulama yine şart.

## IRLP — eskinin standardı

David Cameron VE7LTD'nin 1997'de başlattığı sistem. Hâlâ aktif ama yeni node kurmak için **sponsor** gerek (link node = $50, validation paneli onayı). Avantajı sıkı denetim → spam yok.

Çoğu yeni amatör Echolink veya Allstar tercih ediyor; IRLP mature topluluk için.

## Etiket — VoIP konuşma kuralları

RF konuşmasıyla aynı kurallar + bonuslar:

-   **Long Path:** node bağlandıktan sonra **3-5 sn bekle**, sonra konuş — internet latency'si var
-   **Önce dinle**: bir conference room'a girince hemen PTT basma. 30 sn dinle, sonra çağrı yap
-   **Çağrı**: _"This is TA1ABC, monitoring on Echolink"_ veya _"TA1ABC, Echolink üzerinden test"_
-   **Sade tut**: VoIP üzerinden konuşurken karşı tarafın da RF mi yoksa VoIP mi olduğu belli değil. Kısa, anlaşılır
-   **Net'lere katıl**: Çoğu conference room'un haftalık planlı net'i var (Pazar 21:00 vb.) — listede + duyuru kanalı

## Gateway teknik altyapı (Sysop modu)

EchoLink sadece "uygulama" değil — bir **Radio-over-IP (RoIP)** altyapısı. Profesyonel kurulumlarda bilinmesi gerekenler:

### Link (-L) vs Repeater (-R)

-   **Simplex Link (-L)**: tek telsiz + bilgisayar → internete bağlı. İnternetten gelen ses VOX veya COR (Carrier Operated Relay) ile telsizin PTT'sini tetikler.
-   **Repeater Node (-R)**: röle sisteminin tamamı EchoLink ağına dahil. Dünyanın herhangi yerindeki kullanıcı, o bölgenin yerel rölesinden yüksek güçlü RF çıkışına sahip olur.

### Port yönlendirme (router)

EchoLink kararlı çalışması için router'da port forwarding:

-   **UDP 5198 + 5199** — ses trafiği
-   **TCP 5200** — kontrol trafiği
-   QoS (Quality of Service) ayarları ile ses gecikmesini minimize et

### Mandal geçiş bekleme

İnternet paketi + röle switching süresi nedeniyle her mandal değişiminde **en az 2-3 saniye bekle**. Yoksa ilk 1-2 saniye kopuk gelir. Karşı tarafın "kuyruk" (tail) bırakmasına izin ver.

### Konferans odası disiplini

Multi-user conference'larda (örn. TR Conference):

-   Aynı anda tek kişi konuşur — mandala basınca herkesi kesersin
-   CQ yerine sadece "check-in" yap
-   Uzun monolog yapma

## Sık sorulan sorular

| Soru | Cevap |
| --- | --- |
| Echolink ve Allstar farkı nedir? | Echolink: kapalı, basit, mobile app. Allstar: open-source, esnek, biraz teknik |
| Lisansım yok, kayıt olabilir miyim? | **Hayır** — kayıt + validation lisans şartı |
| Validation kaç gün sürüyor? | 24-72 saat (manuel onay) |
| Mobile app'te ses kötü, çözüm? | WiFi şart (cellular dalgalı). VOX yerine PTT mode |
| Telsiz olmadan amatör radyo bu mu sayılır? | RF yayını yok ama amatör operatörlerle konuşuyorsun, **gerçek QSO** sayılır (Echolink kontestleri var) |
| Çağrı işaretim eski stil (3 harfli kuyruk), kabul mu? | Evet, format önemli değil — geçerli lisans yeter |
| Encryption var mı? | Hayır. Tüm trafik açık (Internet HTTPS olabilir ama içerik amatör kuralı: encryption yasak) |

## Pratik kullanım önerileri

-   **Sabah/öğlen** TR conference room'u boştur — pratik için ideal
-   **Akşam** dünya geneli aktif — DX dinleme için iyi
-   Eğer mobil cihazınla aktif konuşmuyorsan **monitor mode** — ekstra bandwidth/pil minimal
-   Allstar node kurarsan, evdeki röleyi internet'le birleştirip **dış-bölgeden konuşma** yapabilirsin (komşu/aile için)

## Yararlı kaynaklar

-   [Echolink resmi](https://www.echolink.org)
-   [TAMSAT EchoLink Türkçe](https://www.tamsat.org.tr/tr/voip-echolink-nedir/)
-   [ANTRAK EchoLink kurulumu (TR)](https://antrak.org.tr/genel/echolink-kurulumu-ve-kullan%C4%B1m%C4%B1/)
-   [Amatör Telsizcilik Bilgi Portalı](https://amatortelsiz.com.tr/echolink-uygulamasina-nasil-giris-yapilir.ham)
-   [Allstar Link resmi](https://allstarlink.org)
-   [IRLP](https://www.irlp.net)

## Sıradaki adımlar

-   [Çağrı İşareti Nasıl Alınır](/tutorials/cagri-isareti-nasil-alinir) — Echolink validation için lisans şart
-   [DMR Nedir](/tutorials/dmr-nedir-anytone-d878uv) — VoIP'in dijital amatör versiyonu
-   [APRS Nedir](/tutorials/aprs-nedir-nasil-kullanilir) — Internet + RF kombo paket sistemi
-   [WinLink — Acil Durum E-mail](/tutorials/winlink-email-over-radio) — RF ile e-posta

73, ve `*TURKEY*` conference'da görüşürüz!
