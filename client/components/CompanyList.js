import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { Link } from 'react-router-dom';
import query from '../queries/fetchCompanies';
import mutation from '../mutations/deleteCompany';

class CompanyList extends Component {
    onCompanyDelete(id) {
        this.props
            .mutate({ variables: { id } })
            .then(() => this.props.data.refetch());
    }
    renderCompanies() {
        return this.props.data.companies.map(({ id, name, person, www }) => {
            return (
                <tr key={id} className="collection-item">
                    <td>{name}</td>
                    <td>{person}</td>
                    <td>{www}</td>
                    <td>
                        <i
                            className="material-icons"
                            onClick={() => this.onCompanyDelete(id)}>
                            delete
                        </i>
                    </td>
                    {/* <Link to={`/company/${id}`}>{name}</Link> */}
                </tr>
            );
        });
    }

    render() {
        if (this.props.data.loading) {
            return <div>Loading...</div>;
        }

        return (
            <div>
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Contact Person</th>
                            <th>www</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>{this.renderCompanies()}</tbody>
                </table>
            </div>
        );
    }
}

export default graphql(mutation)(graphql(query)(CompanyList));
