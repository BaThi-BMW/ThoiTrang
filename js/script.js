/**
 * VOGUE X - CORE JAVASCRIPT SYSTEM
 * Hệ thống xử lý nạp dữ liệu động không load lại trang.
 */

document.addEventListener("DOMContentLoaded", () => {
    
    // --- KHỞI TẠO CƠ SỞ DỮ LIỆU BÌNH LUẬN BAN ĐẦU ---
    const initialComments = [
        { user: "Kiều Anh (Hà Nội)", text: "Liệu công nghệ sợi sinh học này khi nào thì có ứng dụng thực tế tại sàn diễn Việt Nam vậy ạ?" },
        { user: "Hoàng Long", text: "Trang phục techwear phản quang phối với sneaker hầm hố nhìn cháy phố thực sự." }
    ];

    // Các phần tử DOM cần tương tác
    const commentForm = document.getElementById("commentForm");
    const commentInput = document.getElementById("commentInput");
    const commentList = document.getElementById("commentList");
    const commentCount = document.getElementById("commentCount");
    const loginModal = document.getElementById("loginModal");
    const loginBtn = document.getElementById("loginBtn");
    const closeBtn = document.getElementById("closeBtn");
    const loginForm = document.getElementById("loginForm");

    // --- HỆ THỐNG XỬ LÝ BÌNH LUẬN (RENDER ENGINE) ---
    function renderComments(commentsArray) {
        if (!commentList) return;
        commentList.innerHTML = ""; // Làm sạch danh sách cũ
        
        commentsArray.forEach(item => {
            const div = document.createElement("div");
            div.className = "comment-item";
            div.innerHTML = `
                <strong>${item.user}:</strong>
                <p>${item.text}</p>
            `;
            commentList.appendChild(div);
        });

        if (commentCount) commentCount.textContent = commentsArray.length;
    }

    // Tải bình luận mặc định khi trang web load xong
    renderComments(initialComments);

    // Xử lý khi có độc giả gửi comment mới
    if (commentForm) {
        commentForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const textValue = commentInput.value.trim();

            if (!textValue) return;

            // Thêm phần tử mới vào đầu mảng dữ liệu hiện tại
            initialComments.unshift({
                user: "Bạn (Vừa xong)",
                text: textValue
            });

            // Gọi hàm render lại giao diện mới cập nhật
            renderComments(initialComments);
            commentInput.value = ""; // Dọn sạch ô nhập liệu
        });
    }


    // --- HỆ THỐNG ĐIỀU KHIỂN POPUP ĐĂNG NHẬP THÀNH VIÊN ---
    const toggleModal = (show) => {
        if (loginModal) loginModal.style.display = show ? "flex" : "none";
    };

    if (loginBtn) loginBtn.addEventListener("click", (e) => { e.preventDefault(); toggleModal(true); });
    if (closeBtn) closeBtn.addEventListener("click", () => toggleModal(false));
    
    window.addEventListener("click", (e) => {
        if (e.target === loginModal) toggleModal(false);
    });

    // Xử lý gửi Form Đăng nhập hệ thống
    if (loginForm) {
        loginForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const email = loginForm.querySelector("input[type='email']").value;

            alert(`[VOGUE.X]: Đồng bộ tài khoản đám mây của thành viên thành công!\nChào mừng: ${email}`);
            toggleModal(false);
            loginForm.reset();

            // Cập nhật trạng thái hiển thị của nút đăng nhập trên Header
            if (loginBtn) {
                loginBtn.textContent = "DASHBOARD";
                loginBtn.style.background = "linear-gradient(45deg, #00f0ff, #0072ff)";
                loginBtn.style.boxShadow = "0 0 15px rgba(0,240,255,0.4)";
            }
        });
    }

    // --- MÔ PHỎNG SỰ KIỆN LIÊN KẾT ĐIỀU HƯỚNG ---
    const allLinks = document.querySelectorAll(".article-link, .related-links a, .hero-content h2 a");
    allLinks.forEach(link => {
        link.addEventListener("click", function (e) {
            if (this.getAttribute("href") === "#") {
                e.preventDefault();
                alert(`[Hệ thống]: Đang mã hóa và tải luồng bài viết chi tiết:\n"${this.innerText}"`);
                window.scrollTo({ top: 0, behavior: "smooth" });
            }
        });
    });
});
