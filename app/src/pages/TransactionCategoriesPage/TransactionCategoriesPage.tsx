import {memo, useState} from "react";
import Button from "../../components/Button";
import PrivatePage from "../../components/PrivatePage";
import AdminNav from "../../components/AdminNav";
import {PageActions, PageCaption, PageTitle} from "../../components/Page";
import ModalTransactionCategoryCreate from "../../components/ModalTransactionCategoryCreate";
import "./style.css";

const TransactionCategoriesPage = () => {
	const [isCreateModalOpen, setCreateModalOpen] = useState<boolean>(false);
	return (
		<PrivatePage allowed={[`admin`]}>
			<AdminNav />
			<PageCaption>
				<PageTitle>{`Категории`}</PageTitle>
				<PageActions>
					<Button
						isIcon={true}
						icon={`plus`}
						size={`small`}
						onClick={() => setCreateModalOpen(true)}
					>{`Добавить`}</Button>
				</PageActions>
			</PageCaption>

			{isCreateModalOpen && (
				<ModalTransactionCategoryCreate
					close={() => setCreateModalOpen(false)}
				/>
			)}
		</PrivatePage>
	);
};

export default memo(TransactionCategoriesPage);