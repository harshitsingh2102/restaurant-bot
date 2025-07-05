-- Insert sample users
INSERT INTO users (name, email, phone) VALUES
('Harshit Singh', 'harshit@example.com', '9998887777'),
('Riya Sharma', 'riya@example.com', '8887776666');

-- Insert sample restaurants
INSERT INTO restaurants (name, location, cuisine, rating) VALUES
('Tandoori Treats', 'Delhi', 'North Indian', 4.5),
('Pizza Palace', 'Mumbai', 'Italian', 4.2);

-- Insert sample menu items
INSERT INTO menus (restaurant_id, item_name, description, price, category) VALUES
(1, 'Paneer Butter Masala', 'Creamy cottage cheese curry', 250.00, 'Main Course'),
(1, 'Butter Naan', 'Soft naan with butter', 40.00, 'Bread'),
(2, 'Margherita Pizza', 'Classic cheese pizza', 300.00, 'Pizza'),
(2, 'Garlic Bread', 'Toasted bread with garlic and butter', 120.00, 'Starter');

-- Insert sample orders
INSERT INTO orders (user_id, restaurant_id, total_amount, status) VALUES
(1, 1, 290.00, 'completed'),
(2, 2, 420.00, 'pending');

-- Insert sample order items
INSERT INTO order_items (order_id, menu_id, quantity) VALUES
(1, 1, 1),
(1, 2, 1),
(2, 3, 1),
(2, 4, 1);

-- Insert sample reservations
INSERT INTO reservations (user_id, restaurant_id, reservation_time, number_of_people, special_request) VALUES
(1, 1, '2025-07-01 19:30:00', 2, 'Window seat'),
(2, 2, '2025-07-02 20:00:00', 4, 'Birthday cake');
