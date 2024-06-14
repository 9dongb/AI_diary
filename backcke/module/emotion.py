import torch

def predict_emotion(input_text, emotion_loaded_model, emotion_loaded_tokenizer):
    
    # 감정 비율 계산 및 출력 함수 재정의
    device = torch.device('cuda') if torch.cuda.is_available() else torch.device('cpu')
    emotion_loaded_model.to(device)
    emotion_loaded_model.eval()

    def predict_emotions(text):
        encodings = emotion_loaded_tokenizer(text, padding=True, truncation=True, return_tensors='pt')
        encodings = {key: val.to(device) for key, val in encodings.items()}
        with torch.no_grad():
            outputs = emotion_loaded_model(**encodings)
        probs = torch.nn.functional.softmax(outputs.logits, dim=1)
        return probs.cpu().numpy()

    def emotion_ratios(text):
        emotion_probs = predict_emotions(text)[0]
        emotion_labels = ['기쁨', '분노', '상처', '당황', '불안', '슬픔']
        emotion_dict = {emotion_labels[i]: emotion_probs[i] for i in range(len(emotion_labels))}
        return emotion_dict

    ratios = emotion_ratios(input_text)

    return(ratios)
