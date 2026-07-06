document.addEventListener("DOMContentLoaded", () => {
    
    // --- 1. QUẢN LÝ BÌNH LUẬN THỜI GIAN THỰC ---
    const currentPath = window.location.pathname;
    let pageKey = "global_comments";
    
    // Tạo phân vùng dữ liệu bình luận riêng biệt cho từng trang bài viết
    if (currentPath.includes("tin-tuc.html")) pageKey = "news_comments";
    else if (currentPath.includes("xu-huong.html")) pageKey = "trend_comments";
    else if (currentPath.includes("lam-dep.html")) pageKey = "beauty_comments";

    // Khởi tạo bình luận giả lập ban đầu nếu chưa có dữ liệu lưu trữ
    const defaultComments = [
        { user: "Khánh An (Model)", text: "Nội dung phân tích bài viết rất sâu sắc và đúng thực tế!" },
        { user: "Hoàng Phong", text: "Thiết kế giao diện tạp chí nhìn chất và cháy mắt thật sự." }
    ];

    let comments = JSON.parse(localStorage.getItem(pageKey)) || defaultComments;

    const commentForm = document.getElementById("commentForm");
    const commentInput = document.getElementById("commentInput");
    const commentList = document.getElementById("commentList");
    const commentCount = document.getElementById("commentCount");

    function renderComments() {
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

    renderComments();

    if (commentForm) {
        commentForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const textValue = commentInput.value.trim();
            if (!textValue) return;

            comments.unshift({ user: "Bạn (Vừa xong)", text: textValue });
            localStorage.setItem(pageKey, JSON.stringify(comments));
            renderComments();
            commentInput.value = "";
        });
    }

    // --- 2. QUẢN LÝ SUBMIT FORM ĐĂNG NHẬP ---
    const pageLoginForm = document.getElementById("pageLoginForm");
    if (pageLoginForm) {
        pageLoginForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const email = pageLoginForm.querySelector("input[type='email']").value;
            alert(`[VOGUE X SYSTEM]:\nĐồng bộ tài khoản thành công! Chào mừng hội viên VIP: ${email}`);
            window.location.href = "index.html"; // Chuyển về trang chủ sau khi đăng nhập xong
        });
    }
});
