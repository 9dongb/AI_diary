# 중복 제거 함수
def remove_duplicate(text):
    words = text.split()
    unique_words = []
    seen_words = set()

    for word in words:
        if word not in seen_words:
            seen_words.add(word)
            unique_words.append(word)

    return " ".join(unique_words)

def abstractive_summarization(input_text, tokenizer, model):

    # 입력 텍스트를 토큰화하여 인코딩
    input_ids = tokenizer.encode(input_text, return_tensors="pt", max_length=1024, truncation=True)

    # 모델을 사용하여 요약 생성
    summary_ids = model.generate(input_ids, max_length=30, min_length=10, length_penalty=2.0, num_beams=4, early_stopping=True)

    # 요약 결과 디코딩
    summary_text = tokenizer.decode(summary_ids[0], skip_special_tokens=True)

    # 중복 제거
    summary_text = remove_duplicate(summary_text)

    return summary_text