import React from 'react';
import { Modal, Typography, Divider, List } from 'antd';

const { Title, Text } = Typography;

const RecipeDetailsModal = ({ visible, onCancel, recipeDetails }) => {
    return (
        <Modal
            title={<Title level={3} style={{ margin: 0 }}>Recipe Details</Title>}
            visible={visible}
            onCancel={onCancel}
            footer={null}
            width={600} // You can adjust the width as needed
        >
            <div style={{ padding: '20px' }}>
                <Text strong style={{ fontSize: '18px' }}>Name: </Text>
                <Text style={{ fontSize: '18px' }}>{recipeDetails.name}</Text>
                <Divider />
                
                <Text strong style={{ fontSize: '18px' }}>Description: </Text>
                <Text style={{ fontSize: '16px', marginBottom: '10px' }}>{recipeDetails.description}</Text>
                <Divider />

                <Text strong style={{ fontSize: '18px' }}>Ingredients:</Text>
                <List
                    bordered
                    dataSource={Array.isArray(recipeDetails.ingredients) ? recipeDetails.ingredients : []}
                    renderItem={item => <List.Item>{item}</List.Item>}
                />
                <Divider />

                <Text strong style={{ fontSize: '18px' }}>Instructions:</Text>
                <Text style={{ fontSize: '16px' }}>{recipeDetails.instructions}</Text>
            </div>
        </Modal>
    );
};

export default RecipeDetailsModal;
