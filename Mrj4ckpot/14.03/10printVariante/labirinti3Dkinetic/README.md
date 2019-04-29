# 10 PRINT / 3D Fluid #

![Imgur](https://i.imgur.com/PWff4rl.jpg)

Variante tridimensionale di 10 PRINT; colori e proporzioni delle celle vengono scelte a random durante l'avvio dello sketch.

Per mantenere **la memoria dei singoli caratteri**, necessaria a fare in modo che lo stesso carattere generato ad un estremo della matrice percorra tutta la lunghezza dello schermo per poi sparire. Tutti i valori della prima riga, come il 10 PRINT tradizionale, vengono estratti a caso tra 2, dopodichè al termine di un certo numero di iterazioni, i valori di ogni riga vengono scritti su quella riga successiva. In questo modo, gli elementi dell'ultima riga vengono eliminati, mentre nella prima riga viene fatto spazio per una nuova serie di valori estratti a caso tra 2. Aumentando il numero di valori estraibili, è possibile produrre un altro tipo di pattern interessante nel quale sono presenti spazi aperti.

**Le celle** riproducono le forme tridimensionali dei caratteri dell'originale 10 PRINT. I volumi sono stati realizzati definendo i vertici di un beginShape() in uno spazio tridimensionale, rispetto alla posizione del carattere sulla matrice.

**Il movimento fluido** è stato realizzato tramite un ciclo di traslazioni. l'intera matrice trasla sull'asse X positivo, per una distanza pari alla larghezza della cella. In questo modo, lo scorrimento "a scatti" dovuto allo spostamento dei valori della matrice, dalla riga A alla riga A+1, viene bilanciato simulando uno scorrimento fluido e senza fine.
