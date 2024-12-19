import React, {Component} from 'react';
import {
    Button, 
    ButtonGroup, 
    Container, 
    Table, 
    Input, 
    Pagination, 
    PaginationItem,
    PaginationLink,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter
} from 'reactstrap';
import AppNavbar from './AppNavbar';
import {Link} from 'react-router-dom';

class ClientList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            clients: [],
            searchTerm: '',
            currentPage: 1,
            itemsPerPage: 5,
            modalOpen: false,
            clientToDelete: null
        };
        this.remove = this.remove.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.handlePageChange = this.handlePageChange.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
        this.handleDeleteConfirm = this.handleDeleteConfirm.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
    }

    componentDidMount() {
        fetch('/clients')
            .then(response => response.json())
            .then(data => this.setState({clients: data}));
    }

    handleSearch(event) {
        this.setState({
            searchTerm: event.target.value,
            currentPage: 1 // Reset to first page when searching
        });
    }

    handleDeleteClick(client) {
        this.setState({ 
            modalOpen: true,
            clientToDelete: client
        });
    }


    handleDeleteConfirm() {
        const { clientToDelete } = this.state;
        if (clientToDelete) {
            this.remove(clientToDelete.id);
            this.toggleModal();
        }
    }

    handlePageChange(pageNumber) {
        this.setState({ currentPage: pageNumber });
    }

    async remove(id) {
        await fetch(`/clients/${id}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(() => {
            let updatedClients = [...this.state.clients].filter(i => i.id !== id);
            this.setState({clients: updatedClients});
        });
    }

    toggleModal() {
        this.setState(prevState => ({
            modalOpen: !prevState.modalOpen,
            clientToDelete: null
        }));
    }


    render() {
        const { clients, searchTerm, currentPage, itemsPerPage, modalOpen, clientToDelete } = this.state;

        // Filter clients based on search term
        const filteredClients = clients.filter(client =>
            client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            client.email.toLowerCase().includes(searchTerm.toLowerCase())
        );

        // Calculate pagination
        const indexOfLastItem = currentPage * itemsPerPage;
        const indexOfFirstItem = indexOfLastItem - itemsPerPage;
        const currentClients = filteredClients.slice(indexOfFirstItem, indexOfLastItem);

        // Calculate total pages
        const totalPages = Math.ceil(filteredClients.length / itemsPerPage);

        const clientList = currentClients.map(client => {
            return <tr key={client.id}>
                <td style={{whiteSpace: 'nowrap'}}>{client.name}</td>
                <td>{client.email}</td>
                <td>
                    <ButtonGroup>
                        <Button size="sm" color="primary" tag={Link} to={"/clients/" + client.id}>Edit</Button>
                        <Button size="sm" color="danger" onClick={() => this.handleDeleteClick(client)}>Delete</Button>
                    </ButtonGroup>
                </td>
            </tr>
        });

         // Generate pagination items
         const pageNumbers = [];
         for (let i = 1; i <= totalPages; i++) {
             pageNumbers.push(
                 <PaginationItem key={i} active={i === currentPage}>
                     <PaginationLink onClick={() => this.handlePageChange(i)}>
                         {i}
                     </PaginationLink>
                 </PaginationItem>
             );
         }

        return (
            <div>
                <AppNavbar/>
                <Container fluid>
                <div className="d-flex justify-content-between align-items-center mb-3">
                        <Button color="success" tag={Link} to="/clients/new">
                            Add Client
                        </Button>
                        <div className="w-25">
                            <Input
                                type="text"
                                placeholder="Search clients..."
                                value={searchTerm}
                                onChange={this.handleSearch}
                            />
                        </div>
                    </div>
                    <h3>Clients</h3>
                    <Table className="mt-4">
                        <thead>
                        <tr>
                            <th width="30%">Name</th>
                            <th width="30%">Email</th>
                            <th width="40%">Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {clientList}
                        </tbody>
                    </Table>
                    <div className="d-flex justify-content-center">
                        <Pagination>
                            <PaginationItem disabled={currentPage === 1}>
                                <PaginationLink onClick={() => this.handlePageChange(currentPage - 1)}>
                                    Previous
                                </PaginationLink>
                            </PaginationItem>
                            {pageNumbers}
                            <PaginationItem disabled={currentPage === totalPages}>
                                <PaginationLink onClick={() => this.handlePageChange(currentPage + 1)}>
                                    Next
                                </PaginationLink>
                            </PaginationItem>
                        </Pagination>
                    </div>
                    <Modal isOpen={modalOpen} toggle={this.toggleModal}>
                        <ModalHeader toggle={this.toggleModal}>
                            Delete Confirmation
                        </ModalHeader>
                        <ModalBody>
                            Are you sure you want to delete client{' '}
                            {clientToDelete && <strong>{clientToDelete.name}</strong>}?
                            This action cannot be undone.
                        </ModalBody>
                        <ModalFooter>
                            <Button color="secondary" onClick={this.toggleModal}>
                                Cancel
                            </Button>
                            <Button color="danger" onClick={this.handleDeleteConfirm}>
                                Delete
                            </Button>
                        </ModalFooter>
                    </Modal>
                </Container>
            </div>
        );
    }
}

export default ClientList;
