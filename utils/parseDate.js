function parseDate(dateStr) {
    // Phân tích chuỗi ngày theo định dạng 'dd/mm/yyyy'
    const [day, month, year] = dateStr?.split('/').map(Number);
    
    // Tạo đối tượng Date (tháng bắt đầu từ 0, nên trừ 1)
    return new Date(year, month - 1, day);
}

export default parseDate;