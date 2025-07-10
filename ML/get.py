from flask import Flask, render_template, url_for, request, jsonify
import torch
import torchvision.transforms as transforms
from torch.utils.data import DataLoader
from teeth import Net
from PIL import Image
import torch.nn.functional as nff
import io
from flask_cors import CORS
from pymongo import MongoClient
print('best')
app = Flask(__name__)

# Enable CORS for all routes
CORS(app)
MONGO_URI='mongodb+srv://agastyamishra2006:324Am021@cluster0.tqztm.mongodb.net/Predictions?retryWrites=true&w=majority&appName=Cluster0'

client = MongoClient(MONGO_URI)
db = client['Predictions']
predCol = db['predVal']

def load_model():
    model = Net()  # Defines the model as Net()
    model.load_state_dict(torch.load('/Users/agastyamishra/hackathon/model.pth'))  # Loading the torch state_dict
    model.eval()  # Set the model to evaluation mode
    return model

@app.route('/data', methods=['POST'])
def get_data():
    try:
        file = request.files.get('file')  # Get the file from the request
        
        # Image transformation
        transform = transforms.Compose([
            transforms.Resize((32, 32)),  # Resize images to 32x32
            transforms.ToTensor(),  # 
        ])
        
        img = Image.open(io.BytesIO(file.read()))  # Open the image file
        img = transform(img)  # A
        

        image_tensor = img.unsqueeze(0)
        
        # Load and use the model for prediction
        model = load_model()
        
        with torch.no_grad():
            output = model(image_tensor)  # Forward pass
            _, predicted = torch.max(output, 1)  # Get the predicted class
            probabilities = nff.softmax(output, dim=1)
            prob = probabilities.max().item()  # Get the max probability
            print("check")
            print(predicted.item())
        



        email = request.form['email']
        uid = request.form['uid']
        timestamp = request.form['date']






        predCol.insert_one({
        "uid": uid,
            "email": email,
            "prediction": predicted.item(),
            "probability": prob,
            "timestamp": timestamp



        })

        return jsonify({
            'message': 'File uploaded successfully!',
            'predicted condition': predicted.item(),
            'Probability': prob
        }), 200
    except Exception as e:
        return jsonify({

"error": str(e)

        }),500





if __name__ == '__main__':
    app.run(port=8000, debug=True)