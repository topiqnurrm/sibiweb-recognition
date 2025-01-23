    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Royal Pay</title>
        <style>

            footer h2 {
                color: #c9e4e4;
            }

            footer h3 {
                color: #c9e4e4;
            }

            footer p {
                color: #c9e4e4;
            }

            body {
                font-family: Arial, sans-serif;
                margin: 0;
                padding: 0;
                background-color: #f2f2f2;
            }

            section {
                padding-top: 190px; /* Sesuaikan nilai padding-top sesuai dengan tinggi header dan kebutuhan desain Anda */
                height: 100vh; /* Set tinggi section menjadi 100% tinggi viewport */
                background-image: url('bg_emoney3.jpg'); /* Ganti path dengan path gambar latar belakang */
                background-size: cover; /* Memastikan gambar meliputi seluruh area section */
                background-position: left top; /* Posisikan gambar di tengah section */
                color: #747474; /* Warna teks untuk kontras dengan gambar latar belakang */
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                text-align: center;
            }

            section h2, section p {
                margin: 10px;
            }

            .anggotaparent{
                display: flex;
                justify-content: center;
                align-items: center;
                width: 1400px;
                flex-wrap: wrap; /* Agar item berada dalam baris baru jika lebar layar terlalu kecil */
                border-width: 3px; /* Ketebalan border */
                border-style: dashed ; /* Gaya border, bisa diganti dengan dashed, dotted, dll. */
                margin: auto; /* Memberikan margin otomatis di sisi kiri dan kanan, sehingga elemen berada di tengah */
                border-color: #28aaab;
            }

            .team-member {
                opacity: 0;
                transform: translateY(100px);
                transition: opacity 1s ease, transform 1s ease;
                display: block;
                margin-bottom: 10px;
                text-align: center;
                margin-right: 35px;
                margin-left: 35px;
                margin-top: 10px;
                font-size: 20px;
            }

            .team-member.visible {
                opacity: 1;
                transform: translateY(0);
            }

            .team-member img {
                border-radius: 10%;
                width: 200px;
            }

            .team-member-left, .team-member-right {
                opacity: 0;
                transform: translateX(-50px); /* Geser gambar ke kiri */
                transition: opacity 1s ease, transform 1s ease;
            }

            .team-member-left.visible, .team-member-right.visible {
                opacity: 1;
                transform: translateX(0); /* Setel kembali ke posisi awal */
            }

            .team-member-left {
                margin-right: 20px; /* Jarak antar gambar diatur agar tampil lebih baik */
            }

            .team-member-right {
                margin-left: 20px;
            }

            footer {
                text-align: center;
                padding: 1em;
                background-color: #2d9596;
                font-size: 20px;
                border: 2px solid #217c7d;
            }

            .container {
                display: flex;
                flex-direction: row;
                width: 100%;
                overflow: hidden;
                position: relative; /* Added position relative */
            }

            .penjelasan {
                margin-bottom: 30px;
                width: 1300px;
                font-size: 20px;
                color: #053030;
                flex: 0 0 100%;
                transition: transform 0.5s ease-in-out;
                margin: 0 auto; /* Center the penjelasan content within the container */
            }

            .copyright {
                margin-top: 50px;
                color : white;
                font-size: 17px;
            }

            .logo {
                margin-left: 40px;
                margin-top: 10px;
                margin-bottom: 10px;
            }

            .loginnya {
                margin-right: 40px;
                margin-top: 10px;
                margin-bottom: 10px;
            }

            .daftarkelompok {
                margin-bottom: 20px;
                margin-top: 10px;
            }

            .slider-container {
                margin-bottom: 20px;
                transition: font-size 0.3s ease;
            }

            header ul li a {
                font-size: 24px;
                text-decoration: none;
                position: relative;
                color: #c9e4e4;
                transition: color 0.3s ease, border-bottom 0.3s ease;
            }

            header ul li a:hover {
                font-size: 28px; /* Ubah nilai sesuai kebutuhan ukuran font yang diinginkan pada hover */
                color: white;
                border-bottom: 2px solid white; /* Adjust the thickness and color as needed */

            }

            header ul li a::before {
                content: '';
                position: absolute;
                width: 100%;
                height: 2px;
                bottom: 0;
                left: 0;
                background-color: transparent;
                visibility: hidden;
                transform: scaleX(0);
                transition: all 0.7s ease;
            }

            header ul li a:hover::before {
                visibility: visible;
                transform: scaleX(1);
                background-color: white; /* Adjust the color as needed */
            }

            header .loginnya a {
                position: relative;
                margin: 0 15px;
                text-decoration: none;
                color: #c9e4e4;
                letter-spacing: 2px;
                font-weight: 500px;
                transition: 0.6s;
            }

            header .loginnya a {
                font-size: 24px; /* Ubah nilai sesuai kebutuhan ukuran font yang diinginkan */
                text-decoration: none;
            }

            header .loginnya a:hover {
                color: white;
            }

            .parallax-bg {
                position: relative;
                background-image: url('bg_emoney3.jpg');
                background-attachment: fixed;
                background-position: center;
                background-repeat: no-repeat;
                background-size: cover;
                height: 100vh;
                display: flex;
                justify-content: center;
                align-items: center;
                color: white; /* Warna teks untuk kontras dengan gambar latar belakang */
            }

            .dark-overlay {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-color: rgba(0, 0, 0, 0); /* Awalnya transparan */
                z-index: 1; /* Atur z-index agar overlay berada di atas elemen lain */
                transition: background-color 0.5s ease; /* Efek transisi perubahan warna latar belakang */
                pointer-events: none; /* Menonaktifkan interaksi dengan elemen overlay */
            }

            .parallax-content {
                margin-top: -6px;
                text-align: center;
            }

            .parallax-content h2 {
                font-size: 36px;
                margin-bottom: -10px;
            }

            .parallax-content p {
                font-size: 20px;
                margin-bottom: 30px;
            }

            .slide-content p {
                font-size: 19px; /* Tambahkan nilai sesuai dengan kebutuhan ukuran font yang diinginkan */
            }

            .slide-content h2 {
                font-size: 19px; /* Tambahkan nilai sesuai dengan kebutuhan ukuran font yang diinginkan */
            }

            .middlehead{
                margin-right: 90px;
            }

            .scrolling-text {
                position: absolute;
                bottom: 0;
                left: 0;
                width: 100%;
                color: #2d9596;
                font-size: 40px;
                white-space: nowrap;
                overflow: hidden; /* Ensure the text doesn't overflow */
                z-index: 2; /* Set a higher z-index to ensure it's above the dark overlay */
                display: none; /* Initially hide the scrolling text */
            }

            .scrolling-text marquee {
                width: 100%;
                padding: 10px; /* Add some padding if needed */
            }

            .parallax-bg {
                position: relative;
                /* Add any other styles you have for parallax-bg */
            }

            .dark-overlay {
                /* Add styles for the dark overlay */
            }

            #bottom-of-overlay {
                position: absolute;
                bottom: 0;
                height: 1px; /* Ensure the div has some height */
                width: 100%;
            }

            /* Style for the login link */
            header .loginnya a {
                position: relative;
                margin: 0 15px;
                text-decoration: none;
                color: #c9e4e4;
                letter-spacing: 2px;
                font-weight: 500px;
                transition: 0.6s;
            }

            /* Underline effect on hover */
            header .loginnya a:hover {
                color: white;
                border-bottom: 2px solid white; /* Adjust the thickness and color as needed */
            }
        </style>
        <link rel = "stylesheet" href="header.css">
    </head>
    <body>
        <header>
            <a href="#" class="logo">Royal Pay</a>
            <div class="middlehead">
                <ul>
                    <li><a href="#">Beranda</a></li>
                    <li><a href="#">User</a></li>
                    <li><a href="#">Top Up</a></li>
                    <li><a href="#">Pembayaran</a></li>
                </ul>
            </div>
            <div class="loginnya">
                <a href="#"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-shopping-cart"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg></a>
                <a href="#"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-user"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg></a>
            </div>
            <link rel="stylesheet" href="gaya1.css">
            <link rel="stylesheet" href="hapus.css">
        </header>

        <script type="text/javascript">
            window.addEventListener("scroll", function(){
                var header = document.querySelector("header");
                header.classList.toggle("sticky", window.scrollY > 0);
            })
        </script>

        <section class="parallax-bg">
            <div class="dark-overlay"></div>

            <div class="parallax-content">
                <h2>Selamat Datang di Royal Pay</h2>
                <p>Platform e-money yang mengutamakan pelayanan dan kenyamanan anda</p>
                <!-- Tambahan elemen HTML atau konten lainnya sesuai kebutuhan -->
            </div>
            <div class="bungkus">
                <div class="slidenav">
                    <span id='slide-1'></span>
                    <span id='slide-2'></span>
                    <span id='slide-3'></span>

                    <div class="image">
                            <img src='waktuku4.png' style="margin-top: -25px;"/>
                            <img src='management5.png' style="margin-top: -25px;"/>
                            <img src='keamanan5.png' style="margin-top: -25px;"/>
                    </div>
                </div>
            </div>

            <!-- navigai gambar -->
            <!-- <div class="navgam">
                <a href='#slide-1'>1</a>
                <a href='#slide-2'>2</a>
                <a href='#slide-3'>3</a>
            </div> -->

            <div id="bottom-of-overlay"></div>
            <div id="bottom-of-page"></div>

            <!-- Scrolling text -->
            <div class="scrolling-text">
                <marquee behavior="scroll" direction="left" scrollamount="5">
                    ~ Sekian dan Terima Kasih Atas Perhatiannya ~
                </marquee>
            </div>

            <div class="slider-container">
            <div class="slider">
                <div class="slide" id="slide1">
                    <div class="slide-content">
                        <h2>Deskripsi</h2>
                        <p>Royal Pay adalah platform e-money yang menggabungkan keanggunan dan privilege layaknya seorang bangsawan dengan kemudahan dan inklusivitas teknologi finansial modern. Sebagai representasi kebanggaan dan kejayaan, Royal Pay menawarkan pengalaman transaksi yang istimewa dan layanan yang menyeluruh.</p>
                        <p>Royal Pay dirancang dengan megah sebagai simbol kemewahan dan royalitas. Singkatan "RP" yang merujuk pada rupiah, mata uang negara Indonesia, mencerminkan komitmen Royal Pay dalam mendukung perkembangan ekonomi nasional. Setiap transaksi dengan Royal Pay adalah langkah menuju kestabilan keuangan yang layak bagi setiap individu di Indonesia.</p>
                        <p>.</p>
                    </div>
                </div>
                <div class="slide" id="slide2">
                    <div class="slide-content">
                        <h2>Kelebihan</h2>
                        <div class="point" style="text-align: left; margin-left: 100px;">
                            <p>1. Memberikan kemudahan dan kecepatan dalam melakukan transaksi, mengurangi waktu yang dibutuhkan untuk pembayaran.</p>
                            <p>2. Memungkinkan pengelolaan keuangan yang lebih efisien.</p>
                            <p>3. Menerapkan tingkat keamanan yang tinggi dengan menggunakan teknologi seperti RFID untuk otentikasi, sehingga transaksi lebih aman.</p>
                            <p>4. Meningkatkan keterampilan pengembangan IoT, yang merupakan area yang terus berkembang.</p>
                        </div>
                    </div>
                </div>
                <div class="slide" id="slide3">
                    <div class="slide-content">
                        <h2>Latar Belakang</h2>
                        <p>Dalam era digital yang terus berkembang, penggunaan uang tunai bergeser ke metode pembayaran elektronik. Proyek IoT ini menggunakan teknologi RFID dan NodeMCU V3 untuk mengembangkan sistem E-Money, mengakomodasi kebutuhan masyarakat yang masih nyaman bertransaksi dengan uang tunai, sambil memberikan efisiensi dan keamanan.</p>
                        <p>Teknologi RFID dalam proyek ini meningkatkan keamanan dan mendukung pembayaran elektronik tanpa sentuhan. Kombinasi NodeMCU dengan sensor RFID memungkinkan transfer data transaksi melalui Wi-Fi, menjawab tuntutan masyarakat akan pembayaran modern, cepat, dan aman.</p>
                    </div>
                </div>
            </div>
            <button class="prev" onclick="changeSlide(-1)">❮</button>
            <button class="next" onclick="changeSlide(1)">❯</button>
            </div>
            <script src="hapus.js"></script>
        </section>
        <script>
            window.addEventListener("scroll", function () {
                var section = document.querySelector(".parallax-bg");
                var darkOverlay = section.querySelector(".dark-overlay");

                // Menghitung tinggi window
                var windowHeight = window.innerHeight;

                // Menghitung posisi scroll
                var scrollPosition = window.scrollY;

                // Menghitung tinggi section
                var sectionHeight = section.offsetHeight;

                // Menghitung posisi section dari atas halaman
                var sectionPosition = section.offsetTop;

                // Menghitung jarak antara posisi section dan posisi scroll
                var distanceFromSection = scrollPosition - sectionPosition;

                // Menghitung nilai opacity berdasarkan posisi scroll
                var opacity = Math.min(1, distanceFromSection / (windowHeight * 1.5)); // Nilai 0.7 dapat disesuaikan

                // Menentukan apakah berada di bagian atas atau paling bawah
                var isAtTop = scrollPosition === 0;
                var isAtBottom = scrollPosition + windowHeight >= document.body.scrollHeight;

                // Atur opacity overlay
                if (isAtTop) {
                    darkOverlay.style.backgroundColor = "rgba(45, 149, 150, 0)"; // Warna transparan saat di paling atas
                } else if (isAtBottom) {
                    darkOverlay.style.backgroundColor = "#4bb1b2"; // Warna #4bb1b2 dengan opacity 100% saat di paling bawah
                } else {
                    darkOverlay.style.backgroundColor = "rgba(45, 149, 150, " + opacity + ")"; // Warna #2d9596 dengan opacity yang semakin jelas saat digulir dari atas ke bawah
                }
            });
        </script>

        <script>
            window.addEventListener("scroll", function () {
                var scrollingText = document.querySelector(".scrolling-text");
                var bottomOfPage = document.body.offsetHeight - window.innerHeight;

                // Check if the bottom of the page is in the viewport
                if (bottomOfPage <= window.scrollY) {
                    scrollingText.style.display = "block"; // Show the scrolling text
                } else {
                    scrollingText.style.display = "none"; // Hide the scrolling text
                }
            });
        </script>

        <script>
            window.addEventListener("scroll", function () {
                var teamMembers = document.querySelectorAll(".team-member");

                teamMembers.forEach(function (member, index) {
                    var positionFromTop = member.getBoundingClientRect().top;

                    setTimeout(function () {
                        if (positionFromTop - window.innerHeight < 0) {
                            member.classList.add("visible");
                        } else {
                            member.classList.remove("visible");
                        }
                    }, index * 500); // Penambahan jeda berdasarkan urutan indeks
                });

                // Hapus class visible dari gambar yang tidak terlihat
                teamMembers.forEach(function (member) {
                    var positionFromTop = member.getBoundingClientRect().top;

                    if (positionFromTop - window.innerHeight >= 0 || positionFromTop <= 0) {
                        member.classList.remove("visible");
                    }
                });
            });
        </script>

    </body>

    <footer>
        <div class="daftarkelompok">
            <h3>Daftar Kelompok_1_F1</h3>
        </div>
        <div class="anggotaparent">
            <div class="team-member">
                <div class="team-member hidden team-member-left">
                    <img src="putri.png" alt="">
                    <p><span>Nurbaiti Saputri</span></p>
                    <p><span>NIM. 22520241007</span></p>
                </div>
            </div>
            <div class="team-member">
                <div class="team-member hidden team-member-right">
                    <img src="taufiq2.png" alt="">
                    <p><span>Taufiq Nurrohman</span></p>
                    <p><span>NIM. 22520241016</span></p>
                </div>
            </div>
            <div class="team-member">
                <div class="team-member hidden team-member-right">
                    <img src="bagas.png" alt="">
                    <p><span>Bagas Berlian Tri Cahyono</span></p>
                    <p><span>NIM. 22520244004</span></p>
                </div>
            </div>
            <div class="team-member">
                <div class="team-member hidden team-member-right">
                    <img src="hendy.png" alt="">
                    <p><span>Hendy Crisyanto</span></p>
                    <p><span>NIM. 22520249010</span></p>
                </div>
            </div>
        </div>

        <div class='copyright'>
            <p>Dosen Pengampu : Rizqi Aji Surya Putra, M.Pd.</p>
            <p>Dosen Pembimbing : Teguh Puji Widianto</p>
            <p>&copy; 2023 Proyek E-Money, Pendidikan Teknik Informatika, Fakultas Tenik, Universitas Negeri Yogyakarta</p>
        </div>
    </footer>
    </html>
