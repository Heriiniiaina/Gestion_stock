import React, { useContext, useState, useEffect } from 'react';
import { CartContext } from '../context/CartContext';
import axios from 'axios';
import {
    Button,
    TextField,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Autocomplete,
} from '@mui/material';
import toast from 'react-hot-toast';

const Purchase = () => {
    const { state, dispatch } = useContext(CartContext);
    const { cart } = state;

    const [clientInfo, setClientInfo] = useState({
        nom: '',
        email: '',
        telephone: '',
    });

    const [clients, setClients] = useState([]);
    const [selectedClientId, setSelectedClientId] = useState(null);
    
    // État pour stocker les produits et leurs quantités
    const [productQuantities, setProductQuantities] = useState([]);
    const [productPurchased,setProductPurchased]= useState([])
  
    useEffect(() => {
        const fetchClients = async () => {
            try {
                const response = await axios.get('http://localhost:8000/client/getAllClient');
                setClients(response.data.clients);
            } catch (error) {
                console.error("Erreur lors de la récupération des clients", error);
            }
        };

        fetchClients();
    }, []);

    const handleRemoveFromCart = (productId) => {
        dispatch({ type: 'REMOVE_FROM_CART', payload: productId });
        setProductQuantities(prev => prev.filter(item => item._id !== productId));
    };

    const handleUpdateQuantity = (productId, quantity) => {
        dispatch({ type: 'UPDATE_QUANTITY', payload: { _id: productId, quantity } });
        
       
        setProductQuantities((prev) => {
            const existingProduct = prev.find(item => item._id === productId);
            if (existingProduct) {
                return prev.map(item =>
                    item._id === productId ? { ...item, quantity } : item
                );
            } else {
                const cartItem = cart.find(item => item._id === productId);
                return [...prev, { ...cartItem, quantity }];
            }
        });
    };

    const totalPrice = cart.reduce((acc, item) => acc + item.prix * item.quantity, 0);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setClientInfo({
            ...clientInfo,
            [name]: value,
        });
    };

    const handleClientChange = (event, newValue) => {
        if (newValue) {
            setSelectedClientId(newValue._id);
            setClientInfo({
                nom: newValue.nom,
                email: newValue.email,
                telephone: newValue.telephone,
            });
        } else {
            setSelectedClientId(null);
            setClientInfo({ nom: '', email: '', telephone: '' });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        /*
        const purchaseData = {
          client: selectedClientId,
          products: productQuantities.map(item => ({ productId: item._id, quantity: item.quantity })),
          total: totalPrice
        };
        */
        const purchaseData = cart.map(item => ({
            _id: item._id,                // ID du produit
            category: item.category,      // Catégorie du produit
            designation: item.designation, // Désignation du produit
            nom: item.nom,                // Nom du produit
            prix: item.prix,              // Prix du produit
            quantity: item.quantity,       // Quantité du produit
            stock: item.stock              // Stock du produit
        }));
    
        console.log('Données d\'achat à envoyer:', purchaseData);
        axios.post('http://localhost:8000/product/purchase', {purchaseData})
          .then((response) => {
            console.log('Achat effectué:', response.data);
            // Réinitialiser le panier et le formulaire
            console.log(purchaseData)
            console.log(cart)
            setProductQuantities([]);
            setClientInfo({ nom: '', email: '', telephone: '' });
            toast.success('Achat effectué avec succès');
            dispatch({ type: 'CLEAR_CART' });
          })
          .catch((error) => {
            console.error('Erreur lors de l\'achat:', error);
          });
      };
      

    return (
        <div className="p-6">
            <Typography variant="h4" gutterBottom>
                Panier d'achat
            </Typography>

            {/* Sélecteur de client avec Autocomplete */}
            <Autocomplete
                options={clients}
                getOptionLabel={(option) => `${option.nom} ${option.prenom}`} // Affiche le nom et le prénom
                onChange={handleClientChange}
                renderInput={(params) => (
                    <TextField {...params} label="Sélectionner un client" variant="outlined" required />
                )}
                className="mb-4"
            />

            {/* Formulaire d'informations du client */}
            <form onSubmit={handleSubmit} className="mb-6">
                <Typography variant="h6" gutterBottom>
                    Informations du Client
                </Typography>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <TextField
                        label="Nom"
                        name="nom"
                        value={clientInfo.nom}
                        onChange={handleInputChange}
                        required
                        variant="outlined"
                    />
                    <TextField
                        label="Email"
                        name="email"
                        type="email"
                        value={clientInfo.email}
                        onChange={handleInputChange}
                        required
                        variant="outlined"
                    />
                    <TextField
                        label="Téléphone"
                        name="telephone"
                        type="tel"
                        value={clientInfo.telephone}
                        onChange={handleInputChange}
                        required
                        variant="outlined"
                    />
                </div>
                <Button type="submit" variant="contained" color="primary">
                    Soumettre
                </Button>
            </form>

            {/* Tableau des achats */}
            <TableContainer component={Paper} className="mb-4">
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Nom</TableCell>
                            <TableCell>Désignation</TableCell>
                            <TableCell>Prix</TableCell>
                            <TableCell>Quantité</TableCell>
                            <TableCell>Prix Total</TableCell>
                            <TableCell>Options</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {cart.map((item) => (
                            <TableRow key={item._id}>
                                <TableCell>{item.nom}</TableCell>
                                <TableCell>{item.designation}</TableCell>
                                <TableCell>{item.prix} €</TableCell>
                                <TableCell>
                                    <input
                                        type="number"
                                        value={item.quantity}
                                        min="1"
                                        onChange={(e) => handleUpdateQuantity(item._id, Number(e.target.value))}
                                        className="border rounded p-1"
                                    />
                                </TableCell>
                                <TableCell>{(item.prix * item.quantity).toFixed(2)} €</TableCell>
                                <TableCell>
                                    <Button onClick={() => handleRemoveFromCart(item._id)} color="secondary">
                                        Retirer
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Typography variant="h6">
                Total des achats : {totalPrice.toFixed(2)} €
            </Typography>
        </div>
    );
};

export default Purchase;
