document.addEventListener("DOMContentLoaded", function () {
    
    // --- KHAI BÁO BIẾN CHO POPUP ĐĂNG NHẬP ---
    const loginModal = document.getElementById("loginModal");
    const loginBtn = document.getElementById("loginBtn");
    const closeBtn = document.getElementById("closeBtn");
    const loginForm = document.getElementById("loginForm");
    const openLoginFooter = document.querySelector(".open-login-footer");

    // Hàm mở popup đăng nhập
    function openModal(e) {
        e.preventDefault();
        loginModal.style.display = "flex";
    }

    // Hàm đóng popup đăng nhập
    function closeModal() {
        loginModal.style.display = "none";
    }

    // Gán sự kiện click cho các nút Đăng nhập
    if (loginBtn) loginBtn.addEventListener("click", openModal);
    if (openLoginFooter) openLoginFooter.addEventListener("click", openModal);
    if (closeBtn) closeBtn.addEventListener("click", closeModal);

    // Click ra ngoài biểu mẫu sẽ tự động đóng popup
    window.addEventListener("click", function (e) {
        if (e.target === loginModal) {
            closeModal();
        }
    });

    // Xử lý nộp Form đăng nhập thành viên viên
    if (loginForm) {
        loginForm.addEventListener("submit", function (e) {
            e.preventDefault(); // Ngăn trang reload
            const emailInput = loginForm.querySelector("input[type='email']").value;

            alert(`Chào mừng thành viên [ ${emailInput} ] đăng nhập hệ thống thành công!`);
            closeModal();
            loginForm.reset(); // Xóa sạch dữ liệu ô nhập

            // Thay đổi chữ trên thanh menu sau khi đăng nhập thành công
            if (loginBtn) {
                loginBtn.textContent = "Tài Khoản";
                loginBtn.style.background = "#ff3366";
            }
        });
    }

    // --- KHAI BÁO BIẾN CHO PHẦN BÌNH LUẬN ĐỘNG ---
    const commentForm = document.getElementById("commentForm");
    const commentInput = document.getElementById("commentInput");
    const commentList = document.getElementById("commentList");
    const commentCount = document.getElementById("commentCount");

    let count = 2; // Số lượng bình luận mặc định ban đầu

    if (commentForm && commentList) {
        commentForm.addEventListener("submit", function (e) {
            e.preventDefault(); // Ngăn trình duyệt tải lại trang

            const text = commentInput.value.trim();

            if (text === "") return;

            // 1. Tạo cấu trúc khối bình luận mới bằng JS
            const newComment = document.createElement("div");
            newComment.className = "comment-item";
            newComment.innerHTML = `
                <strong>Bạn (Vừa xong):</strong>
                <p>${text}</p>
            `;

            // 2. Chèn bình luận mới lên vị trí đầu tiên của danh sách
            commentList.insertBefore(newComment, commentList.firstChild);

            // 3. Tăng số lượng bộ đếm bình luận hiển thị công khai
            count++;
            if (commentCount) commentCount.textContent = count;

            // 4. Reset dọn sạch khung nhập liệu
            commentInput.value = "";
        });
    }

    // --- MÔ PHỎNG CLICK VÀO CÁC LINK HOT CHUYỂN BÀI VIẾT ---
    const articleLinks = document.querySelectorAll(".article-link, .related-links a, .hero-content h2 a");
    articleLinks.forEach(link => {
        link.addEventListener("click", function (e) {
            // Nếu link chưa gán địa chỉ thực tế (đang để dấu #)
            if (this.getAttribute("href") === "#") {
                e.preventDefault();
                alert(`[Điều Hướng]: Hệ thống đang mở bài viết chi tiết:\n"${this.innerText}"`);
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        });
    });
});