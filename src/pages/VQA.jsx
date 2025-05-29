import React from 'react';
import VQA from '../components/VQA/Index';
import { useTitle } from '../hooks/useTitle';

const title = 'VQA - Visual Question Answering';

export default function VQAPage() {
	useTitle(title);
	return <VQA />;
}
