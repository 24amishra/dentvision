import torch
import torchvision
import torchvision.transforms as transforms
from torch.utils.data import DataLoader
import torch.nn as nn
import torch.optim as optim
import numpy as np
import os
from sklearn.metrics import confusion_matrix, classification_report


# Define transformations (if needed)
transform = transforms.Compose([
    transforms.Resize((32, 32)),  # Resize images to 32x32
       transforms.RandomHorizontalFlip(),
    transforms.RandomRotation(10),
    transforms.ColorJitter(brightness=0.2, contrast=0.2),
    transforms.ToTensor(),  # Convert images to tensors




])


# Define the neural network model
class Net(nn.Module):
    def __init__(self):
        super(Net, self).__init__()
        self.conv1 = nn.Conv2d(3, 32, 3, padding=1)
        self.pool = nn.MaxPool2d(2, 2)
        self.conv2 = nn.Conv2d(32, 64, 3, padding=1)
        self.fc1 = nn.Linear(64 * 8 * 8, 128)
        self.fc2 = nn.Linear(128, 10)

    def forward(self, x):
        x = self.pool(nn.functional.relu(self.conv1(x)))
        x = self.pool(nn.functional.relu(self.conv2(x)))
        x = x.view(-1, 64 * 8 * 8)
        x = nn.functional.relu(self.fc1(x))
        x = self.fc2(x)
        return x

# Training function
def train_model():
    # Load the train dataset
    trainset = torchvision.datasets.ImageFolder(root='Data1/train1/', transform=transform)
    trainloader = DataLoader(trainset, batch_size=32, shuffle=True)

    # Load the test dataset
    testset = torchvision.datasets.ImageFolder(root='Data1/test/', transform=transform)
    testloader = DataLoader(testset, batch_size=32, shuffle=False)

    print('Done loading')

    # Initialize model, loss function, and optimizer
    model = Net()

    print("achieved model")
    criterion = nn.CrossEntropyLoss()
    optimizer = optim.Adam(model.parameters(), lr=0.001)

    # Training loop
    for epoch in range(30):  # Loop over the dataset multiple times
        running_loss = 0.0
        for i, data in enumerate(trainloader, 0):
            inputs, labels = data
            optimizer.zero_grad()  # Zero the parameter gradients
            outputs = model(inputs)  # Forward pass
            loss = criterion(outputs, labels)  # Compute loss
            loss.backward()  # Backward pass
            optimizer.step()  # Optimize

            running_loss += loss.item()
            if i % 80 == 79:  # Print every 80 mini-batches
                print(f'[{epoch + 1}, {i + 1}] loss: {running_loss / 2000:.3f}')
                running_loss = 0.0

    print('Finished Training')

    # Calculate accuracy on the test set
    correct = 0
    total = 0
    y_true = []
    y_pred = []
    train_losses = []
    val_losses = []
    val_loss = 0
    loss = 0

    with torch.no_grad():
        for data in testloader:
            images, labels = data
            outputs = model(images)
            loss = criterion(outputs,labels)
            val_loss += loss.item()
            _, predicted = torch.max(outputs.data, 1)
            total += labels.size(0)
            correct += (predicted == labels).sum().item()
            y_true.extend(labels.cpu().numpy())
            y_pred.extend(predicted.cpu().numpy())
    avg_train_loss = running_loss / len(trainloader)
    avg_val_loss = val_loss / len(testloader)
    train_losses.append(avg_train_loss)
    val_losses.append(avg_val_loss)

    print(f"Epoch {epoch+1}: Train Loss={avg_train_loss:.4f}, Val Loss={avg_val_loss:.4f}")
    

    print(f'Accuracy of the network on the 10000 test images: {100 * correct / total:.2f}%')

    print(classification_report(y_true, y_pred))

    # Save the model
    PATH = 'model.pth'
    torch.save(model.state_dict(), PATH)
    return model

if __name__ == "__main__":
    # This will only execute if you run this script directly
    train_model()