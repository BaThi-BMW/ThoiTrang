$(document).ready(function() {
    // 1. Hiệu ứng Hover làm nổi bật các phân vùng chủ đề (Topic Box)
    $('.topic-box').hover(
        function() {
            $(this).css({'transform': 'scale(1.02)', 'transition': 'all 0.3s ease'});
        },
        function() {
            $(this).css('transform', 'scale(1)');
        }
    );

    // 2. Xử lý Form Bình luận động không tải lại trang (AJAX mô phỏng)
    $('#commentForm').on('submit', function(e) {
        e.preventDefault(); // Ngăn chặn load lại trang
        
        // Lấy dữ liệu từ input
        let name = $('#userName').val();
        let content = $('#commentContent').val();
        
        // Tạo cấu trúc hiển thị bình luận mới
        let newComment = `
            <div class="user-comment" style="display:none; border-bottom: 1px solid #ddd; padding: 10px 0;">
                <strong>${name}:</strong>
                <p>${content}</p>
            </div>
        `;
        
        // Thêm vào danh sách và dùng hiệu ứng fadeIn của JQuery cho sinh động
        $('#commentList').prepend(newComment);
        $('.user-comment').first().fadeIn(500);
        
        // Reset lại form xóa text cũ
        $('#commentForm')[0].reset();
    });
});
