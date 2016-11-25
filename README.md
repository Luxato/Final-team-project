# Webtechnologies-final-project

1. Návrh grafického dizajnu pomocou CSS len v externom súbore. Responzívny dizajn + prispôsobenie
stránky pre tlač pomocou CSS.
2. Trojúrovňové menu. Menu bude dynamicky generované na základe údajov, ktoré budú vložené v poli.
3. Zobrazenie aktuálneho dátumu s meninami v daný deň. Súčasťou bude obojsmerné zisťovanie
priradenia dátumu a mena, t.j. po zadaní dátumu sa vypíše, kto má v daný deň meniny a po zadaní
mena sa vypíše, kedy má takáto osoba meniny. Pri zadávaní dátumu je potrebné zisťovať aj to, či je
dátum zmysluplný. Pri zlom zadaní dátumu sa nápoveda správnej syntaxe realizuje pomocou
tooltipu, ktorý bude realizovaný cez DOM2. Predpokladá sa, ze dátum sa bude dať zadať v tvare
31.3., t.j. nielen v tvare 31.03. Zoznam mien bude dodaný vo vhodnom formáte. Pri zadávaní mena do
formuláru sa bude dať vyhľadať aj meno bez diakritiky, pričom na veľkosti písmen nebude záležať.
4. Vytvorenie pripomienkovača osobných úloh. Do pripomienkovača sa zadá úloha, ktorá sa vypíše
medzi ostatnými úlohami na web stránke. Po zakliknutí, že je úloha spravená, sa úloha prestane
zobrazovať.
5. Zobrazenie počítadla osobných prístupov na stránku.
6. Zobrazenie histórie prehliadania vo forme path-based breadcrumbs (5 posledných podstránok).
7. Zobrazenie mapy Slovenska s markermi ukazujúcimi na miesta, kde sa nachádzajú na stránke
spracované technické pamiatky. Rozmiestnenie markerov sa bude robiť na základe GPS súradníc
definovaných vo vytvorenom json súbore. Tento bod bude realizovaný v dvoch prevedeniach:
 mapa Slovenska bude zobrazená prostredníctvom vhodného obrázku, ktorý si nájdete na internete (uveďte aj
zdroj obrázku).
 zobrazenie mapy Slovenska bude realizované pomocou Google maps.
8. Zobrazenie časovej osi vzniku spracovaných technických pamiatok. Údaj o vzniku pamiatky čerpajte
z json súboru. Pri kliknutí na bod osi s pamiatkou sa zvýrazní bod na mape a naopak.
9. Každý člen tímu spracuje info o dvoch technických pamiatkach na Slovensku vrátane fotografie
vybraných pamiatok. Zobrazenie tejto podstránky naformátujte tak, aby zverejnené pamiatky boli
na monitore umiestnené po dvoch vedľa seba (v dvoch stĺpcoch), pričom ľavý a pravý stĺpec bude
mať vizuálne iné pozadie (farba, okraj, vzor). Dbajte na to, aby obidve pozadia boli ukončené na
rovnakej úrovni (automaticky podľa dĺžky textu v dlhšom z nich). Zobrazenie článkov na smartfóne
a pri tlači riešte pod sebou.
Každý člen súboru dodá info do spoločného json súboru pamiatky.json, ktorý vytvorte v
nasledovnom formáte
{"pamiatky":[
{"nazov":"X1", "rokVzniku":“Y1", "sirka":"Z1a", "dlzka":"Z1b"},
{"nazov":"X2", "rokVzniku":“Y2", "sirka":"Z2a", "dlzka":"Z2b"},
{"nazov":"X3", "rokVzniku":“Y3", "sirka":"Z3a", "dlzka":"Z3b"}
]}