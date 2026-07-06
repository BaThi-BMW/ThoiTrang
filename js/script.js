/**
 * VOGUE ELITE - CORE JAVASCRIPT SYSTEM
 * Hệ thống xử lý tương tác giao diện Tạp chí Thời trang & Phong cách.
 */

// === CHẶNG 01: Kiểm tra JavaScript đã chạy bằng console và biến ===
const siteName = "Vogue Elite";
let mainTopic = "Thời trang cao cấp & Phong cách đương đại";
let totalImages = 3;
let isSystemReady = true;

console.log("=== VOGUE ELITE FASHION JS LOADED ===");
console.log("Website Name:", siteName);
console.log("Chủ đề chính:", mainTopic);
console.log("Hệ thống sẵn sàng:", isSystemReady);

// === CHẶNG 02: Đổi nội dung tiêu đề bằng DOM ===
const mainTitle = document.getElementById("mainTitle");
const welcomeText = document.getElementById("welcomeText");

if (mainTitle && welcomeText) {
    mainTitle.textContent = "ĐẤU TRƯỜNG THỜI TRANG CAO CẤP";
    welcomeText.textContent = "Cập nhật các bộ sưu tập đỉnh cao và khoảnh khắc sàn diễn huyền thoại.";
}

// === CHẶNG 03: Thêm nút chào mừng bằng sự kiện click ===
const helloBtn = document.getElementById("helloBtn");
const helloResult = document.getElementById("helloResult");

if (helloBtn && helloResult) {
    helloBtn.addEventListener("click", function() {
        helloResult.textContent = "Chào mừng Fashionista! Chúc bạn tìm thấy những cảm hứng phối đồ thời thượng nhất tại bản tin năm nay!";
    });
}

// === CHẶNG 05: Menu tương tác (Mở/đóng menu khi responsive) ===
const menuToggle = document.getElementById("menuToggle");
const mainMenu = document.getElementById("mainMenu");

if (menuToggle && mainMenu) {
    menuToggle.addEventListener("click", function() {
        mainMenu.classList.toggle("active");
    });
}

// === CHẶNG 08: Lọc Gallery ảnh theo nhóm (Sân khấu, Tuyển thủ -> Người mẫu, Cúp -> Giải thưởng) ===
const filterButtons = document.querySelectorAll(".filter-btn");
const galleryItems = document.querySelectorAll(".gallery-item");

filterButtons.forEach(function(button) {
    button.addEventListener("click", function() {
        // Xóa class active ở tất cả các nút và thêm vào nút vừa bấm
        filterButtons.forEach(btn => btn.classList.remove("active"));
        button.classList.add("active");

        const filterValue = button.dataset.filter;

        galleryItems.forEach(function(item) {
            const itemCategory = item.dataset.category;
            // Nếu chọn "all" hoặc trùng category thì hiện, ngược lại thì ẩn
            if (filterValue === "all" || itemCategory === filterValue) {
                item.style.display = "block";
            } else {
                item.style.display = "none";
            }
        });
    });
});

// === CHẶNG 09: Kiểm tra Form đăng ký trước khi gửi (submit + preventDefault) ===
const contactForm = document.getElementById("contactForm");
const fullName = document.getElementById("fullName");
const email = document.getElementById("email");
const formMessage = document.getElementById("formMessage");

if (contactForm && fullName && email && formMessage) {
    contactForm.addEventListener("submit", function(event) {
        // Ngăn trình duyệt load lại trang
        event.preventDefault();

        const nameValue = fullName.value.trim();
        const emailValue = email.value.trim();

        // Kiểm tra họ tên trống
        if (nameValue === "") {
            formMessage.textContent = "⚠️ Vui lòng nhập tên Trưởng nhóm / Nhà thiết kế!";
            formMessage.style.color = "#ff003c";
            return;
        }

        // Kiểm tra email trống hoặc thiếu ký tự @
        if (emailValue === "" || !emailValue.includes("@")) {
            formMessage.textContent = "⚠️ Vui lòng nhập địa chỉ Email liên hệ hợp lệ!";
            formMessage.style.color = "#ff003c";
            return;
        }

        // Nếu tất cả hợp lệ
        formMessage.textContent = "✔️ Đăng ký tham gia tuần lễ thời trang thành công! Hội đồng nghệ thuật sẽ liên hệ sớm nhất.";
        formMessage.style.color = "#00ff66";
        
        // Reset form sau khi gửi thành công
        contactForm.reset();
    });
}
