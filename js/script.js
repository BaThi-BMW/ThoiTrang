/**
 * VOGUE X - CORE JAVASCRIPT SYSTEM (FIXED)
 * Khắc phục lỗi Null Elements khi dùng chung file JS cho nhiều trang HTML khác nhau.
 */

document.addEventListener("DOMContentLoaded", () => {
    
    // --- 1. PHÂN VÙNG DỮ LIỆU BÌNH LUẬN CHO TỪNG TRANG ---
    const currentPath = window.location.pathname;
    let pageKey = "global_comments";
    
    if (currentPath.includes("tin-tuc.html")) pageKey = "news_comments";
    else if (currentPath.includes("xu-huong.html")) pageKey = "trend_comments";
    else if (currentPath.includes("lam-dep.html")) pageKey = "beauty_comments";

    // Bình luận mặc định ban đầu
    const defaultComments = [
        { user: "Khánh An (Model)", text: "Nội dung phân tích bài viết rất sâu sắc và đúng thực tế!" },
        { user: "Hoàng Phong", text: "Thiết kế giao diện tạp chí nhìn chất và cháy mắt thật sự." }
    ];

    // Lấy dữ liệu từ bộ nhớ trình duyệt (LocalStorage)
    let comments = JSON.parse(localStorage.getItem(pageKey)) || defaultComments;

    // Lấy các phần tử HTML (DOM)
    const commentForm = document.getElementById("commentForm");
    const commentInput = document.getElementById("commentInput");
    const commentList = document.getElementById("commentList");
    const commentCount = document.getElementById("commentCount");

    // Hàm vẽ danh sách bình luận ra giao diện
    function renderComments() {
        // SỬA LỖI: Chỉ chạy nếu trang hiện tại CÓ danh sách hiển thị bình luận
        if (!commentList) return; 
        
        commentList.innerHTML = "";
        comments.forEach(item => {
            const div = document.createElement("div");
            div.className = "comment-item";
            div.innerHTML = `<strong>${item.user}:</strong><p>${item.text}</p>`;
            commentList.appendChild(div);
        });
        
        if (commentCount) commentCount.textContent = comments.length;
    }

    // Chạy hàm hiển thị bình luận lần đầu
    renderComments();

    // Xử lý sự kiện gửi bình luận
    // SỬA LỖI: Chỉ kích hoạt nếu trang hiện tại CÓ form bình luận
    if (commentForm && commentInput) {
        commentForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const textValue = commentInput.value.trim();
            if (!textValue) return;

            comments.unshift({ user: "Bạn (Vừa xong)", text: textValue });
            localStorage.setItem(pageKey, JSON.stringify(comments));
            renderComments();
            commentInput.value = ""; // Xóa trống ô nhập
        });
    }

    // --- 2. QUẢN LÝ FORM ĐĂNG NHẬP ---
    const pageLoginForm = document.getElementById("pageLoginForm");
    
    // SỬA LỖI: Chỉ kích hoạt nếu đang đứng ở trang dang-nhap.html (nơi có form đăng nhập)
    if (pageLoginForm) {
        pageLoginForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const emailInput = pageLoginForm.querySelector("input[type='email']");
            const email = emailInput ? emailInput.value : "Thành viên";
            
            alert(`[VOGUE X SYSTEM]:\nĐồng bộ tài khoản thành công! Chào mừng hội viên VIP: ${email}`);
            window.location.href = "index.html"; // Chuyển hướng người dùng về trang chủ
        });
    }
});
