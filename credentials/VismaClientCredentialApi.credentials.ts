import {
	IAuthenticateGeneric,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class VismaClientCredentialApi implements ICredentialType {
	name = 'vismaClientCredentialAPI';
	displayName = 'Visma Client Credential API';
	genericAuth = true;
	properties: INodeProperties[] = [
		{
			displayName: 'Client ID',
			name: 'clientId',
			type: 'string',
			default: '',
			required: true,
		},
		{
			displayName: 'Client Secret',
			name: 'clientSecret',
			type: 'string',
			typeOptions: {
				password: true,
			},
			default: '',
			required: true,
		},
		{
			displayName: 'Tenant ID',
			name: 'tenantId',
			type: 'string',
			default: '',
		},
	];
// This credential is currently not used by any node directly
	// but the HTTP Request node can use it to make requests.
	// The credential is also testable due to the `test` property below
	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			body: {
				grant_type: 'client_credentials',
				client_id: '={{ $credentials.clientId }}',
				client_secret:'={{ $credentials.clientSecret }}',
				tenant_id: '={{ $credentials.tenantId }}',
			},
			headers: {
				'content-type':'application/x-www-form-urlencoded',
			}
		},
	};

}
