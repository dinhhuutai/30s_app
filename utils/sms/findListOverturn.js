function findListOverturn(number) {
    function permute(str) {
        let results = [];

        // Hàm đệ quy để sinh hoán vị
        function permuteHelper(current, remaining) {
            if (remaining.length === 0) {
                results.push(current);
            } else {
                for (let i = 0; i < remaining.length; i++) {
                    // Tạo hoán vị mới với ký tự hiện tại
                    let newCurrent = current + remaining[i];
                    let newRemaining = remaining.slice(0, i) + remaining.slice(i + 1);
                    permuteHelper(newCurrent, newRemaining);
                }
            }
        }

        // Bắt đầu quá trình hoán vị với chuỗi ban đầu
        permuteHelper('', str);

        // Chuyển kết quả thành Set để loại bỏ trùng lặp và sau đó chuyển thành mảng
        return Array.from(new Set(results));
    }

    const permutations = permute(number);

    return permutations;
}

export default findListOverturn;
